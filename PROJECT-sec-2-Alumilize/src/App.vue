<script setup>

import {ref} from "vue";
import logo from './assets/HomeLogo.svg'
import questionMark from './assets/questionMark.svg'
import howToPlay from './assets/HowToPlay.svg'

let showModal = ref(false)

function toggleModal() {
  this.showModal = !this.showModal;
}

</script>

<template>
  <div class="w-screen min-h-screen bg-light_dark">

    <div class="grid grid-rows-2 p-12">
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
              class="bg-soft_brown text-dark_brown font-bold py-2 px-4 rounded-full w-48 p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            PLAY
          </button>
        </div>
        <div class="max-sm:hidden"></div>
      </div>
    </div>

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

  </div>
</template>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
