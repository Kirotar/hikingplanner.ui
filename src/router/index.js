import { createRouter, createWebHistory } from 'vue-router';
import PlannedHikes from '@/views/PlannedHikes.vue';
import CompletedHikes from '@/views/CompletedHikes.vue';

const routes = [
    {
        path: '/',
        name: 'PlannedHikes',
        component: PlannedHikes,
    },
    {
        path: '/completed',
        name: 'CompletedHikes',
        component: CompletedHikes,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
