import { defineStore } from 'pinia';
import axios from 'axios';

export const useHikeStore = defineStore('hikeStore', {
    // State
    state: () => ({
        api: "http://localhost:8089/api/matk",
        hikes: [], // List of hikes
        hikingTrails: [], // List of available trails
        isVisible: false,
        visibleHikeId: null,
        newHike: {
            template: {id: null, name: ""}, // This will hold the HikeTemplate id, mapped by `template_id`
            notes: "",            // Notes for the hike
            startDate: "yyyy-MM-dd", // Example: "2024-12-05"
            endDate: "yyyy-MM-dd",   // Example: "2024-12-07"
            duration: "HH:mm",            // Leave empty, or calculate it later
            meetupPoint: "",         // Add the meetup point
            isCompleted: false       // Default value for completion status
        }
    }),

    // Actions (similar to Vuex actions)
    actions: {
        async fetchPastHikes() {
            try {
                const response = await axios.get('http://localhost:8089/api/matk/get-past-hikes');
                this.hikes = response.data;
            } catch (error) {
                console.error('Viga tehtud matkade laadimisel:', error);
            }
        },

        async fetchTrails() {
            try {
                const response = await axios.get('http://localhost:8089/api/matk/get-trails');
                this.hikingTrails = response.data;
            } catch (error) {
                console.error('Viga matkaradade laadimisel:', error);
            }
        },
        async selectTrail(trail) {
            this.newHike.template = {id: trail.id}; // `trail.id` is the `template_id` corresponding to `HikeTemplate
            this.newHike.trailName = trail.name; // stores the name for UI display, but it's not needed in the backend
            this.isVisible = false; // Close the dropdown after selection
        },

        async addHike() {
                try {
                    await axios.post(`${this.api}/plan-hike`, this.newHike);
                    this.resetForm(); // Clear form after submission
                } catch (error) {
                    console.error('Viga matka lisamisel:', error);
                }
        },
        resetForm() {
            this.newHike = {
                template: {id: null, name: ""},
                notes: "",
                duration: "",
                startDate: "",
                endDate: "",
                isCompleted: false
            };
        },
        fetchHikesAndToggle() {
            this.fetchPastHikes();
            this.toggleVisibility();
        },

        toggleVisibility(hikeId = null) {
            if (hikeId === null) {
                // Toggle visibility of all hikes
                this.isVisible = !this.isVisible;
                if (!this.isVisible) {
                    this.visibleHikeId = null; // Reset if hiding all hikes
                }
            } else {
                // Toggle visibility of a specific hike
                this.visibleHikeId = this.visibleHikeId === hikeId ? null : hikeId;
            }
        },
    },

    getters: {
        isDetailsVisible: (state) => (hikeId) => {
            return state.visibleHikeId === hikeId; },
        getHikes(state) {
            return state.hikes;
        },
        getHikingTrails(state) {
            return state.hikingTrails;
        },
    },
});
