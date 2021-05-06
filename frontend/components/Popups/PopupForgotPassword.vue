<template>
    <div v-if="isOpen" class="popup active">
        <div class="popup-overlay">
            <div class="popup-wrapper">
                <div @click="close" class="popup-close"></div>
                <div class="popup-content">
                    <FormForgotPassword />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FormForgotPassword from "~/components/Form/FormResetPassword"

    export default {
        name: "PopupForgotPassword",
        components: {
            FormForgotPassword
        },
        computed: {
          isOpen(){
              if (this.$route.query.forgot) {
                  return true
              } else {
                  return false
              }
          }
        },
        methods: {
            close() {
                this.$router.push('/')
            }
        }
    }
</script>