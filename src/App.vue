<script setup>

import {ref} from 'vue';

const logo = 'images/HomeLogo.svg'
const questionMark = 'images/questionMark.svg'
const howToPlay = 'images/HowToPlay.svg'
const home = 'images/home-3-svgrepo-com.svg'
const restart = 'images/restart-svgrepo-com.svg'

let allWords = []
let words = []
let showWords = ref('')
let index = ref(0)
let countIndex = ref(0)
let countCorrect = 0
let accuracy = ref(0)
let startTime = 0
let endTime = 0
let time = ref(0)
let wpm = ref(0)
let interval
let history = ref([])
let timeArr = [15, 30, 60, 120]
let wordArr = [10, 25, 50, 100]
let refTime = timeArr[1]
let timer = ref(refTime)
let showModal = ref(false)
let showPlay = ref(false)
let gameMode = ref(false)
let status = ref(true)
let num = wordArr[0]

let toggleModal = () => {
  showModal.value = !showModal.value;
}

let togglePlay = () => {
  reset()
  showPlay.value = !showPlay.value;
}

let changeMode = (mode) => {
  if (mode) {
    num = 100
  } else {
    num = wordArr[0]
  }
  gameMode.value = mode
  reset()
}

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

function useWord(num) {

  words.length = 0
  for (let i = 0; i < num; i++) {
    let ranWord = allWords[Math.floor(Math.random() * allWords.length)]
    words.push(ranWord)
  }
  showWords.value = words.join(' ')
}

let changeNum = (number) => {
  num = number
  reset()
}

let changeTime = (time) => {
  refTime = time
  reset()
}

let calculateTime = () => {
  countCorrect = Object.keys(objectCorrect).length
  accuracy.value = Math.floor(((countIndex.value - Object.keys(objectWrong).length) / countIndex.value) * 100)
  if (gameMode.value) {
    wpm.value = Math.floor((countCorrect / 5) / (refTime / 60))
  } else {
    endTime = new Date()
    time.value = (endTime - startTime) / 1000
    wpm.value = Math.floor((countCorrect / 5) / (time.value / 60))
  }
  status.value = false
}

let reset = () => {
  history.value.length = 0
  index.value = 0;
  countIndex.value = 0;
  timer.value = refTime
  status.value = true
  countCorrect = 0
  accuracy.value = 0
  wpm.value = 0
  objectCorrect = {}
  objectWrong = {}
  clearInterval(interval)
  useWord(num)
  window.addEventListener('keydown', func)
}

let correctWord = (word, input, index) => {
  return word === input[index]
}

let objectCorrect = {}
let objectWrong = {}

let correct = (index) => {
  objectCorrect[index] = true
  return 'text-white'
}

let wrong = (index) => {
  objectWrong[index] = true
  return 'text-red-500'
}


let func = event => {
  if (index.value === 0 && gameMode.value) {
    interval = setInterval(() => {
      if (timer.value === 0) {
        clearInterval(interval)
        calculateTime()
        window.removeEventListener('keydown', func)
      } else {
        timer.value--
      }
    }, 1000)
  }

  if (event.key.length === 1) {
    history.value.push(event.key)
    index.value++;
    countIndex.value++;
    if (countIndex.value === 1) {
      startTime = new Date()
    }
  } else if (event.key === 'Backspace') {
    history.value.pop()
    if (countIndex.value > 0) {
      countIndex.value--;
    }
  }

  if (countIndex.value === words.join(' ').length) {
    calculateTime()
    window.removeEventListener('keydown', func)
  }

}

window.addEventListener('keydown', func)

</script>

<template>

  <div class="w-screen min-h-screen bg-[#0A0A0A]">

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
          <div class="w-full flex items-center justify-center cursor-pointer" @click="toggleModal">
            <img :src="questionMark" alt="questionMark" class="w-4">
            <h1 class="text-white text-center text-[#F1DDC9] font-bold p-3">HOW
              TO PLAY</h1>
          </div>
          <button
              class="bg-[#F1DDC9] text-[#B76E22] font-bold py-2 px-4 rounded-full w-48 p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              @click="togglePlay">
            PLAY
          </button>
        </div>
        <div class="max-sm:hidden"></div>
      </div>
    </div>

    <!-- pop up-->
    <div v-if="showModal"
         class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex max-sm:m-10 max-lg:m-5">
      <div
          class="relative my-6 mx-auto max-w-4xl rounded-lg shadow-lg flex flex-col w-full bg-black border border-white">

        <div class="flex flex-row">
          <div class="basis-1/2 p-3">
            <div class="w-6 h-6 bg-[#D9D9D9] border-solid rounded-full"></div>
          </div>
          <div class="flex items-center justify-end p-3 border-t border-solid rounded-b basis-1/2">
            <button class="w-6 h-6 text-center rounded bg-[#D9D9D9] text-black font-bold m-0" type="button"
                    @click="toggleModal">X
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
            <div class="w-6 h-6 bg-[#D9D9D9] border-solid rounded-full"></div>
          </div>
          <div class="flex justify-end p-3 basis-1/2">
            <div class="w-6 h-6 bg-[#D9D9D9] border-solid rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPlay">

      <div class="flex flex-col h-screen">
        <!-- head -->
        <div class="grid grid-cols-2 p-10">
          <img :src="logo" alt="logo" class="w-1/4 h-auto cursor-pointer p-3 max-sm:w-2/3" @click="togglePlay">
          <div class="flex justify-end">
            <img :src="home" alt="home" class="w-12 h-auto cursor-pointer p-3" @click="togglePlay">
          </div>

          <div
              class="bg-[#F1DDC9] opacity-80 rounded grid col-span-2 w-3/6 justify-self-center text-[#B76E22] font-bold max-sm:w-full max-sm:text-xs">
            <div class="grid grid-cols-2 place-content-center pl-2">
              <div class="cursor-pointer flex">
                <h1 class="p-2 cursor-pointer hover:opacity-100"
                    :class="!gameMode?'opacity-100':'opacity-60'" @click="changeMode(false)">word</h1>
                <h1 class="p-2 cursor-pointer hover:opacity-100" :class="gameMode?'opacity-100':'opacity-60'"
                    @click="changeMode(true)">time</h1>
              </div>
              <div v-if="gameMode" class="flex justify-end pr-2">
                <div v-for="(item,index) in timeArr" :key="index">
                  <div @click="changeTime(item)"
                       class="p-2 cursor-pointer flex hover:opacity-100"
                       :class="refTime === item?'opacity-100':'opacity-60'">{{ item }}s
                  </div>
                </div>
              </div>
              <div v-else class="flex justify-end pr-2">
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
          <div class="w-4/5 flex flex-col justify-self-center p-10 m-5 text-white text-2xl max-sm:text-base max-sm:w-full">
            <div class="h-3/5">
              <h1 v-if="gameMode">{{ timer }}</h1>
              <!--              <h1 v-else>{{ wordCount }} / {{ num }}</h1>-->
              <br>
              <span v-for="(item, index) in showWords" :key="index"
                    :class="correctWord(item, history, index )? correct(index) :  index>countIndex-1 ? 'text-gray-400' : wrong(index)"><span
                  :class="countIndex === index? '' : 'hidden' " class="blink_me"
                  style="border-right: 1px solid;"></span>{{
                  item
                }}</span>
            </div>
            <div @click="reset" class="flex justify-center">
              <img :src="restart" alt="restart"
                   class="w-12 h-auto cursor-pointer p-3 cursor-pointer">
            </div>
          </div>

        </div>


        <!-- footer -->
        <footer class="mb-5">
          <div class="flex text-white justify-center mt-auto max-sm:text-xs">
            <a href="https://github.com/Nine0512/PROJECT1-SEC-2-Alumilize" class="opacity-60 hover:opacity-100 pl-5">&lt;/&gt; github</a>
            <p class="opacity-60 hover:opacity-100 pl-5">REF : <a href="https://monkeytype.com/">monkeytype</a></p>
            <p class="opacity-60 hover:opacity-100 pl-5">Word API : <a href="https://random-word-api.herokuapp.com/home">Random Word API</a></p>
          </div>
        </footer>
      </div>


      <!-- pop up score -->
      <div v-if="!status"
           class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex max-sm:m-10 max-lg:m-5">
        <div
            class="relative my-6 mx-auto max-w-4xl p-5 rounded-lg shadow-lg flex flex-col w-full bg-black border border-white">
          <div class="grid grid-cols-2 text-[#D9D9D9]">
            <div class="w-4/5 p-10 m-5 text-2xl max-w-7xl">
              <div>
                <h1 class="opacity-50">wpm</h1>
                <h1 class="text-6xl">{{ wpm }}</h1>
              </div>
              <div class="mt-5">
                <h1 class="opacity-50">accuracy</h1>
                <h1 class="text-6xl">{{ accuracy < 0 ? 0 : accuracy }}%</h1>
              </div>
              <div class="mt-5">
                <h1 class="opacity-50">time</h1>
                <h1 v-if="gameMode" class="text-6xl">{{ refTime }}s</h1>
                <h1 v-else class="text-6xl">{{ time }}s</h1>
              </div>
            </div>
            <div class="justify-self-center max-sm:hidden">
              <div v-if="wpm<=29">
                <img src="https://media.tenor.com/zcax6e0DLyEAAAAS/ummm.gif" alt="Turtle" class="w-72 h-auto pt-5">
                <!-- ref : https://tenor.com/view/ummm-gif-25800187 -->
                <h1 class="text-3xl font-bold pt-5">You're a Turtle.</h1>
                <h1 class="pt-5">Very slow typing.</h1>
              </div>
              <div v-else-if="wpm>=30 && wpm <= 49">
                <img src="https://media.tenor.com/WC3Hil6PFD8AAAAM/capybara-riding.gif" alt="Capybara"
                     class="w-72 h-auto pt-5">
                <!-- ref : https://tenor.com/view/capybara-riding-alligator-capybara-riding-a-crocodile-gif-27496961 -->
                <h1 class="text-3xl font-bold pt-5">Normal!!</h1>
                <h1 class="pt-5">Not good and not bad.</h1>
              </div>
              <div v-else-if="wpm>=50">
                <img src="https://i.pinimg.com/originals/7b/65/19/7b6519089cc27135155459ece52f51f4.gif"
                     alt="Anime running" class="w-72 h-auto pt-5">
                <h1 class="text-3xl font-bold pt-5">Very fast!!!!!</h1>
                <h1 class="pt-5">Very fast typing. Really awesome!!</h1>
              </div>
            </div>
          </div>
          <div @click="reset" class="mt-5 flex justify-center">
            <img :src="restart" alt="restart"
                 class="w-12 h-auto cursor-pointer p-3 cursor-pointer">
          </div>
        </div>
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