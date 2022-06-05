<template>
  <div id="app">
    <Header>
      <MainHeader
        :phone="this.user.phone"
        :logged="this.user.logged"
        @sendlogin="sendlogin"
      />
    </Header>
    <Content :header="true" :footer="false" :scroll="true" :scrollbar="true">
      <div
        class="w-screen flex flex-col items-center animate__animated animate__fadeInDown"
      >
        <!-- User -->
        <div
          v-if="this.user.id != 0"
          class="w-full py-3 font-bold text-lg mt-2 px-16 text-center"
        >
          <p>ID: {{ this.user.id }}</p>
          <p>Баллы: {{ this.user.balance }}</p>
        </div>

        <div
          v-else
          class="w-full py-3 font-bold text-lg mt-2 px-16 text-center"
        >
          <p>Для просмотра данных аккаунта, необходимо войти в него.</p>
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
          >
            <div class="cursor-pointer">
              <!-- Id, Name, Price, Img -->
              <img :src="product.img_link" alt="img" class="h-44 w-full" />
              <div class="flex justify-between px-5 text-sm">
                <p class="font-medium">
                  {{ product.name }}
                </p>
                <p class="font-medium">{{ product.price }} ₽</p>
              </div>
            </div>
            <Button
              class="w-full my-5 flex gap-5 items-center justify-center"
              @click="showQr(product.id)"
            >
              Купить за баллы
              <i class="pi pi-wallet" />
            </Button>
          </div>
        </div>
      </div>
    </Content>
    <Footer v-if="user.userType == 'cashier'">
      <div class="flex justify-between">
        <Button
          class="flex gap-5 items-center justify-center"
          @click="readQr('cashOut')"
        >
          <p>Снятие баллов</p>
          <i class="pi pi-qrcode" />
        </Button>
        <Button
          class="flex gap-5 items-center justify-center"
          @click="readQr('cashIn')"
        >
          <p>Начисление баллов</p>
          <i class="pi pi-qrcode" />
        </Button>
      </div>
    </Footer>

    <Toast position="bottom-center" />

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
          <Password v-model="user.password" :feedback="false" />
        </div>

        <Button
          class="w-full flex gap-5 items-center justify-center"
          @click="login"
        >
          <i
            :class="this.load.login ? 'pi pi-spin pi-spinner' : 'pi pi-user'"
          />
          Войти
        </Button>
        <Button
          class="w-full flex gap-5 items-center justify-center"
          @click="reg"
        >
          <i
            :class="this.load.reg ? 'pi pi-spin pi-spinner' : 'pi pi-user-plus'"
          />
          Зарегистрироваться
        </Button>
      </div>

      <div v-if="dialog.state == 2" class="">
        <p>Вы действительно хотите выйти?</p>
        <div class="w-full flex my-4 px-10 justify-between">
          <Button class="p-button-success" @click="logout"> Да</Button>
          <Button class="p-button-danger" @click="dialog.show = false"
            >Нет</Button
          >
        </div>
      </div>

      <div v-if="dialog.state == 3">
        <QrcodeVue :value="qrcode.value" :size="qrcode.size" />
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import Header from "./components/Header";
import MainHeader from "./components/MainHeader";
import Button from "primevue/button";
import Footer from "./components/Footer";
import Content from "./components/Content.vue";

import QrcodeVue from "qrcode.vue";
import Dialog from "primevue/dialog";
import Password from "primevue/password";
import InputMask from "primevue/inputmask";
import Toast from "primevue/toast";
import products from "./assets/products.json";
import firebase from "./firebase";
import base64 from "base-64";
import moby from "@mobyapps/moby.js";

export default {
  name: "App",
  components: {
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
      products: products,
      user: {
        id: 0,
        balance: 0,
        phone: "",
        password: "",
        userType: null,
        logged: false,
      },
      qrcode: {
        size: 300,
        value: "",
        barcode: "",
        decoded: "",
      },
      dialog: {
        show: false,
        state: 1,
      },
      load: {
        login: false,
        reg: false,
      },
    };
  },
  methods: {
    async login() {
      console.log("login");
      this.load.login = true;
      if (this.user.phone != "" && this.user.password != "") {
        let doc = await firebase.logUser(this.user.phone, this.user.password);
        if (doc == "incorrect user or login") {
          this.user.phone == "";
          this.user.password == "";
          this.$toast.add({
            severity: "error",
            summary: "Неверный логин или пароль",
            life: 3000,
          });
          console.log(doc);
        } else {
          this.user.id = doc.id;
          this.user.balance = doc.bal;
          this.user.userType = doc.userType;
          this.user.logged = true;
          this.dialog.show = false;
        }
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Введите номер телефона и пароль",
          life: 3000,
        });
      }
      this.load.login = false;
    },
    async reg() {
      console.log("reg");
      this.load.reg = true;
      if (this.user.phone != "" && this.user.password != "") {
        let doc = await firebase.regUser(this.user.phone, this.user.password);
        if (
          doc == "Этот пользователь уже зарегистрирован. " ||
          doc == "Ошибка сервера. Попробуйте попытку позже"
        ) {
          this.user.phone == "";
          this.user.password == "";
          this.$toast.add({
            severity: "error",
            summary: doc,
            life: 3000,
          });
          console.log(doc);
        } else {
          console.log(`registered as ${doc}`);
          this.user.id = doc;
          this.user.balance = 0;
          this.user.userType = "user";
          this.user.logged = true;
          this.dialog.show = false;
        }
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Введите логин и пароль",
          life: 3000,
        });
      }
      this.load.reg = false;
    },
    async logout() {
      this.user.id = 0;
      this.user.balance = 0;
      this.user.phone = "";
      this.user.password = "";
      this.user.userType = null;
      this.user.logged = false;
      this.$toast.add({
        severity: "success",
        summary: "Вы вышли из аккаунта",
        life: 3000,
      });
      this.dialog.show = false;
    },
    async readQr(state) {
      const barcode = await moby.barcode.scan([moby.barcode.symbology.qr]);
      if (base64.decode(barcode).split("?")[0] == "loyality") {
        this.qrcode.decoded = base64.decode(barcode);
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Некорректный QR. Попробуйте ещё раз.",
          life: 3000,
        });
        return null;
      }
      if (state == "cashIn") {
        console.log(
          base64.decode(barcode).split("?")[1].split("&")[0].split(":")[1]
        );
        try {
          firebase.cashIn(
            base64.decode(barcode).split("?")[1].split("&")[0].split(":")[1],
            10000
          );
          this.$toast.add({
            severity: "success",
            summary: `Успешно`,
            life: 3000,
          });
        } catch (e) {
          this.$toast.add({
            severity: "error",
            summary: `Ошибка сервера `,
            life: 3000,
          });
        }
      } else if (state == "cashOut") {
        const product_id = base64
          .decode(barcode)
          .split("?")[1]
          .split("&")[1]
          .split(":")[1];
        for (let i = 0; i < products.length; i++) {
          if (products[i]["id"] == product_id) {
            const price = products[i]["price"];
            console.log(price);
          }
        }
      }
    },
    showQr(product_id) {
      // loyality?user_id:{USER_ID}}&product_id:42&time:{UNIX}&balance:{USER_BALANCE}
      if (this.user.logged) {
        const date = new Date();
        let encode = `loyality?user_id:${
          this.user.id
        }&product_id:${product_id}&time:${date.getTime()}&balance:${
          this.user.balance
        }`;
        this.qrcode.value = base64.encode(encode);
        this.dialog.state = 3;
        this.dialog.show = true;
      } else {
        this.dialog.state = 1;
        this.dialog.show = true;
      }
    },
    sendlogin(state) {
      if (state == false) {
        this.dialog.show = true;
        this.dialog.state = 2;
      } else if (state == true) {
        this.dialog.show = true;
        this.dialog.state = 1;
      }
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
  },
};
</script>
