<template>
  <div
    class="p-6 text-white bg-[rgba(0,0,0,0.3)] rounded-2xl col-span-2 md:col-span-1 w-full flex flex-col"
  >
    <div class="flex flex-col gap-1">
      <p class="h-4 w-32 rounded-lg bg-sky-800 animate-pulse"></p>
      <p class="h-4 w-16 rounded-lg bg-sky-800 animate-pulse"></p>
    </div>
    <div class="flex flex-col justify-center gap-2 flex-1">
      <div class="flex justify-center">
        <div class="w-16 h-16 rounded-full bg-sky-800 animate-pulse"></div>
      </div>
      <div class="flex flex-col items-center w-full gap-2">
        <p class="relative h-12 w-12 rounded-lg bg-sky-800 animate-pulse">
          <span class="absolute top-1 -right-6">&#176;C</span>
        </p>
        <p class="h-4 w-32 rounded-lg bg-sky-800 animate-pulse"></p>
        <p class="h-4 w-32 rounded-lg bg-sky-800 animate-pulse"></p>
      </div>
      <div class="grid grid-cols-3 gap-2 mt-4 text-sm flex-1">
        <div class="flex flex-col items-center text-center gap-1">
          <v-icon name="wi-humidity"></v-icon>
          <span class="h-4 w-4 bg-sky-800 animate-pulse rounded-lg"></span>
        </div>
        <div class="flex flex-col items-center text-center gap-1">
          <v-icon name="wi-sandstorm"></v-icon>
          <span class="h-4 w-4 bg-sky-800 animate-pulse rounded-lg"></span>
        </div>
        <div class="flex flex-col items-center text-center gap-1">
          <v-icon name="bi-eye"></v-icon>
          <span class="h-4 w-4 bg-sky-800 animate-pulse rounded-lg"></span>
        </div>
        <div class="flex flex-col items-center text-center gap-1">
          <v-icon name="wi-day-sunny"></v-icon>
          <span class="h-4 w-4 bg-sky-800 animate-pulse rounded-lg"></span>
        </div>
        <div class="flex flex-col items-center text-center gap-1">
          <v-icon name="ri-temp-cold-line"></v-icon>
          <span class="h-4 w-4 bg-sky-800 animate-pulse rounded-lg"></span>
        </div>
        <div class="flex flex-col items-center text-center">
          <v-icon name="io-navigate" class="rotate-[-45deg]"></v-icon>
          <span class="h-4 w-4 bg-sky-800 animate-pulse rounded-lg"></span>
        </div>
      </div>
    </div>
  </div>
</template>
