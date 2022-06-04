<template>
  <div
    class="w-full ring-2 shadow-md ring-yellow-600 rounded-md flex flex-row h-28"
    @click="onClick"
  >
    <div class="w-4/12">
      <img
        class="object-cover h-full rounded-l-md"
        :src="imgUrl"
        alt="survey"
      />
    </div>
    <div class="w-8/12 p-2">
      <div class="line-clamp-1 font-semibold">{{ name }}</div>
      <div class="line-clamp-4 text-sm">{{ description }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import moby from "@mobyapps/moby.js";
export default {
  name: "SurveyCard",
  props: {
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    imgUrl: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
  },
  methods: {
    async onClick() {
      await moby.miniapp.open_url(this.url, "");
    },
  },
};
</script>
