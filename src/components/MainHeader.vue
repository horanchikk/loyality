<template>
  <div
    class="flex items-center w-screen h-full animate__animated animate__fadeInRight"
  >
    <button
      class="group flex flex-row outline-none h-8 items-center ml-0 pr-2"
      @click="goback"
    >
      <i class="mx-2 pi pi-chevron-left"></i>
      <div>Назад</div>
    </button>
    <div class="flex w-full justify-center items-center">Loyality</div>
    <button
      v-if="phone != '' && logged == true"
      class="group flex flex-row outline-none h-8 items-center ml-0 w-full pr-2"
      @click="logout"
    >
      <p>{{ phone }}</p>
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
  name: "MainHeader",
  props: {
    name: {
      type: String,
      default: "Выход",
    },
    phone: {
      type: String,
    },
    logged: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    goback() {
      moby.miniapp.pop(true, "");
    },
    async login() {
      this.$emit("sendlogin", true);
    },
    async logout() {
      this.$emit("login", false);
    },
  },
};
</script>
