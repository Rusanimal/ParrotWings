using AutoMapper;
using ParrotWings.Data.Entities;
using ParrotWings.Data.Managers.Interfaces;
using ParrotWings.Data.Models;
using ParrotWings.Data.Repositories.Interfaces;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ParrotWings.Data.Managers
{
    public class TransactionManager : ITransactionManager
    {
        private readonly IBalanceRepository _balanceRepository;
        private readonly ITransferTransactionRepository _transferTransactionRepository;
        private static ConcurrentDictionary<int, SemaphoreSlim> dictionary =
            new ConcurrentDictionary<int, SemaphoreSlim>();

        public TransactionManager(IBalanceRepository balanceRepository,
            ITransferTransactionRepository transferTransactionRepository)
        {
            _balanceRepository = balanceRepository;
            _transferTransactionRepository = transferTransactionRepository;
        }

        public async Task<CreateTransactionModel> GetTransitionCopy(int transitionId, int userId)
        {
            return await _transferTransactionRepository.GetTransactionByIdAndUser(transitionId, userId);
        }

        public async Task<string> CreateTransaction(int userId, CreateTransactionModel transactionModel)
        {
            var semaphore = dictionary.GetOrAdd(userId, new SemaphoreSlim(1, 1));
            await semaphore.WaitAsync();
            try
            {
                var balance = await _balanceRepository.GetBalance(userId);
                if (balance < transactionModel.Amount)
                {
                    return ErrorDictionary.BalanceSmallerThenAmount;
                }

                var date = DateTime.UtcNow;

                var transactionId = await AddTransaction(userId, (int)transactionModel.CorrespondentId, date);

                var negativeBalance = new Balance();
                var positiveBalance = new Balance();
                negativeBalance.Amount =  -(int)transactionModel.Amount;
                positiveBalance.Amount = (int)transactionModel.Amount;
                negativeBalance.CreationDate = positiveBalance.CreationDate = date;
                negativeBalance.TransferTransactionId = positiveBalance.TransferTransactionId = transactionId;
                negativeBalance.UserId = userId;
                positiveBalance.UserId = (int)transactionModel.CorrespondentId;

                var result = await _balanceRepository.AddBalanceEntries(new List<Balance>() { negativeBalance, positiveBalance });
                if (result.All(c => c.Id > 0))
                {
                    return ErrorDictionary.Ok;
                }
                else
                {
                    await _balanceRepository.RemoveBalanceEntry(result.FirstOrDefault(c => c.Id > 0));
                    await _transferTransactionRepository.RemoveTransaction(transactionId);
                    return ErrorDictionary.Error;
                }
            }
            finally
            {
                semaphore.Release();
            }
        }

        private async Task<int> AddTransaction(int senderId, int recipientId, DateTime date)
        {
            var newTransaction = new TransferTransaction()
            {
                CreationDate = date,
                RecipientId = recipientId,
                SenderId = senderId
            };

            return await _transferTransactionRepository.AddTransaction(newTransaction);
        }
    }
}
