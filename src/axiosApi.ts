import axios from "axios";

const axiosApi = axios.create({
    baseURL : 'https://js-30-nigora-default-rtdb.europe-west1.firebasedatabase.app/'
});

export  default axiosApi;