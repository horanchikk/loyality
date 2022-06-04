<template>
  <div
    class="h-screen w-screen z-20 absolute inset-0 bg-black/25"
    :class="isVisible ? 'block ' : isOpen ? 'block' : 'hidden'"
    @click="onClose"
  >
    <div
      class="w-full bg-white absolute bottom-0 rounded-t-3xl transition-height duration-300"
      :class="isOpen ? 'h-2/3 ease-out' : 'h-0 ease-out'"
      @click.stop
    >
      <div class="p-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Modal",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timeout: 350,
      isOpen: false,
    };
  },
  watch: {
    isVisible(val) {
      if (val) {
        this.onOpen();
      }
    },
  },
  mounted() {
    this.onOpen();
  },
  methods: {
    onClose() {
      this.isOpen = false;
      setTimeout(() => {
        this.$emit("onClose");
      }, this.timeout);
    },
    onOpen() {
      setTimeout(() => {
        this.isOpen = this.isVisible;
      }, this.timeout);
    },
  },
};
</script>
