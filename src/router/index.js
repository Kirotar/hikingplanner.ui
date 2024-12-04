import { createRouter, createWebHistory } from 'vue-router';
import PastHikes from '@/views/PastHikes.vue';
import PlannedHikes from '@/views/PlannedHikes.vue';

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
        path: '/favorites',
        name: 'Lemmikud',
        component: PlannedHikes,
    },
    {
        path: '/goals',
        name: 'Saavutused ja eesmärgid',
        component: PlannedHikes,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});


export default router;
