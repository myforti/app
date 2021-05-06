<template>
  <footer>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-3">
          <div class="fortistock">
            <a class="logo" href="/">
              <img src="/logo.svg" width="170" alt="logo">
            </a>
            <a @click="$yandexMetrika.reachGoal('748970623')" :href="`tel:${settings.phone}`">{{settings.phone}}</a>
            <br>
            <div @click="feedbackPopup" class="btn btn-accent">Оставить заявку</div>
          </div>
        </div>
        <div class="col-xl-6">
          <nav class="nav-footer">
            <ul>
              <li><nuxt-link to="/catalog">Каталог</nuxt-link></li>
              <li><nuxt-link to="/stocks">Акции</nuxt-link></li>
              <li><nuxt-link to="/news">Новости</nuxt-link></li>
              <client-only>
<!--              <li><nuxt-link to="/partners">Партнерам</nuxt-link></li>-->
<!--              <li><nuxt-link to="/delivery-payment">Доставка и оплата</nuxt-link></li>-->
<!--              <li><nuxt-link to="/return">Возврат</nuxt-link></li>-->
              </client-only>
              <li><nuxt-link to="/for-legal-entities">Для юридических лиц</nuxt-link></li>

              <li><nuxt-link @click.native="$yandexMetrika.reachGoal('748970623')" to="/contacts">Контакты</nuxt-link></li>
              <li><nuxt-link to="/privacy-policy">Политика  конфиденциальности</nuxt-link></li>
            </ul>
          </nav>
        </div>
        <div class="col-xl-3 ">
          <div class="search-form--footer">
<!--            <form>-->
<!--              <input type="text" placeholder="Поиск по сайту">-->
<!--              <button>search</button>-->
<!--            </form>-->
            <Search />
          </div>
        </div>
        <div class="col-12">
          <div class="small-text">Информация на сайте не является публичной офертой, определяемой положениями статьи 437(2) ГК РФ.</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  import { mapState } from "vuex"
  import Search from "~/components/Search"
  export default {
    name: 'Footer',
    components: {
      Search
    },
    computed: {
      ...mapState({
        settings: state => state.settings
      })
    },
    methods: {
      feedbackPopup() {
        this.$store.commit('ui/TYPEPOPUPS', {
          state: 'feedback',
          value: true
        })

        this.$yandexMetrika.reachGoal('748970622')
      }
    }
  }
</script>

<style lang="scss">
  .small-text{
    font-size: 12px;
    color: #ffffff;
    opacity: .5;
    padding-top: 20px;
    @media (max-width: 1200px) {
      text-align: center;
    }
  }
</style>
