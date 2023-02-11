<script setup>
import { ref } from 'vue';


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

function deleteWord(){
    words.pop()
    showWords.value = words.join(' ')
}

window.addEventListener( 'keydown',  event => {
if( event.key === words.join(' ').charAt( index.value ) ){
    console.log('correct');
    index.value++;
   
} else  {
    console.log('wrong');
   
} 
countIndex.value++;


if( words.join(' ').length === index.value ){
    console.log('finish');
    index.value = 0;
    useWord(num)
}

if( event.key === 'Delete' ){
    deleteWord()
    index.value--;
    countIndex.value--;
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
