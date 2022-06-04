<template>
  <div
    class="w-screen"
    :class="[
      header ? 'mt-[var(--header-sait)]' : '',
      calc_height,
      scroll ? 'overflow-y-auto' : 'overflow-hidden',
      scrollbar ? 'scrollbar' : '',
    ]"
    :hidden="hidden"
    @scroll="onscroll"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "Content",
  props: {
    header: {
      type: Boolean,
      default: true,
    },
    footer: {
      type: Boolean,
      default: false,
    },
    scroll: {
      type: Boolean,
      default: true,
    },
    scrollbar: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    calc_height() {
      if (this.header) {
        if (this.footer)
          return "h-[calc(100vh-var(--header-sait)-var(--footer-saib))]";
        // both
        else return "h-[calc(100vh-var(--header-sait))]"; // just header
      } else {
        if (this.footer) return "h-[calc(100vh-var(--footer-saib))]";
        // just footer
        else return "h-screen"; // default
      }
    },
  },
  methods: {
    onscroll(e) {
      if (e.target.scrollTop > 10) {
        document.documentElement.style.setProperty(
          "--scrollbar-opacity",
          "block"
        );
      }

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        document.documentElement.style.setProperty(
          "--scrollbar-opacity",
          "none"
        );
      }, 2000);
    },
  },
};
</script>
