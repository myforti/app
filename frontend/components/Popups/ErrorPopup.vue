<template>
  <div v-if="errors.value" class="popup active" id="remove">
    <div class="popup-overlay">
      <div class="popup-wrapper">
        <div @click="close" class="popup-close"></div>
        <div class="popup-content">
          <h3>{{errors.title ? errors.title : 'Ошибка'}}</h3>
          <p>Сообщение: <b v-html="errors.text"></b></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex"

  export default {
    name: "errorPopup",
    computed:{
      ...mapState({
        errors: state => state.ui.popup.error
      })
    },
    methods:{
      ...mapMutations(['ui/TYPEPOPUPS']),
      close() {
        this['ui/TYPEPOPUPS']({
          state: 'error',
          value: false
        })
      }
    }
  }
</script>
