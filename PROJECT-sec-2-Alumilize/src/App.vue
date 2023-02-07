<script setup>
import { looseIndexOf } from '@vue/shared';
import { ref } from 'vue';


let words = [];





let showWords = ref('')

async function getRandomWord() {
  const response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
  const data = await response.json()
  return data;
}

async function getAndLogRandomWords() {
    const word = await getRandomWord()
    words = []
    words.push(word)
    showWords.value = words[0].join(' ')
    // console.log(showWords.value.charAt());
    // console.log(typeof showWords.value);
}

getAndLogRandomWords()

//Benz Area

// เช็คว่ามีคำที่เราพิมพ์เข้ามาใน words หรือไม่ถ้าใช่ให้เพิ่ม index ขึ้น 1
// event.key คือ คำที่เราพิมพ์เข้ามา
// words[0].join(' ') คือ คำที่เราได้จาก api มาเป็น array แล้วเอามา join เป็น string
// charAt(index) คือ ตัวที่ index นั้นๆ ใน string
let index = ref(0)
let countIndex = ref(0)

window.addEventListener( 'keydown',  event => {
if( event.key === words[0].join(' ').charAt( index.value  ) ){
    console.log('correct');
    index.value++;
   
} else  {
    console.log('wrong');
   
} 
countIndex.value++;
// console.log(index);
// console.log(countIndex);



if( showWords.value.length === index.value ){
    console.log('end');
    
}
}
);

// let um =  showWords.length === index ? true : false

</script>
 
<template>  
<div class="pl-10 ; pt-10">
  <button @click="getAndLogRandomWords" class="bg-dark_brown hover:bg-black text-white font-bold py-2 px-4 rounded">Get Random Word</button>
  
  <!-- //ถ้า showWords มีค่าเท่ากับ index ให้พื้นหลังเป็นสีเขียวถ้าไม่ใช้ให้เป็นสีแดง -->
  <div v-if="um" >
  <p :class="" >{{ showWords }}</p>
  </div>

  <div>
  <p>index : {{  index }}</p>
  </div>

  <p>countIndex : {{ countIndex }}</p>
</div>
</template>
 
<style scoped>

</style>