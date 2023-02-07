<script setup>
import { ref } from 'vue';


let allWords = [];

async function getRandomWord() {
  const response = await fetch("https://random-word-api.herokuapp.com/word?number=1000");
  const data = await response.json();
  return data;
}

let words = ref([])
let num = 20

async function getAndLogRandomWords() {
    const word = await getRandomWord()
    allWords = word
    useWord(num)
}

getAndLogRandomWords()

function useWord(num){
    words.value.length=0
    for (let i = 0; i < num; i++) {
      let ranWord = allWords[Math.floor(Math.random() * allWords.length)]
      words.value.push(ranWord)
    }
}

  </script>
  
  <template>
  <div>
    <button @click="useWord(num)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Random Word</button>
    <p> {{ words }}</p>
  </div>
  </template>
 
<style scoped>

</style>