<script setup>

let words = [];

async function getRandomWord() {
  const response = await fetch("https://random-word-api.herokuapp.com/word?number=20");
  const data = await response.json();
  return data;
}

async function getAndLogRandomWords() {
    const word = await getRandomWord();
    words = []
    if (words.length === 0) {
      words.push(word);
    }
}

</script>
 
<template>  
<div>
  <button @click="getAndLogRandomWords" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Random Word</button>
</div>
</template>
 
<style scoped>

</style>