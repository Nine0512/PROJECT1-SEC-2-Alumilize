<script setup>
import { ref } from 'vue';

// non

let allWords = []
let words = []
let showWords = ref('')
let num = 1
let index = ref(0)
let countIndex = ref(0)

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

// benz

let typing = ref('')

const correctWord = (words, index, typing) => {
  if( words === typing.charAt(index)){
    return words === typing.charAt(index)
  }
}

window.addEventListener( 'keypress',  event => {
  typing.value = event.key
if( event.key === words.join(' ').charAt( index.value ) ){
   correctWord.value = true;
    index.value++;
   
} else  {
  ( event.key === 'Backspace' && event.key !== words.join(' ').charAt( index.value ) )
    words.value = words.slice(0, -1)
    // countIndex.value--;
    console.log('backspace');
} 
countIndex.value++;

if( index.value === words.join(' ').length ){
    console.log('next word');
    index.value = 0;
    countIndex.value = 0;
    useWord(num)
}

history = []
let logHis = typing.push(history)

}  
)



</script>
  <template>
    <div class="w-full h-screen bg-black">
<div class=" items-center justify-center h-full">

  <span v-for="(showWords, index) in words.join('')" :key="index" :class="correctWord(words, index, typing)? 'text-red' : index > countIndex - 1? 'text-light_gray' : 'text-green'">
     {{ showWords }}
  </span>

  <span> {{ showWords}}</span>

  <button @click="useWord(num)" class="bg-black hover:bg-dark_brown text-white font-bold py-2 px-4 rounded">Get Random Word</button>
  <div>
  <p class="text-white">index : {{  index }}</p>
  </div>

  <p class="text-white ">countIndex : {{ countIndex }}</p>
</div>
</div>
  </template>
 
<style scoped>

</style>
