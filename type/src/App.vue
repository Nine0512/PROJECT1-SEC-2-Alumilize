<script setup>
import {ref} from 'vue'
import {allWord} from "./data/allWord.js"

// let getWord = async (wordCount) => {
//   let response = await fetch(`https://random-word-api.herokuapp.com/word?number=${wordCount}`)
//   let data = await response.json()
//   word = Object.assign({}, data)
//   word = Object.values(word)
// }

let word = ref([])
let count = ref(0)
let wordCount = ref(0)
let status = true
let startTime = ref(0)
let endTime = ref(0)
let time
let wpm
let num = ref(20)

let randomWord = (num) => {
  for (let i = 0; i < num; i++) {
    let random = Math.floor(Math.random() * allWord.length)
    if (word.value.includes(allWord[random])) {
      i--
    } else {
      word.value.push(allWord[random])
    }
  }
}

randomWord(num.value)

word.value = word.value.join(' ')
let check = Array.from(word.value).map((key) => {
  return {
    letter: key,
    status: false
  }
})
let reset = () => {
  count.value = 0
  status = true
  word.value = []
  check = {}
  wordCount.value = 0
  randomWord(num.value)
  word.value = word.value.join(' ')
  check = word.value.split('').map((key) => {
    return {
      letter: key,
      status: false
    }
  })
}
let changeNumOfChar = (numOfChar) => {
  num.value = numOfChar
  reset()
}
let checkLetter = (letter, index) => {
  if (letter === check[index].letter) {
    check[index].status = true
  }
}
window.addEventListener('keydown', (e) => {
  if (status) {
    if (e.key.length === 1 && count.value > 0 && count.value < word.value.length) {
      if (check[count.value - 1].status === false && count.value < word.value.length) {
        count.value++
      } else {
        checkLetter(e.key, count.value)
        count.value++
      }
      if (e.key === ' ' && check[count.value - 1].letter === ' ' && check[count.value - 1].status === true) {
        wordCount.value++
      }
    }
    if (e.key.length === 1 && count.value === 0) {
      checkLetter(e.key, count.value)
      count.value++
      if (count.value === 1) {
        startTime = new Date()
      }
    }
    if (e.key === 'Backspace' && count.value > 0 && check[count.value - 1].status === false) {
      count.value--
    }
    if (check.every((item) => item.status === true)) {
      endTime = new Date()
      time = ref((endTime - startTime) / 1000)
      wpm = ref(Math.floor((word.value.length / 5) / (time.value / 60)))
      wordCount.value = num.value
      status = false
    }
  }
})
</script>

<template>
  <div class="w-screen min-h-screen bg-black text-white p-10">
    <div>
      <button @click="changeNumOfChar(20)" class="p-2 m-3 border-white border-2 border-solid rounded">20</button>
      <button @click="changeNumOfChar(50)" class="p-2 m-3 border-white border-2 border-solid rounded">50</button>
      <button @click="changeNumOfChar(100)" class="p-2 m-3 border-white border-2 border-solid rounded">100</button>
      <br>
      <h1>{{ wordCount }} / {{ num }}</h1>
      <div class="m-10">
       <span v-for="(item,index) in word" :key="index"
             :class="check[index].status?'text-white':index > count-1 ?'text-white opacity-50':'text-red-300'">{{
           item
         }}</span>
      </div>
      <p>count : {{ count }}</p>
      <p>time : {{ time }}</p>
      <p>wpm : {{ wpm }}</p>
      <button @click="reset">reset</button>
    </div>
  </div>

</template>

<style scoped>
</style>