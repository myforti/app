<template>
    <div v-if="editAddresse !== false" class="popup active">
        <div class="popup-overlay">
            <div class="popup-wrapper">
                <div @click="close" class="popup-close"></div>
                <div class="popup-content">
                    <FormEditAddresses :id="editAddresse" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from "vuex"
    import FormEditAddresses from "~/components/Form/FormEditAddresse";

    export default {
        name: "EditAddressesPopup",
        components: {
            FormEditAddresses
        },
        computed:{
            ...mapState({
                editAddresse: state => state.ui.popup.editAddresse
            })
        },
        methods:{
            ...mapMutations(['ui/TYPEPOPUPS']),
            close() {
                this['ui/TYPEPOPUPS']({
                    state: 'editAddresse',
                    value: false
                })
            }
        }
    }
</script>
