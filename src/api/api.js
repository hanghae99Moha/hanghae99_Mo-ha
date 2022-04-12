import axios from "axios";
import React from "react";

const api = axios.create({
  // baseURL: "http://13.209.7.115/",
  // baseURL: "http://13.125.73.243:8081/",
  baseURL: "http://localhost:3001/",
});

export default api;
