import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import { type Entry } from "../../services/publicapi/types";
import { API } from "../../services";
import { AxiosError } from "axios";

export const publicApiEntryStore = defineStore('publicApiEntry', () => {
  // Store
  const entries = ref([] as Entry[])
  const loading = ref(false)

  const getEntries = computed(async () => {
    try {
      loading.value = true;
      const { status, data } = await API.publicApiEntries.getEntries();
      loading.value = false;
      if (status === 200) {
        entries.value = data.entries;
        return {
          status,
          success: true,
          nbElts: data.entries.length,
        };
      }
    } catch (error) {
      loading.value = false;
      const _error = error as AxiosError<string>;
      return {
        success: false,
        status: _error.response?.status,
        nbElts: 0,
      };
    }
    return {
      success: false,
      nbElts: 0,
      status: 400,
    };
  })

  // Returned methods and store property
  return { 
    loading, 
    entries,
    getEntries
  }
})
