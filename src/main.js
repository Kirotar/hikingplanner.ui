import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Import Pinia
import App from './App.vue';
import router from './router'; // Keep the router import

const app = createApp(App);

// Create Pinia instance
const pinia = createPinia();

app.use(pinia); // Register Pinia
app.use(router); // Register Router

app.mount('#app');
