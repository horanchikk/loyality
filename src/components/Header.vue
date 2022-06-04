<template>
  <div
    class="fixed w-screen top-0 left-0 border-b z-10 bg-gray-50"
    :class="$slots.default ? 'h-[var(--header-sait]' : 'h-[var(--sait)]'"
  >
    <div
      v-if="$slots.default"
      class="mt-sait w-screen h-[var(--header-height)]"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Header",
};
</script>
