<template>
  <div class="fixed top-0 left-0 w-full h-full flex justify-center">
    <svg
      class="transition-opacity animate-spin text-black self-center duration-500 opacity-100"
      :class="width"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        :stroke="stroke"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        :fill="fill"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "Spinner",
  props: {
    width: {
      type: String,
      default: "w-6",
    },
    fill: {
      type: String,
      default: "grey",
    },
    stroke: {
      type: String,
      default: "grey",
    },
  },
};
</script>
