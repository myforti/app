<template>
    <div v-if="organization_id !== false" class="popup active">
        <div class="popup-overlay">
            <div class="popup-wrapper">
                <div @click="$store.commit('ui/EDITORGANIZATION', false)" class="popup-close"></div>
                <div class="popup-content">
                    <FromUpdateOrganization :id="organization_id" />
                    <div class="group-btn">
                        <a @click.prevent="$store.commit('ui/EDITORGANIZATION', false)" class="btn btn-primary" href="#">Закрыть</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from "vuex"
    import FromUpdateOrganization from "~/components/Form/FormUpdateOrganization"

    export default {
        name: "AddAddressesPopup",
        components: {
            FromUpdateOrganization
        },
        computed:{
            ...mapState({
                //addAddresses: state => state.ui.popup.addAddresses
                organization_id: state => state.ui.editPopopOrganization
            })
        },
        methods:{
        }
    }
</script>
