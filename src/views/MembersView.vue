<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useMembersStore } from '@/stores/member'
import { useDevStore } from '@/stores/dev'

const members = useMembersStore()
const dev = useDevStore()
const isDev = import.meta.env.DEV
const form = reactive({
  name: '',
  phone: '',
  position: ''
})

onMounted(() => members.load())

async function submit() {
  const ok = await members.add({name: form.name, phone: form.phone })
  if (ok) {
    form.name = ''
    form.phone = ''
  }
}

async function resetAll() {
  dev.reset()
  await members.load()
}
</script>

<template>
  <main>
    <h1>Members</h1>
     
    <section v-if="isDev">
      <strong>Dev:</strong> failure mode: {{ dev.mode }}
      <button @click="dev.setMode('random')">random</button>
      <button @click="dev.setMode('always')">always</button>
      <button @click="dev.setMode('off')">off</button>
      <button @click="resetAll">Reset Data</button>
    </section>
    
    <p v-if="members.status === 'loading'">Loading members...</p>

    <div v-else-if="members.status === 'error'">
     <p> Couldn't load members ({{ members.error }}). </p>
     <button @click="members.load()">Retry</button>
    </div>

    <p v-else-if="members.isEmpty">No members yet,</p>

    <ul v-else>
      <li v-for="m in members.items" :key="m.id">
        {{ m.position }}. {{ m.name }} ({{ m.phone }})
      </li>
    </ul>  

    <form v-if="members.status ==='ready'" @submit.prevent="submit">
      <input v-model="form.name" placeholder="Name" required />
      <input v-model="form.phone" placeholder="Phone" required />
      <button type="submit" :disabled="members.adding">
        {{ members.adding ? 'Adding...' : 'Add member' }}
      </button>
      <p v-if="members.addError">Couldn't add member ({{ members.addError }}).</p>
    </form>

  </main>
</template>
