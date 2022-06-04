import "./assets/styles/global.css";
import Vue from "vue";
import App from "./App.vue";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

import "animate.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/saga-orange/theme.css";

Vue.config.productionTip = false;

Vue.use(PrimeVue);
Vue.use(ToastService);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
