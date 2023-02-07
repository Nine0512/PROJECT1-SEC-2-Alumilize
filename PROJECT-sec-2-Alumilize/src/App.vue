<script setup>

import {ref} from "vue";
import logo from './assets/HomeLogo.svg'
import questionMark from './assets/questionMark.svg'
import howToPlay from './assets/HowToPlay.svg'
import colorPalette from './assets/color-palette-svgrepo-com.svg'
import crown from './assets/crown-svgrepo-com.svg'
import home from './assets/home-3-svgrepo-com.svg'
import user from './assets/user-square-svgrepo-com.svg'
import restart from './assets/restart-svgrepo-com.svg'

let showModal = ref(false)
let showPlay = ref(false)
let showScores = ref(false)

function toggleModal() {
  this.showModal = !this.showModal;
}

function togglePlay() {
  this.showPlay = !this.showPlay;
}

function toggleScores() {
  this.showScores = !this.showScores;
}

// logic

import {wordArr} from "./data/wordArr.js";


let letter = ref([])
let countIndex = 0
let score = ref(0)
let history = ref({})
let word = []

for (let i = 0; i < 20; i++) {
  let ranWord = wordArr[Math.floor(Math.random() * wordArr.length)]
  if (word.every(e => e !== ranWord)) {
    word.push(ranWord)
  } else {
    i--
  }
  if (word.length > 20) {
    break
  }
}

word = word.join(' ')
word.split('').forEach((e, i) => history.value[i] = false)
let spiltWord = word.split(' ')

const isCorrect = (word, letter, index) => {
  if (word[index] === letter[index] && (Object.keys(history.value)[index] === '0' || history.value[index - 1])) {
    history.value[index] = true
    return true
  }
  return false
}

const increaseScore = () => {
  score.value <= spiltWord.length - 1 ? score.value++ : score.value
}

const reScore = () => {
  score.value = 0
  letter.value = []
  countIndex = 0
  history.value = {}
  word = []
  for (let i = 0; i < 1; i++) {
    let ranWord = wordArr[Math.floor(Math.random() * wordArr.length)]
    if (word.every(e => e !== ranWord)) {
      word.push(ranWord)
    } else {
      i--
    }
    if (word.length > 1) {
      break
    }
  }
  word = word.join(' ')
  word.split('').forEach((e, i) => history.value[i] = false)
  spiltWord = word.split(' ')
}

score.value = 0
letter.value = []
countIndex = 0
history.value = {}
word = []
for (let i = 0; i < 1; i++) {
  let ranWord = wordArr[Math.floor(Math.random() * wordArr.length)]
  if (word.every(e => e !== ranWord)) {
    word.push(ranWord)
  } else {
    i--
  }
  if (word.length > 1) {
    break
  }
}
word = word.join(' ')
word.split('').forEach((e, i) => history.value[i] = false)
spiltWord = word.split(' ')


let startTime
let endTime
let time = ref(0)
let wpm = ref(0)


window.addEventListener('keydown', (event) => {
  // console.log(event.key)

  if (event.key.length <= 1 && countIndex < Object.keys(history.value).length) {
    letter.value.push(event.key)
    countIndex++
    if (countIndex === 1) {
      startTime = Date.now()
    }
  } else if (event.key === 'Backspace' && !isCorrect(word, letter.value, countIndex - 1)) {
    letter.value.pop()
    history.value[countIndex <= 0 ? 0 : countIndex - 1] = false
    countIndex <= 0 ? countIndex = 0 : countIndex--
  }

  if (countIndex === Object.keys(history.value).length && isCorrect(word, letter.value, countIndex - 1)) {
    increaseScore()
    endTime = Date.now()
    time = ref(Math.floor((endTime - startTime) / 1000))
    wpm = ref(Math.floor((word.length / 5) / (time.value / 60)))
    toggleScores()
  }

  if (event.key === ' ' && isCorrect(word, letter.value, countIndex - 1)) {
    increaseScore()
  }

})


</script>

<template>
  <div class="w-screen min-h-screen bg-light_dark">

    <!-- home page -->
    <div class="grid grid-rows-2 p-12" v-if="!showPlay">
      <div class="grid grid-cols-4 gap-4 self-center max-sm:grid-cols-2 ">
        <div class="max-sm:hidden"></div>
        <div class="w-full h-full col-span-2 mt-20 mb-10">
          <div class="w-full">
            <img :src="logo" alt="logo" class="w-full h-auto">
          </div>
        </div>
        <div></div>
      </div>
      <div class="grid grid-cols-3 gap-4 p-5 h-1/2 place-content-center">
        <div></div>
        <div class="items-center justify-self-center">
          <div class="w-full flex items-center justify-center cursor-pointer" v-on:click="toggleModal()">
            <img :src="questionMark" alt="questionMark" class="w-4">
            <h1 class="text-white text-center text-dark_brown font-bold p-3">HOW
              TO PLAY</h1>
          </div>
          <button
              class="bg-soft_brown text-dark_brown font-bold py-2 px-4 rounded-full w-48 p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              v-on:click="togglePlay()">
            PLAY
          </button>
        </div>
        <div class="max-sm:hidden"></div>
      </div>
    </div>

    <!-- pop up-->
    <div>
      <div v-if="showModal"
           class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex max-sm:m-10 max-lg:m-5">
        <div class="relative my-6 mx-auto max-w-4xl">
          <div
              class="rounded-lg shadow-lg flex flex-col w-full bg-black border border-white">
            <div class="flex flex-row">
              <div class="basis-1/2 p-3">
                <div class="w-6 h-6 bg-light_gray border-solid rounded-full"></div>
              </div>
              <div class="flex items-center justify-end p-3 border-t border-solid rounded-b basis-1/2">
                <button class="w-6 h-6 text-center rounded bg-light_gray text-black font-bold m-0" type="button"
                        v-on:click="toggleModal()">X
                </button>
              </div>
            </div>
            <div class="grid grid-cols-4 max-sm:grid-cols-1 max-sm:place-items-center">
              <div class="max-sm:hidden"></div>
              <div class="p-3 flex-auto text-center col-span-2 max-sm:col-span-1 max-sm:p-12">
                <img src="https://media.tenor.com/cBmz8RTK_JsAAAAC/typing-anime.gif" alt="typing" class="max-sm:w-full">
                <!-- source "https://tenor.com/view/typing-anime-working-keyboard-gif-12614494" -->
                <img :src="howToPlay" alt="How to play" class="w-full h-auto max-sm:w-full">
                <p class="my-4 text-lg leading-relaxed text-left text-white max-sm:text-sm">
                  Press the buttons according to the characters displayed on the screen. Then the letters that you have
                  already typed will be displayed in white. If we make a mistake, the letters will be displayed in red.
                </p>
              </div>
              <div class="max-sm:hidden"></div>
            </div>
            <div class="flex flex-row">
              <div class="basis-1/2 p-3">
                <div class="w-6 h-6 bg-light_gray border-solid rounded-full"></div>
              </div>
              <div class="flex justify-end p-3 basis-1/2">
                <div class="w-6 h-6 bg-light_gray border-solid rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- play page -->
    <div v-if="showPlay">

      <div class="">
        <!-- head -->
        <div class="grid grid-cols-2 p-12 h-2">
          <div class="flex">
            <img :src="logo" alt="logo" class="w-1/4 h-auto cursor-pointer p-3" v-on:click="togglePlay()">
            <img :src="home" alt="home" class="w-12 h-auto cursor-pointer p-3" v-on:click="togglePlay()">
            <img :src="crown" alt="crown" class="w-12 h-auto p-3">
          </div>
          <div class="flex justify-end">
            <img :src="colorPalette" alt="colorPalette" class="w-12 h-auto p-3">
            <img :src="user" alt="user" class="w-12 h-auto p-3">
          </div>
        </div>
        <!-- body -->
        <div>
          <div class="grid grid-cols-5">
            <div></div>
            <div class="col-span-3">
              <div class="w-full p-10">
                <div class="w-full m-5 text-light_gray text-2xl">
                  <h2><b>score: </b> {{ score }}/{{ spiltWord.length }} {{ score === spiltWord.length ? 'finish' : '' }}
                  </h2>
                  <br>
                  <span v-for="(item,index) in word" :key="index" style="padding: 0 0.5px"
                        :class=" isCorrect(word, letter, index)? 'text-white' : index > countIndex - 1? 'text-light_gray opacity-50' : 'text-red' "><span
                      :class="countIndex === index? '' : 'hidden' " class="blink_me"
                      style="border-right: 1px solid;"></span>{{
                      item
                    }}</span>
                  <!--<p>{{ time }}</p>-->
                  <!--                <p>{{ letter.join('') }}</p>-->
                  <!--                <br>-->
                  <!--                <p> history:  {{ history }}</p>-->
                  <!--                <br>-->
                  <!--                <p> history value {{ Object.keys(history)[countIndex] }}</p>-->
                  <!--                <br>-->
                  <!--                <p> {{ spiltWord }}</p>-->
                  <!--                <br>-->
                  <!--                <p> countIndex: {{ countIndex }}</p>-->
                  <!--                <br>-->

                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div class="flex justify-center">
            <button @click="reScore()"><img :src="restart" alt="restart"
                                            class="w-12 h-auto cursor-pointer p-3 cursor-pointer">
            </button>
          </div>
        </div>
        <!-- footer -->
        <div></div>
      </div>

            <div class="text-white">
              <h1>Time : {{ time }}</h1>
              <h1>WPM : {{ wpm }}</h1>
            </div>


    </div>

  </div>
</template>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}

.blink_me {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
