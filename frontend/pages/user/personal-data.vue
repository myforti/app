<template>
  <div>
    <Breadcrumbs :chain="chains"/>
    <div v-if="user" class="basket__block">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="preview-block preview-block__transparent">
              <div class="preview-block__title">
                <h3>Личный кабинет</h3>
              </div>
              <div class="row justify-content-center">
                <div class="col-lg-3">
                  <nav class="aside-nav">
                    <LkMenu />
                    <div class="open-nav"></div>
                  </nav>
                </div>
                <div class="col-lg-9">
                  <div class="lk">
                    <div class="lk__title">
                      Личные данные
                    </div>
                    <div class="lk__content">
                      <form @submit.prevent="submitHandler">
                        <table>
                          <tbody>
                            <tr>
                              <td><div class="th">Электронная почта <sup>*</sup></div></td>
                              <td>
<!--                                <div :class="form.email.length ? '' : 'error'"  @click="activeEdit" class="fieldset">-->
<!--                                  <input v-model="form.email" type="text" @blur="blurHandler('email')" :readonly="readForm">-->
<!--                                  <div v-if="errorFrom.email" class="message">{{errorFrom.email}}</div>-->
<!--                                </div>-->
                                <PencilToInput :id="Number(user.id)" :value="'email'" :name="`${form.email}`" :view="`${form.email}`" />
                              </td>
                            </tr>
                            <tr v-if="user.provider === 'local'">
                              <td><div class="th">Текущий пароль <sup>*</sup></div></td>
                              <td>
<!--                                <div :class="form.password.length ? '' : 'error'" @click="activeEdit" class="fieldset">-->
<!--                                  <input v-model="form.password" :type="readForm ? 'password' : 'text'" @blur="blurHandler('password')"  :readonly="readForm">-->
<!--                                  <div v-if="errorFrom.password" class="message">{{errorFrom.password}}</div>-->
<!--                                </div>-->
                                <PencilToInput :id="Number(user.id)" :value="'password'" :name="`${form.password}`" :view="`${form.password}`" />
                              </td>
                            </tr>
                            <tr>
                              <td><div class="th">Имя</div></td>
                              <td>
<!--                                <div :class="form.name.length ? '' : 'error'"  @click="activeEdit" class="fieldset">-->
<!--                                  <input v-model="form.name" type="text" @blur="blurHandler" :readonly="readForm">-->
<!--                                </div>-->
                                <PencilToInput :id="Number(user.id)" :value="'username'" :name="`${form.name}`" :view="`${form.name}`" />
                              </td>
                            </tr>
                            <tr>
                              <td><div class="th">Фамилия</div></td>
                              <td>
<!--                                <div :class="form.surname !== null && form.surname.length ? '' : 'error'"  @click="activeEdit" class="fieldset">-->
<!--                                  <input v-model="form.surname" type="text" @blur="blurHandler" :readonly="readForm">-->
<!--                                </div>-->
                                <PencilToInput :id="Number(user.id)" :value="'surname'" :name="`${form.surname}`" :view="`${form.surname}`" />
                              </td>
                            </tr>
                            <tr>
                              <td><div class="th">Телефон <sup>*</sup></div></td>
                              <td>
<!--                                <div :class="form.phone !== null && form.phone.length ? '' : 'error'"  @click="activeEdit"  class="fieldset">-->
<!--                                  <input v-model="form.phone" type="text" @blur="blurHandler('phone')" v-mask="'+7 (###) ###-##-##'" :readonly="readForm">-->
<!--                                  <div v-if="errorFrom.phone" class="message">{{errorFrom.phone}}</div>-->
<!--                                </div>-->
                                <PencilToInput :id="Number(user.id)" :value="'phone'" :name="`${form.phone}`" :view="`${form.phone}`" />
                              </td>
                            </tr>
                            <tr>
                              <td><div class="th">Город</div></td>
                              <td>
<!--                                <div :class="form.city !== null && form.city.length ? '' : 'error'"  @click="activeEdit" class="fieldset">-->
<!--                                  <input v-model="form.city" type="text" @blur="blurHandler" :readonly="readForm">-->
<!--                                </div>-->
                                <PencilToInput :id="Number(user.id)" :value="'city'" :name="`${form.city}`" :view="`${form.city}`" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </form>
                    </div>

                  </div>
                  <Organization />
                  <DeliveryAddresse />
                  <div class="lk d-none d-lg-block">
                    <div class="lk__title">
                      <a @click.prevent="confirm" class="remove__lk" href="#">Удалить учетную запись</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Confirm :actions="'deleteAccount'" />
  </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex"
  import Breadcrumbs from "~/components/UI/Breadcrumbs";
  import PencilToInput from "~/components/UI/PencilToInput";
  import Organization from "~/components/UI/Organizations"
  import DeliveryAddresse from "~/components/UI/DeliveryAddresse";
  import Confirm from "~/components/Popups/Confirm";
  import LkMenu from "~/components/UI/LkMenu";
  export default {
    name: "personalDataPage",
    middleware: ['auth'],
    components: {
      Breadcrumbs,
      PencilToInput,
      Organization,
      DeliveryAddresse,
      Confirm,
      LkMenu
    },
    data: () => ({
      chains: [
        {
          name: 'Главная',
          url: '/'
        },
        {
          name: 'Личный кабинет',
          url: ''
        }
      ],
      form: {
        email: '',
        password: '',
        name: '',
        surname: '',
        phone: '',
        city: ''
      },
      readForm: true,
      errorFrom: {
        email: false,
        password: false,
        phone: false
      }
    }),
    computed: {
      ...mapState({
        user: state => state.user
      }),
      countPassword() {
        let char = ''
        let char_count = this.$cookies.get('_us').password.length
        for(let i = 0; i < char_count; i++) {
          char += '*'
        }

        return char
      }
    },
    methods: {
      ...mapMutations(['ui/TYPEPOPUPS']),
      confirm() {
        this['ui/TYPEPOPUPS']({
          state: 'confirm',
          value: true
        })
      },
      activeEdit(e) {
        if (e.currentTarget.classList.contains('error')) {
          this.readForm = false
          e.currentTarget.classList.remove('error')
          e.currentTarget.children[0].focus()
        }
      },
      blurHandler(name = false) {
        if (event.target.value.length === 0) {
          event.target.parentNode.classList.add('error')
        }

        if (name === 'phone' && event.target.value.length !== 0) {
          this.errorFrom.phone = false
        }
        if (name === 'password' && event.target.value.length !== 0) {
          this.errorFrom.password = false
        }
        if (name === 'email' && event.target.value.length !== 0) {
          this.errorFrom.email = false
        }
      },
      replaceData(isDefault) {
        if (this.user) {
          if (isDefault) {
            this.form.password = this.$cookies.get('_us') ? this.$cookies.get('_us').password : ''
            this.form.email = this.user.email
            this.form.name = this.user.username
            this.form.surname = this.user.surname
            this.form.phone = this.user.phone
            this.form.city = this.user.city
          } else {
            this.form.password = this.$cookies.get('_us') ? this.$cookies.get('_us').password : ''
            if (this.user.email) {
              this.form.email = this.user.email
            }
            if (this.user.username) {
              this.form.name = this.user.username
            }
            if (this.user.surname) {
              this.form.surname = this.user.surname
            }
            if (this.user.phone) {
              this.form.phone = this.user.phone
            }
            if (this.user.city) {
              this.form.city = this.user.city
            }
          }
        }
      },
      async submitHandler() {
        if (this.form.phone.length === 0) {
          this.errorFrom.phone = 'Обязательное поле.'
        } else {
          this.errorFrom.phone = false
        }
        if (this.form.email.length === 0) {
          this.errorFrom.email = 'Обязательное поле.'
        } else {
          this.errorFrom.email = false
        }
        if (this.form.password.length === 0) {
          this.errorFrom.password = 'Обязательное поле.'
        } else {
          this.errorFrom.password = false
        }
        if (this.user.provider) {
          this.errorFrom.password = false
        }
        if (!this.errorFrom.email && !this.errorFrom.password && !this.errorFrom.phone) {

          const { status, data } = await this.$axios.put(`/users/${this.user.id}`, JSON.stringify(this.form), {
            headers: {
              Authorization: 'Bearer '+this.$cookies.get('_uh')
            }
          })
          if (status === 200) {
            await this.$store.commit('USER', data)
            await this.$cookies.set('_us', {
              login: this.form.email,
              password: this.form.password
            })
            this.readForm = true
          } else {
            this.$store.commit('ui/TYPEPOPUPS', {
              state: 'error',
              value: true,
              text: 'Что-то пошло не так.'
            })
          }
        }
      }
    },
    mounted() {
      this.replaceData()
    },
    beforeUpdate(){
      this.replaceData()
    }
  }
</script>

<style lang="scss">
  .lk__content {
    .add-item-input{
      &:first-child{
        padding-bottom: 30px;
      }
    }
    .fieldset{
      input{
        width: 100%;
      }
      .message{
        position: absolute;
        left: 0;
        bottom: -20px;
        font-size: 12px;
        line-height: 1;
      }
      &.error{
        &::before{
          content: 'Заполните поле';
          position: absolute;
          left: 0;
          top: 0;
          background-image: none;
          font-size: 16px;
          line-height: 24px;
          color: #ff4242;
          white-space: nowrap;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }
        input{
          width: 100%;
          &[readonly] {
            border-bottom-color: #ff4242;
          }
        }
      }
    }
    input{
      &[readonly] {
        border-bottom-color: transparent;
      }
    }
  }
</style>
