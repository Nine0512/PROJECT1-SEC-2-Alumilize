<script setup>

import {ref} from "vue";

const logo = 'images/HomeLogo.svg'
const questionMark = 'images/questionMark.svg'
const howToPlay = 'images/HowToPlay.svg'
const colorPalette = 'images/color-palette-svgrepo-com.svg'
const crown = 'images/crown-svgrepo-com.svg'
const home = 'images/home-3-svgrepo-com.svg'
const user = 'images/user-square-svgrepo-com.svg'
const restart = 'images/restart-svgrepo-com.svg'

let showModal = ref(false)
let showPlay = ref(false)
let gameMode = ref(true)

let refTime = 30
let timer = ref(30)


let toggleModal = () => {
  showModal.value = !showModal.value;
}

let togglePlay = () => {
  showPlay.value = !showPlay.value;
}

let changeTime = (time) => {
  refTime = time
  reset()
}


// logic
import {allWord} from "@/data/allWord";


let word = ref([])
let count = ref(0)
let wordCount = ref(0)
let status = true
let startTime = ref(0)
let endTime = ref(0)
let time
let wpm
let num = ref(15)

let timeArr = [30, 60, 90, 120]
let wordArr = [15, 25, 60, 120]

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

if (gameMode.value) {
  randomWord(100)
} else {
  randomWord(num.value)
}


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
  timer.value = refTime
  if (gameMode.value) {
    randomWord(100)
  } else {
    randomWord(num.value)
  }
  word.value = word.value.join(' ')
  check = word.value.split('').map((key) => {
    return {
      letter: key,
      status: false
    }
  })
}
let changeNum = (numOfChar) => {
  num.value = numOfChar
  reset()
}

let changeMode = (mode) => {
  gameMode.value = mode
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
        if (gameMode.value) {
          let interval = setInterval(() => {
            if (timer.value === 0) {
              clearInterval(interval)
              status = false
            } else {
              timer.value--
            }
          }, 1000)
        } else {
          startTime = new Date()
        }
      }
    }
    if (e.key === 'Backspace' && count.value > 0 && check[count.value - 1].status === false) {
      count.value--
    }
    if (e.key === 'Control') {
      reset()
    }

    if (gameMode.value) {
      if (timer.value === 0) {
        wpm = ref(Math.floor((count.value / 5) / (refTime / 60)))
        status = false
      }
    } else {
      if (check.every((item) => item.status === true)) {
        endTime = new Date()
        time = ref((endTime - startTime) / 1000)
        wpm = ref(Math.floor((word.value.length / 5) / (time.value / 60)))
        wordCount.value = num.value
        status = false
      }
    }
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

      <div class="grid grid-cols-1">
        <!-- head -->
        <div class="grid grid-cols-2 p-10">
          <div class="flex">
            <img :src="logo" alt="logo" class="w-1/4 h-auto cursor-pointer p-3" v-on:click="togglePlay()">
            <img :src="home" alt="home" class="w-12 h-auto cursor-pointer p-3" v-on:click="togglePlay()">
            <img :src="crown" alt="crown" class="w-12 h-auto p-3">
          </div>
          <div class="flex justify-end">
            <img :src="colorPalette" alt="colorPalette" class="w-12 h-auto p-3">
            <img :src="user" alt="user" class="w-12 h-auto p-3">
          </div>

          <div class="bg-dark_gray opacity-50 rounded grid col-span-2 w-3/6 justify-self-center">
            <div class="grid grid-cols-2 place-content-center pl-2">
              <div class="cursor-pointer flex">
                <h1 class="p-2 cursor-pointer text-white hover:opacity-100"
                    :class="!gameMode?'opacity-100':'opacity-50'" @click="changeMode(false)">word</h1>
                <h1 class="p-2 cursor-pointer text-white hover:opacity-100" :class="gameMode?'opacity-100':'opacity-50'"
                    @click="changeMode(true)">time</h1>
              </div>
              <div v-if="gameMode" class="flex justify-end pr-2 text-white">
                <div v-for="(item,index) in timeArr" :key="index">
                  <div @click="changeTime(item)"
                       class="p-2 cursor-pointer flex hover:opacity-100"
                       :class="refTime === item?'opacity-100':'opacity-50'">{{ item }}
                  </div>
                </div>
              </div>
              <div v-else class="flex justify-end pr-2 text-white">
                <div v-for="(item,index) in wordArr" :key="index">
                  <div @click="changeNum(item)"
                       class="p-2 cursor-pointer flex hover:opacity-100"
                       :class="num === item?'opacity-100':'opacity-50'">{{ item }}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- body -->
        <div class="h-full grid grid-rows-1">
          <div class="w-4/5 flex justify-self-center p-10 m-5 text-light_gray text-2xl">
            <div class="w-full h-full">

              <h1 v-if="gameMode">{{ timer }}</h1>
              <h1 v-else>{{ wordCount }} / {{ num }}</h1>

              <br>
              <div class=" h-4/6 overflow-y-hidden">
                <span v-for="(item,index) in word" :key="index"
                      :class="check[index].status?'text-white':index > count-1 ?'text-white opacity-50':'text-red'"><span
                    :class="count === index? '' : 'hidden' " class="blink_me"
                    style="border-right: 1px solid;"></span>{{
                    item
                  }}</span>
              </div>

            </div>
          </div>
          <div class="flex justify-center">
            <div @click="reset"><img :src="restart" alt="restart"
                                     class="w-12 h-auto cursor-pointer p-3 cursor-pointer">
            </div>
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

.blink_me {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
