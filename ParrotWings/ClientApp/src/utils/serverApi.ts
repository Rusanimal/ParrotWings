import Axios from "axios";


export const serverApi = Axios.create({
    baseURL: 'api/',
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
    withCredentials: true
});