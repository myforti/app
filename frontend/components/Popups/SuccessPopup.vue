<template>
    <div v-if="success.value" class="popup active">
        <div class="popup-overlay">
            <div class="popup-wrapper">
                <div @click="close" class="popup-close"></div>
                <div class="popup-content">
                    <div class="success-image">
                        <img src="/success.svg" alt="success">
                    </div>
                    <h3>{{success.title}}</h3>
                    <p>{{success.text}}</p>
                    <div class="group-btn">
                        <a @click.prevent="close()" href="#" class="btn btn-primary">Закрыть</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from "vuex"

    export default {
        name: "Success",
        computed: {
            ...mapState({
                success: state => state.ui.popup.success
            })
        },
        methods:{
            ...mapMutations(['ui/TYPEPOPUPS']),
            close() {
                this['ui/TYPEPOPUPS']({
                    state: 'success',
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
