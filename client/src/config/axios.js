import axios from 'axios'

export const http = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
  },
});