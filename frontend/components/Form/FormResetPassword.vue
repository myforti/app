<template>
    <div>
        <h3>Сбросить пароль</h3>
        <form v-if="!success" @submit.prevent="submitHandler" class="form">
            <div v-if="errorForm !== false" class="error">{{errorForm}}</div>
            <InputForm
                    :value.sync="form.email"
                    type="text"
                    placeholder="Адрес электронной почты"
                    :error="error.email ? {text: error.email, className: 'error'} : {}"
            />
            <div class="form__bottom">
                <input class="btn btn-primary" type="submit" value="Сбросить">
            </div>
        </form>
        <div v-else>
            <p>На ваш электронный адрес <b>{{form.email}}</b> было отправлено письмо с инструкцией.</p>
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
                email: ''
            },
            error: {
                email: ''
            },
            errorForm: false,
            success: false
        }),
        computed:{
            dataFormEmail() {
                return this.form.email
            },
            dataFormPassword() {
                return this.form.password
            }
        },
        methods:{
            validEmail(email) {
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                !re.test(String(email).toLowerCase()) ? this.error.email = 'Не валидное поле' : this.error.email = '';
            },
            validate() {
                this.validEmail(this.form.email)
            },
            async submitHandler() {
                this.validate()
                if (this.error.email.length === 0) {
                    const request = await this.$axios.post('/auth/forgot-password', {
                        email: this.form.email
                    })
                    console.log(request)
                    if (request.status === 200) {
                        console.log(request.data)
                        this.success = true
                    } else if (request.status === 400) {
                        this.errorForm = 'Пользователя с таким email не существует.'
                    }
                }
            },
        },
        watch: {
            dataFormEmail(newValue) {
                this.error.email = ''
                this.errorForm = ''
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