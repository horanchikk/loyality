import "./assets/styles/global.css";
import Vue from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "animate.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

App.use(PrimeVue);
