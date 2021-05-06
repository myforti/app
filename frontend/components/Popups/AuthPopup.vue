<template>
  <div v-if="popupAuth.auth || isPopup" class="popup active" id="auth">
    <div class="popup-overlay">
      <div class="popup-wrapper">
        <div @click="close" class="popup-close"></div>
        <div class="popup-content">
          <h3>Личный кабинет</h3>
          <form>
            <div class="form">
              <div class="tabs">
                <div class="tabs__controls">
                  <div :class="tabsActive === 'login' ? 'active' : ''" @click.prevent="tab('login')" class="tabs__controls-item">
                    <span>Вход</span>
                  </div>
                  <div :class="tabsActive === 'register' ? 'active' : ''" @click.prevent="tab('register')" class="tabs__controls-item">
                    <span>Регистрация</span>
                  </div>
                </div>
                <div class="tabs__content">
                  <div v-if="tabsActive === 'login'" class="tabs__content-item active">
                    <FormLogin />
                    <Loader />
                  </div>
                  <div v-if="tabsActive === 'register'" class="tabs__content-item active">
                    <FormRegister />
                    <Loader />
                  </div>
                </div>
              </div>
              <div class="form__social">
                <div class="social">
                  <ul>
                    <li>
                      <a href="https://adm.myforti.ru/connect/vk">
                        <svg>
                          <use xlink:href="#vk-svg"></use>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="https://adm.myforti.ru/connect/google">
                        <svg>
                          <use xlink:href="#google-svg"></use>
                        </svg>
                      </a>
                    </li>
<!--                    <li>-->
<!--                      <a href="#">-->
<!--                        <svg>-->
<!--                          <use xlink:href="#odn-svg"></use>-->
<!--                        </svg>-->
<!--                      </a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <a href="#">-->
<!--                        <svg>-->
<!--                          <use xlink:href="#fb-svg"></use>-->
<!--                        </svg>-->
<!--                      </a>-->
<!--                    </li>-->
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import FormLogin from "~/components/Form/FormLogin";
  import FormRegister from "~/components/Form/FormRegister";
  import Loader from "~/components/UI/loader"

  export default {
    name: "AuthPopups",
    components: {
      FormLogin,
      FormRegister,
      Loader
    },
    computed: {
      ...mapState({
        popupAuth: state => state.ui.popup,
        user: state => state.user
      }),
      isPopup() {
        let is = false
        if (this.$route.query.auth === 'login') {
          this.active = true
          is = true
        } else {
          this.active = false
        }
        return is
      }
    },
    data: () => ({
      tabsActive: 'login',
      active: false
    }),
    methods: {
      close() {
        this.$store.commit('ui/TYPEPOPUPS', {
          state: 'auth',
          value: false
        })
        this.active = false
        if (Object.keys(this.$route.query).length) this.$router.replace({ query: '' });
      },
      tab(value) {
        this.tabsActive = value
      }
    },
  }
</script>
