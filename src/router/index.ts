   import { createRouter, createWebHistory } from 'vue-router'
   import DashboardView from '@/views/DashboardView.vue'
   import SetupView from '@/views/SetupView.vue'
   import CycleView from '@/views/CycleView.vue'
   import MembersView from '@/views/MembersView.vue'
   import SettingsView from '@/views/SettingsView.vue'


   const router = createRouter({
     history: createWebHistory(),
     routes: [
       { path: '/dashboard', name: 'dashboard', component: DashboardView },
       { path: '/members', name: 'members', component: MembersView },
       { path: '/cycle', name: 'cycle', component: CycleView },
       { path: '/setup', name: 'setup', component: SetupView },
       { path: '/settings', name: 'settings', component: SettingsView }
       // your other four go here: /setup, /members, /cycle, /settings
     ],
   })

   export default router
