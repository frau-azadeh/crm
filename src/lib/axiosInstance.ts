import axios from "axios";

// اینستنس برای لاگین
export const authApi = axios.create({
  baseURL: "https://67b59f1807ba6e59083dafc9.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

// اینستنس برای مشتریان
export const customersApi = axios.create({
  baseURL: "https://67b1b1393fc4eef538ea6972.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});
