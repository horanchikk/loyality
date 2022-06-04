<template>
  <div :class="className">
    <svg
      version="1.1"
      viewBox="-58 -58 116 116"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g stroke-linecap="round" stroke-width="15">
        <path id="a" d="m0 35 0,14" />
        <use
          transform="rotate(210)"
          xlink:href="#a"
          :stroke="stroke"
          opacity="0.08"
        />
        <use
          transform="rotate(240)"
          xlink:href="#a"
          :stroke="stroke"
          opacity="0.16"
        />
        <use
          transform="rotate(270)"
          xlink:href="#a"
          :stroke="stroke"
          opacity="0.25"
        />
        <use
          transform="rotate(300)"
          xlink:href="#a"
          :stroke="stroke"
          opacity="0.33"
        />
        <use
          transform="rotate(330)"
          xlink:href="#a"
          :stroke="stroke"
          opacity="0.41"
        />
        <use
          transform="rotate(0)"
          xlink:href="#a"
          :stroke="stroke"
          opacity="0.50"
        />
        <use
          transform="rotate(30)"
          xlink:href="#a"
          :stroke="stroke"
          opacity="0.58"
        />
        <use
          transform="rotate(60)"
          xlink:href="#a"
          :stroke="stroke"
          opacity="0.67"
        />
        <use
          transform="rotate(90)"
          xlink:href="#a"
          :stroke="stroke"
          opacity="0.75"
        />
        <use
          transform="rotate(120)"
          xlink:href="#a"
          :stroke="stroke"
          opacity="0.83"
        />
        <use
          transform="rotate(150)"
          xlink:href="#a"
          :stroke="stroke"
          opacity="0.92"
        />
        <use
          transform="rotate(180)"
          xlink:href="#a"
          :stroke="stroke"
          opacity="1.0"
        />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "LoadingIcon",
  props: {
    stroke: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "#ffff00",
    },
  },
};
</script>
