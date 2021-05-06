<template>
  <div v-if="addOrganization" class="popup active">
    <div class="popup-overlay">
      <div class="popup-wrapper">
        <div @click="close" class="popup-close"></div>
        <div class="popup-content">
          <FormAddOrganization />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex"
  import FormAddOrganization from "~/components/Form/FormAddOrganization"

  export default {
    name: "AddOrganizationPopup",
    components: {
      FormAddOrganization
    },
    computed:{
      ...mapState({
        addOrganization: state => state.ui.popup.addOrganization
      })
    },
    methods:{
      ...mapMutations(['ui/TYPEPOPUPS']),
      close() {
        this['ui/TYPEPOPUPS']({
          state: 'addOrganization',
          value: false
        })
      }
    }
  }
</script>
