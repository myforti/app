<template>
    <form @submit.prevent="submitHandler" @change="changeHandler" class="consultaion__block-form">
        <div class="fieldset">
            <label>Имя*</label>
            <inputForm
                    :value.sync="form.name"
                    type="text"
                    placeholder="_____________________"
                    :error="error.name ? {text: error.name, className: 'error'} : {}"
            />
        </div>
        <div class="fieldset">
            <label>Номер телефона*</label>
            <inputForm
                    :value.sync="form.phone"
                    type="tel"
                    placeholder="+7 ___-___-__-__"
                    :error="error.phone ? {text: error.phone, className: 'error'} : {}"
            />
        </div>
        <div class="checked__block">
            {{error.check}}
            <label>
                <input type="checkbox" v-model="form.check" value="true" :checked="form.check">
                <span class="cust-checkbox"></span>
                <span class="text">Я согласен на обработку персональных данных
                                            в соответствии с <a target="_blank" href="/privacy-policy">политикой конфиденциальности</a></span>
            </label>
        </div>
        <div class="form-bottom">
            <input type="submit" value="Отправить" class="btn btn-outline btn-outline--accent">
        </div>
    </form>
</template>

<script>
    import { mapState } from "vuex"
    import InputForm from "~/components/Form/inputForm";

    export default {
        name: "FormConsultation",
        components: {
            InputForm
        },
        computed: {
          ...mapState({
              settings: state => state.settings
          }),
          nameWatch() {
              return this.form.name
          },
          phoneWatch() {
              return this.form.phone
          }
        },
        data: () => ({
            form: {
                phone: '',
                name: '',
                check: true
            },
            error: {
                phone: '',
                name: '',
                check: ''
            }
        }),
        methods: {
            validate() {
                Object.values(this.form).forEach((item, index) => {
                    if (item.length === 0) {
                        this.error[Object.keys(this.form)[index]] = 'Пустое поле'
                    } else {
                        this.error[Object.keys(this.form)[index]] = ''
                    }
                })
            },
            changeHandler(){
                //this.validate()
                if (this.form.check === false) {
                    this.error.check = 'Обязательное поле'
                } else {
                    this.error.check = ''
                }
            },
            async submitHandler() {
                this.validate()
                if (this.form.check === false) {
                    this.error.check = 'Обязательное поле'
                } else {
                    this.error.check = ''
                }

                if (this.form.phone.length !== 18) {
                  this.error.phone = 'Невалидный телефон'
                  return false
                } else {
                  this.error.phone = ''
                }

                if (this.error.check === '') {
                    if (!this.error.name.length && !this.error.phone.length) {
                        const { status, data } = await this.$axios.post('/consultatios', {
                            name: this.form.name,
                            phone: this.form.phone
                        })

                        if (Number(status) === 200) {
                            if (Object.values(data).length) {
                                this.$store.commit('ui/TYPEPOPUPS', {
                                    state: 'consultation',
                                    value: true
                                });
                                this.$store.commit('ui/TYPEPOPUPS', {
                                    state: 'feedback',
                                    value: false
                                })

                                const requestEmail = await this.$axios.post('/email/', JSON.stringify({
                                    to: this.settings.email_send,
                                    from: 'fortistock@yandex.ru',
                                    subject: 'Консультанция',
                                    html: `<b>${this.form.name}</b> просит консультацию. <br> телефон: ${this.form.phone}`,
                                }))
                                this.$yandexMetrika.reachGoal('7489706210')

                                if (Number(requestEmail.status) !== 200) {
                                    this.$store.commit('ui/TYPEPOPUPS', {
                                        state: 'error',
                                        title: 'Ошибка',
                                        text: 'Не смог отправить email.',
                                        value: true
                                    })
                                }

                            }
                        } else {
                            this.$store.commit('ui/TYPEPOPUPS', {
                                state: 'error',
                                title: 'Ошибка',
                                text: 'Не могу обработать Ваш запрос.',
                                value: true
                            })
                        }

                    }
                }
            },
        },
        watch: {
            nameWatch(newValue) {
                if (newValue.length) {
                    this.error.name = ''
                }
            },
            phoneWatch(old, newValue) {
                if (newValue.length) {
                    this.error.phone = ''
                }
            }
        }
    }
</script>

<style lang="scss">
    .consultaion__block-form{
        .fieldset.error{
            .message{
                color: #ffffff;
            }
        }
    }
</style>