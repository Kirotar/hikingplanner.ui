import { createRouter, createWebHistory } from 'vue-router';
import PastHikes from '@/views/PastHikes.vue';
import PlannedHikes from '@/views/PlannedHikes.vue';
import GoalsAndAchievements from "@/views/GoalsAndAchievements.vue";

const routes = [
    {
        path: '/finished',
        name: 'Tehtud matkad',
        component: PastHikes,
    },
    {
        path: '/planned',
        name: 'Planeeritud matkad',
        component: PlannedHikes,
    },

    {
        path: '/goals',
        name: 'Saavutused & Eesmärgid',
        component: GoalsAndAchievements,
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,

});


export default router;
