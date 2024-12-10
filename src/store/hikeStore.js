import {defineStore} from 'pinia';
import axios from 'axios';

export const useHikeStore = defineStore('hikeStore', {
        // State
        state: () => ({
            api: "http://localhost:8089/api/matk",
            hikes: [], // List of hikes
            hikingTrails: [], // List of available trails
            checklistItems: [],
            selectedChecklistItems: [], // Valitud checklisti üksused
            isVisible: false,
            isDropdownVisible: false,
            visibleHikeId: null,
            newHike: {
                template: {id: null, name: ""}, // This will hold the HikeTemplate id, mapped by `template_id`
                notes: "",            // Notes for the hike
                startDate: null, // Example: "2024-12-05"
                endDate: null,   // Example: "2024-12-07"
                duration: null,            // Leave empty, or calculate it later
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
            async fetchFutureHikes() {
                try {
                    const response = await axios.get('http://localhost:8089/api/matk/get-future-hikes');
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
            selectTrail(trail) {
                if (trail) {
                    this.newHike.template = {id: trail.id};
                    this.newHike.trailName = trail.name;
                } else {
                    this.newHike.template = {id: null, name: ""};
                    this.newHike.trailName = "";
                }
                this.isVisible = false;
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
                this.selectedTrail = null;
                this.selectedChecklistItems = [];
            },
            fetchHikesAndToggle() {
                this.fetchPastHikes();
                this.toggleVisibility();
            },
            fetchFutureHikesAndToggle() {
                this.fetchFutureHikes();
                this.toggleVisibility();
            },
            toggleVisibility(hikeId = null) {
                if (hikeId === null) {
                    // Toggle visibility of all hikes
                    this.isVisible = !this.isVisible;
                    if (!this.isVisible) {
                        this.visibleHikeId = null; // Reset if hiding all hikes
                        this.selectedChecklistItems = []; // Clear selection if no hike is visible
                    }
                } else {
                    // Toggle visibility of a specific hike
                    this.visibleHikeId = this.visibleHikeId === hikeId ? null : hikeId;
                    if (this.visibleHikeId === hikeId) {
                        this.fetchChecklist(hikeId); // Populate selected items
                    } else {
                        this.selectedChecklistItems = []; // Clear selection
                    }
                }
            },
            toggleDropdownVisibility(hikeId = null) {
                if (hikeId === null) {
                    // Toggle visibility of all hikes
                    this.isDropdownVisible = !this.isDropdownVisible;
                    if (!this.isDropdownVisible) {
                        this.visibleHikeId = null; // Reset if hiding all hikes
                    }
                } else {
                    // Toggle visibility of a specific hike
                    this.visibleHikeId = this.visibleHikeId === hikeId ? null : hikeId;
                }
            },
            async fetchChecklist(hikeId = null) {
                try {
                    if (hikeId) {
                        const response = await axios.get(`${this.api}/${hikeId}/checklist`);
                        const hike = this.hikes.find((h) => h.id === hikeId);
                        if (hike) {
                            hike.checklist = response.data;
                        }
                    } else {
                        const response = await axios.get(`${this.api}/checklist`);
                        this.checklistItems = response.data;
                    }
                } catch (error) {
                    console.error(`Error fetching checklist${hikeId ? " for hike" : ""}:`, error);
                }
            },
            addHikeWithChecklist() {
                const hikeData = {
                    ...this.newHike,
                    checklistItems: this.selectedChecklistItems,
                };

                axios
                    .post(`${this.api}/plan-hike`, hikeData)
                    .then((res) => {
                        const hikeId = res.data.id; // ID of the newly created hike
                        this.saveChecklist(hikeId); // Save checklist for the new hike
                        alert("Matk lisatud!");
                        this.resetForm(); // Clear the form
                        this.fetchFutureHikes(); // Refresh the list of hikes
                    })
                    .catch((err) => {
                        console.error("Viga matka lisamisel:", err);
                    });
            }
            ,
            saveChecklist(hikeId) {
                axios
                    .post(`${this.api}/${hikeId}/add-checklist`, this.selectedChecklistItems)
                    .then(() => {
                        alert("Checklist salvestatud!");
                    })
                    .catch((err) => {
                        console.error("Viga checklisti salvestamisel:", err);
                    });
            },
            async toggleChecklistCompletion(itemId, isCompleted) {
                try {
                    console.log(`Updating checklist item with id: ${itemId}, isCompleted: ${isCompleted}`);

                    // Make the API call to update the status in the backend
                    const response = await axios.patch(`${this.api}/checklist/${itemId}`, {
                        is_completed: isCompleted,
                    });
                    console.log("API Response:", response.data);

                } catch (error) {
                    console.error(`Error tehtud/tegemata: ${itemId}:`, error);
                }
            },
        },

        getters:
            {
                isDetailsVisible: (state) => (hikeId) => {
                    return state.visibleHikeId === hikeId;
                },
                getHikes(state) {
                    return state.hikes;
                }
                ,
                getHikingTrails(state) {
                    return state.hikingTrails;
                }
                ,
            }

        ,
    })
;
