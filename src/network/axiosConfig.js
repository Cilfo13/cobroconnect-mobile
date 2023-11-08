import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../config";

const API_BASE_URL = BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
