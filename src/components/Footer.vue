<template>
  <div
    class="fixed w-screen bottom-0 left-0 border-t z-10 bg-gray-50"
    :class="$slots.default ? 'h-[var(--footer-saib)]' : 'h-[var(--saib)]'"
  >
    <div v-if="$slots.default" class="w-screen h-[var(--footer-height)]">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Footer",
  mounted() {
    if (this.$slots.default) {
      document.documentElement.style.setProperty(
        "--footer-height",
        "var(--basic-header-height)"
      );
    } else {
      document.documentElement.style.setProperty("--footer-height", "0px");
    }
  },
};
</script>
