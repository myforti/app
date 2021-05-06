<template>
  <client-only>
    <form @submit.prevent="submitHandler" >
      <div>
        <div v-if="formError" class="error">
          проверьте правильность ввода данных или воспользуйтесь <nuxt-link @click.native="closeAuth" to="?forgot=true">восстановлением пароля</nuxt-link>
        </div>
        <inputForm
          :value.sync="form.email"
          type="text"
          placeholder="Адрес электронной почты"
          :error="error.email ? {text: error.email, className: 'error'} : {}"
        />
        <inputForm
          :value.sync="form.password"
          type="text"
          placeholder="Пароль"
          :error="error.password ? {text: error.password, className: 'error'} : {}"
        />
      </div>
      <div class="form__bottom">
        <br />
        <input class="btn btn-primary" type="submit" value="Войти">
        <p>
          <nuxt-link to="?forgot=true">Забыли пароль?</nuxt-link>
        </p>
      </div>
    </form>
  </client-only>
</template>

<script>
  import { mapActions } from "vuex"
  import InputForm from "~/components/Form/inputForm";
  export default {
    name: "FormLogin",
    components: {
      InputForm
    },
    data: () => ({
      form: {
        email: '',
        password: ''
      },
      error:{
        email:'',
        password: ''
      },
      formError: false
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
      ...mapActions(['fetchUser']),
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
        if (!this.error.email.length && !this.error.password.length) {
          const results = await this.fetchUser(this.form)
          if (results) {
            this.$router.push('/?auth=success')
            this.formError = false
            location = this.$route.path
          } else {
            this.formError = true
          }
        }
      },
    },
    watch: {
      dataFormEmail(newValue) {
        //this.validEmail(newValue)
        this.error.email = ''
      },
      dataFormPassword(newValue) {
        //(newValue.length === 0) ? this.error.password = 'Пустое поле' : this.error.password = ''
        this.error.password = ''
      }
    }
  }
</script>
