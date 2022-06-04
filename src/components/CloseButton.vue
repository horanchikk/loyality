<template>
  <div
    class="flex items-center w-screen h-full animate__animated animate__fadeInRight"
  >
    <button
      class="group flex flex-row outline-none h-8 items-center ml-0 pr-2"
      @click="onclick"
    >
      <i class="mx-2 pi pi-chevron-left"></i>
      <div>Выход</div>
    </button>
    <div class="flex w-full justify-center items-center">Loyality</div>
    <button
      v-if="this.$parent.username != null || this.$parent.username != undefined"
      class="group flex flex-row outline-none h-8 items-center ml-0 pr-2"
      @click="onClick"
    >
      <p>{{ this.$parent.username }}</p>
      <i class="mx-2 pi pi-user-minus"></i>
    </button>
    <button
      v-else
      class="group flex flex-row outline-none h-8 items-center ml-0 pr-2"
      @click="login"
    >
      <p>Войти</p>
      <i class="mx-2 pi pi-user"></i>
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
      default: "Выход",
    },
  },
  methods: {
    onClick() {
      moby.miniapp.pop(true, "");
    },
    login() {
      console.log("login");
      console.log(this.$root.spinner);
    },
    logout() {
      console.log("logout");
    },
  },
};
</script>
