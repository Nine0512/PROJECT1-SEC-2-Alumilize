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
let history = ref([])

//เช็คถูกผิด
let correctWord = ( word, input ,index ) => {
  if( word  === input[index] ){
    console.log('true');
    return true;
  }
  console.log('false');
  return false;
}


window.addEventListener( 'keydown',  event => {
  
if( event.key.length === 1){
   history.value.push(event.key)
   console.log(history.value);
   countIndex.value++;
   
} else if ( event.key === 'Backspace'  )   {
  history.value.pop()
  console.log(history.value);
  countIndex.value--;
} 
countIndex.value++;

if( index.value === words.join(' ').length ){
    console.log('next word');
    index.value = 0;
    countIndex.value = 0;
    useWord(num)
}
}
)

</script>
  <template>
    <div class="w-full h-screen bg-black">
<div class=" p-20  h-full">

  <span v-for="(item, index) in showWords" :key="index" :class="correctWord(item, history, index )? 'text-green' : index > countIndex - 1? 'text-light_gray' : 'text-red'">
     {{ item }}
  </span>

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



<!-- issue ตน.การเปลี่ยนสี่ยังไม่ถุก -->
