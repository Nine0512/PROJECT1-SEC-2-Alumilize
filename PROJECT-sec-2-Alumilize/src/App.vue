<script setup>
import { ref } from 'vue';
let blick = ref('')
const text = 'alumilize'
let score = ref(0)
let timer = ref(30)

let func = (event) => {
    if(score.value <= 0){score.value === 0}
    const key = event.key;
    console.log(key);
    // blick.value+=key //ใส่+=เพราะเมื่อรับค่าจะคีย์บอร์ดจะใส่แค่เท่ากับมันจะเปลี่ยนไปเรื่อยๆแต่ไม่รับค่า
    if (key !== 'Backspace') {blick.value+=key}
    if(key === 'Backspace'){blick.value = blick.value.slice(0,-1)}
    // if(key === 'Backspace'){score.value -= 1}
    for (let i = 0; i <= text.length; i++) {
      if(blick.value === text[i]){
        score.value +=1
      }
    }
    // if(blick.value === text[0]){score.value +=1}
    
}
const block = window.addEventListener('keydown',func)
let interval = setInterval(() => {
  if (timer.value === 0) {
    clearInterval(interval)
    // window.removeEventListener('keydown',func)                
  } else {
    timer.value--
    console.log(timer)
  }         
}, 1000)

</script>
 
<template>
<div class="w-full">
    <div class="justify-center">
      {{ timer }}s
      <br>
      {{ score }}
    
    <p>{{ text }}</p>
    <p>{{ blick }}</p>
  </div>
</div>
</template>
 
<stlye scoped>

</stlye>