<script setup lang="ts">
defineProps<{
  msg: string
}>()
import { onMounted } from "vue";
import { useJiraStore } from "../stores/jira";
import { storeToRefs } from "pinia";

const jiraStore = useJiraStore();
const { tickets, loading } = storeToRefs(jiraStore)
const { getJiraTickets } = jiraStore

const title = import.meta.env.VITE_APP_TITLE

onMounted(async () => {
  await getJiraTickets
})
</script>

<template>
  <main>
    <h4>App Title: {{ title }}</h4>
    <br/>
    <p v-if="loading">Loading {{ msg }}...</p>
    <div v-if="tickets">
      <p>{{ msg }}</p>
      <div class="tickets-container" v-for="ticket in tickets" :key="ticket.key">
        <p class="ticket">{{ ticket.key }} - {{ ticket.summary }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
