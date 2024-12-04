import { createStore } from 'vuex';
import axios from "axios";

export default createStore({
    state: {
        hikes: [], // List of hikes
        hikingTrails: [] // List of available trails
    },
    mutations: {
        setHikes(state, hikes) {
            state.hikes = hikes;
        },
        setHikingTrails(state, trails) {
            state.hikingTrails = trails;
        }
    },
    actions: {
        fetchHikes({ commit }) {
            // Fetch hikes from API and commit to store
            axios.get('your-api-url/get-hikes').then((response) => {
                commit('setHikes', response.data);
            });
        },
        fetchHikingTrails({ commit }) {
            // Fetch hiking trails from API and commit to store
            axios.get('your-api-url/get-trails').then((response) => {
                commit('setHikingTrails', response.data);
            });
        }
    },
    getters: {
        getHikes(state) {
            return state.hikes;
        },
        getHikingTrails(state) {
            return state.hikingTrails;
        }
    }

});
