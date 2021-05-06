<template>
  <div v-if="addAddresses" class="popup active">
    <div class="popup-overlay">
      <div class="popup-wrapper">
        <div @click="close" class="popup-close"></div>
        <div class="popup-content">
          <FormAddAddresses />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex"
  import FormAddAddresses from "~/components/Form/FormAddAddresses";

  export default {
    name: "AddAddressesPopup",
    components: {
      FormAddAddresses
    },
    computed:{
      ...mapState({
        addAddresses: state => state.ui.popup.addAddresses
      })
    },
    methods:{
      ...mapMutations(['ui/TYPEPOPUPS']),
      close() {
        this['ui/TYPEPOPUPS']({
          state: 'addAddresses',
          value: false
        })
      }
    }
  }
</script>
