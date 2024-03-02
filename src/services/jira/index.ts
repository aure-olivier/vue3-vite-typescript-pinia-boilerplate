// the axios instance and types
import axios from 'axios';
import { type APIResponse } from "../types";
import { type Ticket } from "./types";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
});

async function getTickets() {
  return await instance.get<APIResponse<Ticket[]>>("jira/list");
}

export default {
  getTickets
};