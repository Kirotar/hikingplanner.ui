import { defineStore } from 'pinia';
import axios from 'axios';

export const useHikeStore = defineStore('hikeStore', {
    // State
    state: () => ({
        hikes: [], // List of hikes
        hikingTrails: [], // List of available trails
    }),

    // Actions (similar to Vuex actions)
    actions: {
        async fetchHikes() {
            try {
                const response = await axios.get('your-api-url/get-hikes');
                this.hikes = response.data; // Update state directly
            } catch (error) {
                console.error('Error fetching hikes:', error);
            }
        },
        async fetchHikingTrails() {
            try {
                const response = await axios.get('your-api-url/get-trails');
                this.hikingTrails = response.data; // Update state directly
            } catch (error) {
                console.error('Error fetching hiking trails:', error);
            }
        },
    },

    // Getters (similar to Vuex getters)
    getters: {
        getHikes(state) {
            return state.hikes;
        },
        getHikingTrails(state) {
            return state.hikingTrails;
        },
    },
});
