<script setup>
import { ref } from 'vue';

// non

let allWords = []
let words = []
let showWords = ref('')
let num = 1

async function getRandomWord() {
  const response = await fetch("https://random-word-api.herokuapp.com/word?number=1000");
  const data = await response.json();
  return data;
}

async function getAndLogRandomWords() {
    const word = await getRandomWord()
    allWords = word
    useWord(num)
}

getAndLogRandomWords()

function useWord(num){
    words.length=0
    for (let i = 0; i < num; i++) {
      let ranWord = allWords[Math.floor(Math.random() * allWords.length)]
      words.push(ranWord)
    }
    console.log(words)
    showWords.value = words.join(' ')
}

// check word

let typeKey = ref([])
let countType = ref(0)

function checkWord(event){
  if(event.key.length === 1 && !(typeKey.value.length===showWords.value.length)){
     typeKey.value.push(event.key)
     countType.value++
  }
  if(event.key === 'Backspace' && countType.value > 0){
    typeKey.value.pop()
    countType.value--
  }
}

function correctWord(word,input,index){
 return word === input[index]
}

window.document.addEventListener('keydown', checkWord)





</script>



<template>
    <div class="w-full h-screen bg-black">
  <div class="flex flex-col items-center justify-center h-full">



<div class="text-white">
  <span v-for="(e,i) in showWords" :key="i" :class="correctWord(e,typeKey,i) ? 'text-green' : countType-1 < i ? 'text-gray-500' : 'text-red' "> {{ e }}</span>
</div> 




  <button @click="useWord(num)" class="bg-black hover:bg-dark_brown text-white font-bold py-2 px-4 rounded">Get Random Word</button>
  <div>
  <p class="text-white">countType : {{  countType }}</p>
  </div>

</div>
</div>
</template>
 
<style scoped>

</style>
