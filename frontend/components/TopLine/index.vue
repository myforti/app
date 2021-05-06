<template>
  <div>
    <div class="top-line">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-4">
            <a class="logo" href="/">
              <img src="/logo.svg" width="170" alt="logo">
            </a>
          </div>
          <div class="col-8">
            <div class="top-line__menu">
              <ul class="d-none d-xl-flex">
<!--                <li><nuxt-link to="/catalog/gotovye-resheniya">Готовые решения</nuxt-link></li>-->
                <li>
                  <a
                      v-if="settings && settings.Price"
                      download
                      title="Скачать прайс"
                      :href="'https://adm.myforti.ru'+settings.Price.url"
                  >Прайс</a>
                </li>
                <li><nuxt-link to="/stocks">Акции</nuxt-link></li>
                <li><nuxt-link to="/news">Новости</nuxt-link></li>
                <li><nuxt-link @click.native="$yandexMetrika.reachGoal('748970623')" to="/contacts">Контакты</nuxt-link></li>
              </ul>
              <ul>
                <MainItemNav />
                <ItemFavorites />
                <client-only>
                  <ItemBasket />
                </client-only>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div><!-- top-line -->
    <div class="d-xl-none">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <ul class="top-line__sub">
<!--              <li><nuxt-link to="/catalog/gotovye-resheniya">Готовые решения</nuxt-link></li>-->
              <li><a download href="#">Прайс</a></li>
              <li><nuxt-link to="/stocks">Акции</nuxt-link></li>
              <li><nuxt-link to="/news">Новости</nuxt-link></li>
              <li><nuxt-link to="/contacts">Контакты</nuxt-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import MainItemNav from "~/components/TopLine/MainItemNav";
  import ItemFavorites from "~/components/TopLine/ItemFavorites"
  import ItemBasket from "~/components/TopLine/ItemBasket"
  export default {
    name: "IndexTopLine",
    components:{
      MainItemNav,
      ItemFavorites,
      ItemBasket
    },
    computed:{
      ...mapState({
        settings: state => state.settings
      })
    }
  }
</script>
