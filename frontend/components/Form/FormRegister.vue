<template>
  <form @submit.prevent="submitHandler" >
    <div v-if="formError" class="error">
      <template v-if="formError === 'Auth.form.error.email.taken'">
        Пользователь с таким email уже существует. <br>Если забыли пароль воспользуйтесь <nuxt-link @click.native="closeAuth" to="?forgot=true">восстановлением пароля</nuxt-link>
      </template>
      <template v-else>
        проверьте правильность ввода данных или воспользуйтесь <nuxt-link @click.native="closeAuth" to="?forgot=true">восстановлением пароля</nuxt-link>
      </template>
    </div>
    <InputForm
      :value.sync="form.name"
      type="text"
      placeholder="Имя"
      :error="error.name ? {text: error.name, className: 'error'} : {}"
    />
    <InputForm
      :value.sync="form.email"
      type="text"
      placeholder="Адрес электронной почты"
      :error="error.email ? {text: error.email, className: 'error'} : {}"
    />
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
      <div class="policy">
        <div :class="error.check.length ? 'error' : false" class="checked__block">
          <div v-if="error.check.length">
            {{error.check}}
          </div>
          <label>
            <input v-model="form.check" type="checkbox" :checked="form.check">
            <div class="cust-checkbox"></div>
            <div class="text">Я соглашаюсь на обработку <a target="_blank" href="/privacy-policy">персональных
              данных</a></div>
          </label>
        </div>
      </div>
      <input class="btn btn-primary" type="submit" value="Зарегистрироваться">
      <p>
      </p>
    </div>
  </form>
</template>

<script>
  import { mapState, mapActions } from "vuex"
  import InputForm from "~/components/Form/inputForm";
  export default {
    name: "FormRegister",
    components: {
      InputForm
    },
    data: () => ({
      form: {
        name: '',
        email: '',
        password: '',
        replyPassword: '',
        check: true
      },
      error: {
        name: '',
        email: '',
        password: '',
        replyPassword: '',
        check: ''
      },
      formError: false
    }),
    computed:{
      ...mapState({
        settings: state => state.settings
      }),
      dataFormName() {
        return this.form.name
      },
      dataFormEmail() {
        return this.form.email
      },
      dataFormPassword() {
        return this.form.password
      },
      dataFormReplyPassword() {
        return this.form.replyPassword
      }
    },
    methods:{
      ...mapActions(['fetchRegisterUser']),
      closeAuth(){
        this.$store.commit('ui/TYPEPOPUPS', {
          state: 'auth',
          value: false
        })
      },
      validEmail(email) {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        !re.test(String(email).toLowerCase()) ? this.error.email = 'Не валидное поле' : this.error.email = '';
      },
      validate() {
        Object.values(this.form).forEach((item, index) => {
          if (item.length === 0) {
            this.error[Object.keys(this.form)[index]] = 'Пустое поле'
          } else {
            this.error[Object.keys(this.form)[index]] = ''
          }
        })
        this.validEmail(this.form.email)
      },
      changeHandler(){
        this.validate()
      },
      async submitHandler() {
        this.validate()

        if (this.form.check === false) {
          this.error.check = "Подтвердите!"
          return false
        }

        if (
          !this.error.email.length &&
          !this.error.name.length &&
          !this.error.password.length &&
          !this.error.replyPassword.length
        ) {
          const result = await this.fetchRegisterUser(this.form)

          if (result) {
            this.formError = result.data[0].messages[0].id
          } else {
            const requestEmail = await this.$axios.post('/email/', JSON.stringify({
              to: this.form.email,
              from: 'fortistock@yandex.ru',
              subject: 'Регистрация',
              html: `
                <h1>Регистрация на сайте</h1>
                <p>вы зарегистрированы на сайте myforti.ru</p>
              `,
            }))
            console.log(requestEmail)
            this.formError = false
          }
        }
      },
    },
    watch: {
      dataFormEmail(newValue) {
        this.validEmail(newValue)
      },
      dataFormPassword(newValue) {
        (newValue.length === 0) ? this.error.password = 'Пустое поле' : this.error.password = '';
        (newValue.length < 6) ? this.error.password = 'Пароль не должен содержать меньше 6 символов' : this.error.password = ''
      },
      dataFormReplyPassword(newValue) {
        (newValue.length === 0) ?
          this.error.replyPassword = 'Пустое поле' :
          (this.form.password !== this.form.replyPassword) ? this.error.replyPassword = 'пароли не совпадают' : this.error.replyPassword = ''
          this.error.password = ''
      },
      dataFormName(newValue) {
        (newValue.length === 0) ? this.error.name = 'Пустое поле' : this.error.name = ''
      }
    }
  }
</script>
