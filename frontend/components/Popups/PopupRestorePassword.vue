<template>
    <div v-if="isOpen" class="popup active">
        <div class="popup-overlay">
            <div class="popup-wrapper">
                <div @click="close" class="popup-close"></div>
                <div class="popup-content">
                    <FormRestorePassword />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FormRestorePassword from "~/components/Form/FormRestorePassword"

    export default {
        name: "PopupForgotPassword",
        components: {
            FormRestorePassword
        },
        computed: {
            isOpen(){
                if (this.$route.query.code) {
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