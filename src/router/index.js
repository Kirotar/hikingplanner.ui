import { createRouter, createWebHistory } from 'vue-router';
import PastHikes from '@/views/PastHikes.vue';
import PlannedHikes from '@/views/PlannedHikes.vue';
import FavoriteHikes from "@/views/FavoriteHikes.vue";
import FrontPage from "@/views/FrontPage.vue";
import AchievementsPage from "@/views/AchievementsPage.vue";



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
        component: FavoriteHikes,
    },
    {
        path: '/',
        name: '',
        component: FrontPage,
    },
    {
        path: '/goals',
        name: 'Saavutused ja eesmärgid',
        component: AchievementsPage,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,

});


export default router;
