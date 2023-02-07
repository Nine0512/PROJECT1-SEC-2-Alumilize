<script setup>
const words = [];

async function getRandomWord() {
  const response = await fetch("https://random-word-api.herokuapp.com/word?number=20");
  const data = await response.json();
  return data;
}

async function getAndLogRandomWords() {
    const word = await getRandomWord();
    words.push(word);
    console.log(word);
}

getAndLogRandomWords();


</script>
 
<template>
<div>
  
</div>
</template>
 
<style scoped>

</style>