<template>
  <div class="flex items-center w-screen h-full">
    <button
      class="group flex flex-row outline-none h-8 items-center ml-0 pr-2"
      @click="onClick"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 group-active:stroke-orange-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <div>{{ name }}</div>
    </button>
  </div>
</template>

<script lang="ts">
import moby from "@mobyapps/moby.js";
export default {
  name: "CloseButton",
  props: {
    name: {
      type: String,
      default: "Close",
    },
  },
  methods: {
    onClick() {
      moby.miniapp.pop(true, "");
    },
  },
};
</script>
