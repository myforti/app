<template>
    <div v-if="consultation" class="popup active">
        <div class="popup-overlay">
            <div class="popup-wrapper">
                <div @click="close" class="popup-close"></div>
                <div class="popup-content">
                    <div class="success-image">
                        <img src="/success.svg" alt="success">
                    </div>
                    <h3>Ваша заявка принята</h3>
                    <p>Наши менеджеры свяжутся с вами в ближайшее время.</p>
                    <div class="group-btn">
                        <a @click.prevent="close" href="#" class="btn btn-primary">Закрыть</a>
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
                consultation: state => state.ui.popup.consultation
            })
        },
        methods:{
            ...mapMutations(['ui/TYPEPOPUPS']),
            close() {
                this['ui/TYPEPOPUPS']({
                    state: 'consultation',
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
