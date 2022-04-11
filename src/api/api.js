import axios from "axios";
import React from "react";

const api = axios.create({
  baseURL: "http://13.125.73.243/",
});

export default api;