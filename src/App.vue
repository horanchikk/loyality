<template>
  <div id="app">
    <Header>
      <MainHeader :phone="user.phone" @login="sendlogin" />
    </Header>
    <Content :header="true" :footer="false" :scroll="true" :scrollbar="true">
      <div
        class="w-screen flex flex-col items-center animate__animated animate__fadeInDown"
      >
        <!-- User -->
        <div class="w-full py-3 font-bold text-lg mt-5 px-16 text-center">
          <p>ID: {{ this.user.id }}</p>
          <p>Баллы: {{ this.user.balance }}</p>
        </div>
        <div class="w-screen border-2" />
        <!-- Orders -->
        <p class="my-2 font-bold text-2xl text-center">
          Товары под системой лояльности "Loyality"
        </p>
        <div>
          <div
            class="transition ease-in-out duration-200 p-4 my-10 shadow-xl rounded-lg hover:shadow-2xl"
            v-for="product in products"
            :key="product.id"
            @click="scrollTop"
          >
            <div class="cursor-pointer">
              <!-- Id, Name, Price, Img -->
              <img :src="product.img_link" alt="img" class="h-44 w-full" />
              <div class="flex justify-between px-5">
                <p class="font-medium text-xl">
                  {{ product.name }}
                </p>
                <p class="font-medium text-xl">{{ product.price }}</p>
              </div>
            </div>
            <Button class="w-full my-5 flex gap-5 items-center justify-center">
              Купить за баллы
              <i class="pi pi-wallet" />
            </Button>
          </div>
        </div>
      </div>

      <div v-if="barcode" class="mx-2 mt-6 text-center">
        <b>Result:</b>
        <br />
        {{ this.barcode.result }}
      </div>
    </Content>
    <Footer v-if="user.userType == 'cashier'">
      <Button
        class="w-full flex gap-5 items-center justify-center"
        action="barcode"
        @click="setBarcode"
      >
        <p>Сканировать QR-код</p>
        <i class="pi pi-qrcode" />
      </Button>
    </Footer>

    <!-- Other Components -->
    <Spinner v-if="spinner" />
    <Toast />
    <Dialog
      :visible.sync="dialog.show"
      :header="setHeader(dialog.state)"
      :closable="true"
      :closeOnEscape="true"
      :modal="true"
    >
      <div
        v-if="dialog.state == 1"
        class="flex flex-col justify-center items-center gap-4"
      >
        <div class="flex flex-col w-48">
          <label for="phone">Номер телефона</label>
          <InputMask
            v-model="user.phone"
            mask="+9 (999) 999-9999"
            slotChar="+0 (000) 000-0000"
          />
        </div>

        <div class="flex flex-col w-48">
          Пароль
          <Password class="w-full" v-model="user.password" :feedback="false" />
        </div>

        <Button
          class="w-full flex gap-5 items-center justify-center"
          @click="login"
        >
          <i class="pi pi-user-plus" />
          Войти
        </Button>
        <Button
          class="w-full flex gap-5 items-center justify-center"
          @click="login"
        >
          <i class="pi pi-user-plus" />
          Зарегистрироваться
        </Button>
      </div>

      <div v-if="dialog.state == 2" class=""></div>

      <div v-if="dialog.state == 3" class="">
        <QrcodeVue :value="qrcode.value" :size="qrcode.size" />
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import Header from "./components/Header";
import MainHeader from "./components/MainHeader";
import Button from "primevue/button";
import Spinner from "./components/Spinner";
import Footer from "./components/Footer";
import Content from "./components/Content.vue";

import QrcodeVue from "qrcode.vue";
import Dialog from "primevue/dialog";
import Password from "primevue/password";
import InputMask from "primevue/inputmask";
import Toast from "primevue/toast";
import products from "./assets/products.json";
import firebase from "./firebase";

export default {
  name: "App",
  components: {
    Spinner,
    Footer,
    Header,
    MainHeader,
    Button,
    Dialog,
    QrcodeVue,
    InputMask,
    Password,
    Content,
    Toast,
  },
  data() {
    return {
      barcode: "",
      spinner: false,
      products: products,
      user: {
        id: 0,
        balance: 0,
        phone: "",
        password: "",
        userType: null,
      },
      qrcode: {
        size: 300,
        value: "",
      },
      dialog: {
        show: false,
        state: 1,
      },
    };
  },
  methods: {
    setBarcode(barcode) {
      // loyality?user_id:3&product_id:42
      this.barcode = barcode;
    },
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
    scrollTop() {
      window.scrollTo(0, 0);
    },
    setHeader(state) {
      if (state == 1) {
        return "Вход в аккаунт";
      } else if (state == 2) {
        return "Выход из аккаунта";
      } else if (state == 3) {
        return "Купон ";
      }
    },
    sendlogin(state) {
      if (state == false) {
        this.dialog.show = true;
        this.state.state = 2;
      } else if (state == true) {
        this.dialog.show = true;
        this.state.state = 1;
      }
    },
    async login() {
      console.log("login");
      if (this.user.phone != "" && this.user.password != "") {
        let doc = await firebase.logUser(this.user.phone, this.user.password);
        if (doc == "incorrect user or login") {
          this.user.phone == "";
          this.user.password == "";
          // toast with error
          this.$toast.add({
            severity: "error",
            summary: "Неверный логин или пароль",
            life: 3000,
          });
          console.log(doc);
        } else {
          this.dialog.show = false;
        }
        // let doc = await firebase.regUser(this.user.phone, this.user.password);
      } else {
        // toast with error
        console.log("xd");
      }
    },
    showQr() {
      this.dialog.state = 3;
      this.dialog.show = true;
    },
  },
};
</script>
