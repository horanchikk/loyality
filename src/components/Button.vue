<template>
  <button
    class="text-center px-4 py-2 rounded-md transition-all shadow-md ring-2 font-semibold"
    :class="
      danger
        ? 'bg-white ring-red-500 active:ring-red-400 active:bg-red-50 m-0.5'
        : 'text-white bg-orange-500 ring-orange-500 active:bg-orange-400 active:ring-orange-400'
    "
    @click="onClick"
  >
    <div class="flex items-center">
      <LoadingIcon
        class="w-7 px-0.5 animate-spin-slow"
        :stroke="danger ? 'rgb(249 115 22)' : '#fffff0'"
        :className="isLoading ? 'block' : 'hidden'"
      />
      <div v-if="(!isLoading ? isLoading : false) || $slots.icon" class="w-7">
        <slot name="icon" />
      </div>
      <div
        class="text-lg text-center w-full transition-padding"
        :class="isLoading || $slots.icon ? 'pl-9 -ml-7' : ''"
      >
        <slot name="text" />
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import moby from "@mobyapps/moby.js";
import LoadingIcon from "./LoadingIcon";

export default {
  name: "Button",
  props: {
    danger: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    LoadingIcon,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async onClick() {
      const barcode = await moby.barcode.scan([moby.barcode.symbology.qr]);
      this.$emit("setBarcode", barcode);
    },
  },
};
</script>
