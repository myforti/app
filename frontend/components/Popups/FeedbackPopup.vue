<template>
    <div v-if="active" class="popup active">
        <div class="popup-overlay">
            <div class="popup-wrapper">
                <div @click="close" class="popup-close"></div>
                <div class="popup-content">
                    <h3>Оставить заявку</h3>
                    <FormConsultation />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import FormConsultation from "~/components/Form/FormConsultation"
    export default {
        components: {
            FormConsultation
        },
        computed: {
            ...mapState({
                active: state => state.ui.popup.feedback
            }),
        },
        methods:{
            close() {
                this.$store.commit('ui/TYPEPOPUPS', {
                    state: 'feedback',
                    value: false
                })
            }
        }
    }
</script>

<style lang="scss">
    .popup-content{
        .consultaion__block-form{
            display: block;
            margin-bottom: 0 !important;
            .fieldset{
                width: 100%;
                max-width: 100%;
                margin-bottom: 20px;
                & + .fieldset{
                    margin-left: 0;
                }
                .fieldset{
                    margin-bottom: 0;
                }
                &.error{
                  .message{
                    color: #ff4242;
                  }
                }
                label{
                    color: #403e4f;
                }
                input{
                    border: 2px solid #F5F5F5;
                    text-align: center;
                }
            }
            .checked__block{
                max-width: 100%;
                margin-left: 0;
                padding-top: 0;
                .cust-checkbox{
                    border-color: #403e4f ;
                    &::before{
                        filter: invert(1);
                    }
                }
                .text{
                    color: #403e4f;
                    a{
                        color: #403e4f;
                    }
                }
            }
            .form-bottom{
                margin-left: 0;
                max-width: 100%;
                text-align: center;
                .btn{
                    width: auto;
                }
            }
        }
    }
</style>