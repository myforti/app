<template>
  <div v-if="order" class="popup active">
    <div class="popup-overlay">
      <div class="popup-wrapper">
        <div @click="close" class="popup-close"></div>
        <div class="popup-content">
          <div class="success-image">
            <img src="/success.svg" alt="success">
          </div>
          <h3>Заказ оформлен</h3>
          <p>Спасибо за выбор компании Myforti. <br>Наши менеджеры свяжутся с вами в ближайшее время.</p>
          <div class="group-btn">
            <a @click.prevent="$router.push('/user/my-orders'), close()" href="#" class="btn btn-outline--primary">В мои заказы</a>
            <a @click.prevent="$router.push('/'), close()" href="#" class="btn btn-primary">На главную</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex"

  export default {
    name: "SuccessOrderPopup",
    computed: {
      ...mapState({
          order: state => state.ui.popup.successOrder
      })
    },
    methods:{
      ...mapMutations(['ui/TYPEPOPUPS']),
      close() {
        this['ui/TYPEPOPUPS']({
          state: 'successOrder',
          value: false
        })
      }
    }
  }
</script>

<style lang="scss">
  .success-image{
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    img{
      max-width: 98px;
      width: 100%;
      display: block;
    }
    & ~ h3{
      margin-bottom: 13px;
    }
    & ~ p{
      margin-bottom: 45px;
      font-size: 15px;
      color: #727083;
      text-align: center;
      margin-top: 0;
    }
  }
</style>
