<template>
  <div id="app">
    <Header>
      <CloseButton />
    </Header>
    <Content :header="true" :footer="false" :scroll="true" :scrollbar="true">
      <div
        class="w-screen flex flex-col justify-center items-center animate__animated animate__fadeInDown"
      >
        <div class="w-full py-3 font-bold mt-5 text-right px-16">
          <p>ID: {{ this.userID }}</p>
          <p>Баллы: {{ this.balance }}</p>
        </div>

        <Button class="w-56" @setBarcode="setBarcode">
          <template slot="text">Сканировать QR-код</template>
          <!-- <template slot="icon">icon html</template> -->
        </Button>
      </div>

      <div></div>

      <div v-if="barcode" class="mx-2 mt-6 text-center">
        <b>Result:</b>
        <br />
        {{ this.barcode.result }}
      </div>

      <!-- <Shimmer /> -->
      <!--<SurveyCard-->
      <!--url="http://"-->
      <!--imgUrl=""-->
      <!--name="SurveyCard"-->
      <!--description="SurveyCard"-->
      <!--/> -->
    </Content>
    <!--<Footer>content footer</Footer>-->
    <!--<Modal :isVisible="modal.show" @onClose="modal.show = false" />-->
    <!--<Spinner v-if="spinner" />-->
  </div>
</template>

<script lang="ts">
import Header from "./components/Header";
import CloseButton from "./components/CloseButton";
import Content from "./components/Content";
import Button from "./components/Button";
// import SurveyCard from "./components/SurveyCard";
// import Shimmer from "./components/Shimmer";
// import Spinner from "./components/Spinner";
// import Modal from "./components/Modal";
// import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    // SurveyCard,
    // Shimmer,
    // Spinner,
    // Modal,
    // Footer,
    Content,
    Header,
    CloseButton,
    Button,
  },
  data() {
    return {
      barcode: "",
      id: "",
      balance: 0,
      // modal: {
      //   show: false,
      // },
      spinner: true,
    };
  },
  methods: {
    setBarcode(barcode) {
      // loyality?user_id:3&product_id:42
      this.barcode = barcode;
    },
  },
};
</script>
