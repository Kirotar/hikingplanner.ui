import { createRouter, createWebHistory } from 'vue-router';
import PlannedHikes from '@/views/PastHikes.vue';
import CompletedHikes from '@/views/PlannedHikes.vue';

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
