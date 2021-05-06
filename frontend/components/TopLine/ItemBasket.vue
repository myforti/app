<template>
  <li :class="openMenu.toString() === 'basket' ? 'active' : ''" data-popup-list>
    <a @click.prevent="backetHandler" class="menu-icon--link" href="#">
      <span class="icon" :style="{backgroundImage: `url(${require('assets/img/icons/cart.svg')})`}"><span class="count">{{basket.length}}</span></span>
      Корзина
    </a>
    <div data-popup-list-item="" class="list-popup">
      <div class="list-popup__title">
        <h4>Корзина ({{basket.length}})</h4>
        <div @click="$store.commit('ui/TOPMENUOPEN', [])" class="list-popup__close"></div>
      </div>
      <client-only>
      <div class="list-popup__content">
        <div class="list-popup__list">
          <template v-if="basket.length !== 0">
            <div v-for="item of basket" :key="item.id" class="list-popup__item">
              <template v-if="item.images.length">
                <template v-for="(image, index) of item.images">
                  <nuxt-link v-if="index === 0" :to="`/catalog/${item.catalog.slug}/${item.catalog_element.slug}/`+item.slug" :style="{backgroundImage: `url(${backURL+image.url})`}" class="list-popup__img"></nuxt-link>
                </template>
              </template>
              <template v-else >
                <nuxt-link :to="`/catalog/${item.catalog.slug}/${item.catalog_element.slug}/`+item.slug" :style="{backgroundImage: `url('/no-image.jpg')`}" class="list-popup__img"></nuxt-link>
              </template>


              <div class="list-popup__desc">
                <h3><nuxt-link :to="`/catalog/${item.catalog.slug}/${item.catalog_element.slug}/`+item.slug">{{item.name}}</nuxt-link></h3>
                <p v-if="item.filters">
                  <span v-for="filter of item.filters" :key="filter.id">
                    {{filter.name}}
                    <br>
                  </span>
                </p>
              </div>
              <div class="list-popup__price">
                <template v-if="Number(item.price) !== 0">
                  <div v-if="Number(item.price) === 0" class="price-old">{{Number(item.price_old).toLocaleString('ru')}} $</div>
                  <b v-else >{{Number(item.price).toLocaleString('ru')}} $</b>
                </template>
                <template v-else>
                  <b>Цена по запросу</b>
                </template>

              </div>
              <div class="list-popup__backet">
                  <BasketButton :id="Number(item.id)" :template="true" />
              </div>
            </div>
          </template>
          <template v-else>
              <p>В корзине пусто.</p>
          </template>

        </div>
      </div>
      </client-only>
      <div v-if="basket.length !== 0" class="list-popup__footer">
        <div v-if="summary" class="price">
          <span>Итого</span>
          <b>{{Number(summary).toLocaleString('ru')}} $ </b>
        </div>
        <a @click.prevent="toBasket" href="#" class="btn btn-accent">Перейти в корзину</a>
      </div>
    </div>
  </li>
</template>


<script>
  import { mapState, mapGetters } from "vuex"
  import BasketButton from "~/components/UI/BasketButton";
  export default {
    name: "ItemBasket",
    components: {BasketButton},
    async fetch() {
      let { $cookies, store } = this.$nuxt.context
      if ($cookies.get('_bs') && $cookies.get('_bs').length) {
        let params = ''
        $cookies.get('_bs').forEach(item => {
          params += `&id_in=${item}`
        })

        await store.dispatch('catalog/FetchProductBasket', params)
      }
    },
    computed:{
      ...mapState({
        basket: state => state.catalog.basket,
        openMenu: state => state.ui.topMenuItem
      }),
      ...mapGetters({
        summary: ['catalog/basketSummaryGETTERS']
      })
    },
    data: () => ({
      active: false,
      backURL: process.env.backURL
    }),
    methods:{
      backetHandler() {
        this.active = !this.active
        if(window.matchMedia("(max-width: 992px)").matches) {
          this.$router.push('/basket')
        } else {
          this.$store.commit('ui/TOPMENUOPEN', 'basket')
        }
        this.$yandexMetrika.reachGoal('748970624')
      },
      toBasket() {
        this.active = false
        this.$store.commit('ui/TOPMENUOPEN', [])
        this.$router.push('/basket')
      }
    }
  }
</script>
