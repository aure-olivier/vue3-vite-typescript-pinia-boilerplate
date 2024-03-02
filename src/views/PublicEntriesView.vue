<script setup lang="ts">
// import HelloWorld from '../components/HelloWorld.vue'
import { onMounted } from "vue";
import { publicApiEntryStore } from "../stores/publicapi";
import { storeToRefs } from "pinia";

const publicEntryStore = publicApiEntryStore();
const { entries, loading } = storeToRefs(publicEntryStore);
const { getEntries } = publicEntryStore;

onMounted(async () => {
  const response = await getEntries;
  console.log(`Status for GET Entries from public API: Success=${response.success} | HTTP=${response.status} | NB_ELTS=${response.nbElts}`);

})
</script>

<template>
  <main>
    <h1>Public API - Entries</h1>
    <h4>from https://api.publicapis.org/entries</h4>
    <p v-if="loading">Loading Entries...</p>

    <div v-if="entries">
      <div class="entries" v-for="(entry, index) in entries" key="entry_{{ index }}">
        <div class="entry">
          <p class="label">API</p>
          <p class="value">{{ entry.API }}</p>
        </div>
        <div class="entry">
          <p class="label">Description</p>
          <p class="value">{{ entry.Description }}</p>
        </div>
        <div class="entry">
          <p class="label">Auth</p>
          <p class="value">{{ entry.Auth }}</p>
        </div>
        <div class="entry">
          <p class="label">HTTPS</p>
          <p class="value">{{ entry.HTTPS }}</p>
        </div>
        <div class="entry">
          <p class="label">Cors</p>
          <p class="value">{{ entry.Cors }}</p>
        </div>
        <div class="entry">
          <p class="label">Link</p>
          <p class="value"><a :href="entry.Link" target="_blank">{{ entry.Link }}</a></p>
        </div>
        <div class="entry">
          <p class="label">Category</p>
          <p class="value">{{ entry.Category }}</p>
        </div>
      </div>
    </div>
    <!-- <HelloWorld msg="AO" /> -->
  </main>
</template>
