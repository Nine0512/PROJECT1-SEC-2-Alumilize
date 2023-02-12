<script setup>
import { ref } from 'vue';


let allWords = []
let words = []
let showWords = ref('')
let num = 2
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

const correctWord = (word, index, typing) => {
  if (word[index] === typing[index]) {
    return true;
  }
  return false;
}



window.addEventListener( 'keydown',  event => {
if( event.key === words.join(' ').charAt( index.value ) ){
   correctWord.value = true;
    index.value++;
   
} else  {
  ( event.key === 'Backspace' && event.key !== words.join(' ').charAt( index.value ) )
    // words.value = words.slice(0, -1)
    countIndex.value--;
    console.log('backspace');

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
<div >

    <button @click="useWord(num)" class="bg-black hover:bg-dark_brown text-white font-bold py-2 px-4 rounded">Get Random Word</button>
  <div>
  <p>{{ showWords }}</p>
  </div>

  <div>
  <p>index : {{  index }}</p>
  </div>

  <p>countIndex : {{ countIndex }}</p>
</div>

  </template>
 
<style scoped>

</style>
