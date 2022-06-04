<template>
  <div id="app">
    <Header>
      <CloseButton />
    </Header>
    <Content :header="true" :footer="false" :scroll="true" :scrollbar="true">
      <div
        class="w-screen flex flex-col items-center animate__animated animate__fadeInDown"
      >
        <!-- User -->

        <div class="w-full py-3 font-bold mt-5 px-16">
          <p>ID: {{ this.userID }}</p>
          <p>Баллы: {{ this.balance }}</p>
        </div>
        <!-- Orders -->
        <p>Товары под системой лояльности "Loyality"</p>
        <div class="my-5">
          <div
            class="w-72 h-52 my-24 shadow-md"
            v-for="product in products"
            :key="product"
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
            <Button class="w-full my-3">
              <template slot="text">Купить по карте лояльности</template>
              <template slot="icon"><i class="pi pi-wallet" /></template>
            </Button>
          </div>
        </div>
      </div>

      <div></div>

      <div v-if="barcode" class="mx-2 mt-6 text-center">
        <b>Result:</b>
        <br />
        {{ this.barcode.result }}
      </div>
    </Content>
    <Footer>
      <Button class="w-full" @setBarcode="setBarcode">
        <template slot="text">Сканировать QR-код</template>
        <template slot="icon"><i class="pi pi-qrcode" /></template>
      </Button>
    </Footer>
    <Spinner v-if="spinner" />
  </div>
</template>

<script lang="ts">
import Header from "./components/Header";
import CloseButton from "./components/CloseButton";
import Content from "./components/Content";
import Button from "./components/Button";
import Spinner from "./components/Spinner";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Spinner,
    Footer,
    Content,
    Header,
    CloseButton,
    Button,
  },
  data() {
    return {
      barcode: "",
      user: {
        id: "",
        username: "horanchikk",
      },
      balance: 0,
      modal: {
        show: false,
      },
      spinner: false,
      products: [
        {
          id: 0,
          name: "Кольцо 18K",
          price: "13494 ₽",
          img_link:
            "https://ae01.alicdn.com/kf/H50a5c51a03aa474eb5b9dcad1fe14f09f/With-Certificate-18K-White-Gold-Color-Rings-for-Women-2-0ct-Round-Zirconia-Diamond-Solitaire-Ring.jpg_Q90.jpg_.webp",
        },
        {
          id: 1,
          name: "Lenovo LP5",
          price: "2190 ₽",
          img_link:
            "https://ae01.alicdn.com/kf/S22a0563d7ba84bd7b1dd180c17b874efT/100-Original-Lenovo-LP5-Wireless-Bluetooth-Earbuds-HiFi-Music-Earphone-With-Mic-Headphones-Sports-Waterproof-Headset.jpg_Q90.jpg_.webp",
        },
        {
          id: 2,
          name: "Кольцо 18к",
          price: "13494 ₽",
          img_link:
            "https://ae01.alicdn.com/kf/H50a5c51a03aa474eb5b9dcad1fe14f09f/With-Certificate-18K-White-Gold-Color-Rings-for-Women-2-0ct-Round-Zirconia-Diamond-Solitaire-Ring.jpg_Q90.jpg_.webp",
        },
        {
          id: 3,
          name: "Кольцо 18к",
          price: "13494 ₽",
          img_link:
            "https://ae01.alicdn.com/kf/H50a5c51a03aa474eb5b9dcad1fe14f09f/With-Certificate-18K-White-Gold-Color-Rings-for-Women-2-0ct-Round-Zirconia-Diamond-Solitaire-Ring.jpg_Q90.jpg_.webp",
        },
        {
          id: 4,
          name: "Кольцо 18к",
          price: "13494 ₽",
          img_link:
            "https://ae01.alicdn.com/kf/H50a5c51a03aa474eb5b9dcad1fe14f09f/With-Certificate-18K-White-Gold-Color-Rings-for-Women-2-0ct-Round-Zirconia-Diamond-Solitaire-Ring.jpg_Q90.jpg_.webp",
        },
      ],
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
  },
};
</script>
