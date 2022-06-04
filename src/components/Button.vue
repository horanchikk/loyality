<template>
  <button
    class="text-center px-4 py-2 rounded-md transition-all shadow-md ring-2 font-semibold"
    :class="
      danger
        ? 'bg-white ring-red-500 active:ring-red-400 active:bg-red-50 m-0.5'
        : 'text-white bg-orange-500 ring-orange-500 active:bg-orange-400 active:ring-orange-400'
    "
    @click="onClick"
  ></button>
</template>

<script lang="ts">
import moby from "@mobyapps/moby.js";

export default {
  name: "Button",
  props: {
    danger: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async onClick() {
      if (this.action == "barcode") {
        const barcode = await moby.barcode.scan([moby.barcode.symbology.qr]);
        if (barcode.split("?")[0] == "loyality") {
          this.$emit("result", barcode);
        } else {
          this.$emit("result", "splitError");
        }
      } else if (this.action == "login") {
        this.$emit("result", true);
      }
    },
  },
};
</script>
