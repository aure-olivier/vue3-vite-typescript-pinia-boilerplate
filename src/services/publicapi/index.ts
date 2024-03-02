// the axios instance and types
import axios from 'axios';
import { type EntriesAPIResponse } from "../types";
import { type Entry } from "./types";

const instance = axios.create({
  baseURL: 'https://api.publicapis.org/'
});

async function getEntries() {
  return await instance.get<EntriesAPIResponse<Entry[]>>("entries");
}

export default {
  getEntries
};