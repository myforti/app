<template>
  <div v-if="confirm" class="popup active" id="remove">
    <div class="popup-overlay">
      <div class="popup-wrapper">
        <div @click="close" class="popup-close"></div>
        <div class="popup-content">
          <h3>Подтвердите действие.</h3>
          <div class="group-btn">
            <a @click.prevent="close" href="#" class="btn btn-outline btn-outline--primary">Отмена</a>
            <a @click.prevent="confirmAdd" href="#" class="btn btn-primary">Подтвердить</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex"

  export default {
    name: "confirmPopup",
    props: {
      actions: {
        type: String,
        required: true
      }
    },
    computed:{
      ...mapState({
        confirm: state => state.ui.popup.confirm,
        user: state => state.user
      })
    },
    methods:{
      ...mapMutations(['ui/TYPEPOPUPS']),
      close() {
        this['ui/TYPEPOPUPS']({
          state: 'confirm',
          value: false
        })
      },
      async confirmAdd() {
        await this.$store.dispatch(this.actions, this.user.id)
      }
    }
  }
</script>
