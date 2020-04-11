import axios from 'axios'

export const http = axios.create({
  baseURL: `http://localhost:3000/`,
  headers: { 'Access-Control-Allow-Origin': 'true', 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
})