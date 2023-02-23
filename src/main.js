import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

async function getRandomWord() {
    const response = await fetch("https://random-word-api.herokuapp.com/word?number=1000");
    const data = await response.json();
    return data;
}

export {getRandomWord}

createApp(App).mount('#app')
