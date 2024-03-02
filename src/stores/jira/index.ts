import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import { type Ticket } from "../../services/jira/types";
import { API } from "../../services";
import { AxiosError } from "axios";

export const useJiraStore = defineStore('jiraStore', () => {
  // Store
  const tickets = ref([] as Ticket[])
  const loading = ref(false)

  // "Old" Actions like method
  const getJiraTickets = computed(async () => {
    try {
      loading.value = true;
      const { status, data } = await API.jira.getTickets();
      loading.value = false;
      if (status === 200) {
        tickets.value = data.data;
        return {
          success: true,
          content: data.data,
        };
      }
    } catch (error) {
      loading.value = false;
      const _error = error as AxiosError<string>;
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  })

  // Returned methods and store property
  return { 
    loading, 
    tickets,
    getJiraTickets
  }
})
