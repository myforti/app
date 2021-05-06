<template>
    <div>
        <h3>Новый пароль</h3>
        <form v-if="!success" @submit.prevent="submitHandler" class="form">
            <div v-if="errorForm !== false" class="error">{{errorForm}}</div>
            <InputForm
                    :value.sync="form.password"
                    type="text"
                    placeholder="Пароль"
                    :error="error.password ? {text: error.password, className: 'error'} : {}"
            />
            <InputForm
                    :value.sync="form.replyPassword"
                    type="text"
                    placeholder="Подтвердите пароль"
                    :error="error.replyPassword ? {text: error.replyPassword, className: 'error'} : {}"
            />
            <div class="form__bottom">
                <input class="btn btn-primary" type="submit" value="Сбросить">
            </div>
        </form>
        <div v-else>
            <p>Ваш пароль был успешно изменен. <br>Теперь вы можете <a href="/?auth=login">авторизоваться</a>.</p>
        </div>
    </div>
</template>

<script>
    import InputForm from "~/components/Form/inputForm";
    export default {
        name: "FormResetPassword",
        components: {
            InputForm
        },
        data: () => ({
            form: {
                password: '',
                replyPassword: ''
            },
            error: {
                password: '',
                replyPassword: ''
            },
            errorForm: false,
            success: false
        }),
        computed:{
            dataFormPassword() {
                return this.form.password
            },
            dataFormReplyPassword() {
                return this.form.replyPassword
            }
        },
        methods:{
            validate() {
                Object.values(this.form).forEach((item, index) => {
                    if (item.length === 0) {
                        this.error[Object.keys(this.form)[index]] = 'Пустое поле'
                    } else {
                        this.error[Object.keys(this.form)[index]] = ''
                    }
                })
            },
            async submitHandler() {
                this.validate()

                if (
                    !this.error.password.length &&
                    !this.error.replyPassword.length
                ) {
                    const request = await this.$axios.post('/auth/reset-password', JSON.stringify({
                        code: this.$route.query.code,
                        password: this.form.password,
                        passwordConfirmation: this.form.replyPassword,
                    }))

                    if (request.status === 400) {
                        this.errorForm = 'Не коректнный код или код устарел.'
                    } else {
                        this.errorForm = false,
                            this.success = true
                    }
                }
            },
        },
        watch: {
            dataFormPassword(newValue) {
                (newValue.length === 0) ? this.error.password = 'Пустое поле' : this.error.password = '';
                (newValue.length < 6) ? this.error.password = 'Пароль не должен содержать меньше 6 символов' : this.error.password = '';
                this.errorForm = false
            },
            dataFormReplyPassword(newValue) {
                (newValue.length === 0) ?
                    this.error.replyPassword = 'Пустое поле' :
                    (this.form.password !== this.form.replyPassword) ? this.error.replyPassword = 'пароли не совпадают' : this.error.replyPassword = ''
                this.error.password = ''
                this.errorForm = false
            },
        }
    }
</script>

<style lang="scss">
    .error{
        text-align: center;
        font-size: 14px;
        color: #ff4242;
        margin-bottom: 10px;
    }
</style>