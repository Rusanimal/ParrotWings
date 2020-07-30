namespace ParrotWings.Data
{
    public static class ErrorDictionary
    {
        public static readonly string Ok = "Ok";
        public static readonly string LoginError = "Email or password wrong";
        public static readonly string AlreadyRegisteredUser = "User with current email already registered";
        public static readonly string BalanceSmallerThenAmount = "Current amount bigger then balance. Change amount, please";
        public static readonly string AmountMustByPositive = "The amount must be positive. Change amount, please";
        public static readonly string Error = "An error has occurred";
    }
}
