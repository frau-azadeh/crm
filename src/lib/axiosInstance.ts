import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://67b59f1807ba6e59083dafc9.mockapi.io/",
  headers:{
    "Content-Type": "application/json",
  }
})

export default axiosInstance;