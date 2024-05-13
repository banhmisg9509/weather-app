<template>
  <div class="bg-[rgba(0,0,0,0.2)] flex flex-col items-center rounded-xl p-4 w-full">
    <div class="h-4 w-32 rounded-lg bg-sky-700 animate-pulse"></div>
    <div class="h-16 w-16 rounded-full bg-sky-700 animate-pulse mt-2"></div>
    <p class="h-4 w-16 my-2 bg-sky-700 animate-pulse"></p>
    <div class="rounded-full bg-gradient-to-r from-orange-500 to-green-400 w-full h-[1px]"></div>
    <div class="grid grid-cols-2 gap-2 mt-2 w-full">
      <div>
        <v-icon name="la-temperature-high-solid" color="orange" />
        <span class="inline-block w-9 h-4 rounded-lg bg-sky-700 animate-pulse"></span>
      </div>
      <div>
        <v-icon name="la-temperature-low-solid" color="lime" />
        <span class="inline-block w-9 h-4 rounded-lg bg-sky-700 animate-pulse"></span>
      </div>
      <div>
        <v-icon name="gi-sunrise" />
        <span class="inline-block w-9 h-4 rounded-lg bg-sky-700 animate-pulse"></span>
      </div>
      <div>
        <v-icon name="gi-sunset" />
        <span class="inline-block w-9 h-4 rounded-lg bg-sky-700 animate-pulse"></span>
      </div>
      <div>
        <v-icon name="gi-raining"></v-icon>
        <span class="inline-block w-9 h-4 rounded-lg bg-sky-700 animate-pulse"></span>
      </div>
      <div>
        <v-icon name="wi-moon-alt-new"></v-icon>
        <span class="inline-block w-9 h-4 rounded-lg bg-sky-700 animate-pulse"></span>
      </div>
    </div>
  </div>
</template>
