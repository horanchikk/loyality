import "./assets/styles/global.css";
import Vue from "vue";
import App from "./App.vue";
import BackToTop from "vue-backtotop";

import "animate.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/saga-orange/theme.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

App.use(BackToTop);
