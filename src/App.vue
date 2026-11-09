<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <router-link to="/dashboard">Dashboard</router-link>
  <router-link to="/members">Members</router-link>
  <router-link to="/cycle">Cycle</router-link>
  <router-link to="/setup">Setup</router-link>
  <router-link to="/settings">Settings</router-link>
  <router-view />
</template>

<style scoped></style>
