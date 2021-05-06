<template>
  <li :class="openMenu.toString() === 'favorite' ? 'active' : ''" data-popup-list="">
    <a @click.prevent="favorit" class="menu-icon--link" href="#">
      <span class="icon" :style="{backgroundImage: `url(${require('assets/img/icons/heart.svg')})`}">
        <span v-if="user && user.favorites" class="count">{{user.favorites.length}}</span>
      </span>
      Избранное
    </a>
    <div data-popup-list-item="" class="list-popup">
      <div class="list-popup__title">
        <h4>Избранное <template v-if="user && user.favorites">({{user.favorites.length}})</template></h4>
        <div @click="$store.commit('ui/TOPMENUOPEN', [])" class="list-popup__close"></div>
      </div>
      <client-only>
        <div class="list-popup__content">
        <div v-if="favorites && favorites.length !== 0" class="list-popup__list">
          <div v-for="favorit of favorites" class="list-popup__item">
            <template v-if="firstImage(favorit)">
              <nuxt-link :to="`/catalog/${favorit.catalog.slug}/${favorit.catalog_element.slug}/`+favorit.slug" :style="{backgroundImage: `url(${backURL + firstImage(favorit).url})`}" class="list-popup__img"></nuxt-link>
            </template>
            <template v-else>
              <nuxt-link :to="`/catalog/${favorit.catalog.slug}/${favorit.catalog_element.slug}/`+favorit.slug" :style="{backgroundImage: `url(/no-image.jpg)`}" class="list-popup__img"></nuxt-link>
            </template>

            <div class="list-popup__desc">
              <h3><nuxt-link :to="`/catalog/${favorit.catalog.slug}/${favorit.catalog_element.slug}/`+favorit.slug" >{{favorit.name}}</nuxt-link></h3>
              <p v-if="favorit.filters">
                <span v-for="filter of favorit.filters">{{filter.name}} <br></span>
              </p>
            </div>
            <div class="list-popup__price">
              <div v-if="Number(favorit.price_old) !== 0" class="price-old">{{Number(favorit.price_old).toLocaleString('ru-RU')}} $</div>
              <b>{{Number(favorit.price).toLocaleString('ru-RU')}} $</b>
            </div>
            <div class="list-popup__heart">
              <IconFavorite :id="Number(favorit.id)" />
            </div>
          </div>
        </div>
        <h4 v-else>В избраном ничего нет.</h4>
      </div>
      </client-only>
      <div class="list-popup__footer">
        <span></span>
        <a v-if="favorites && favorites.length !== 0" @click.prevent="toFavorite" href="#" class="btn btn-outline btn-outline--primary">Перейти в избранное</a>
      </div>
    </div>
  </li>
</template>


<script>
  import { mapState } from "vuex"
  import IconFavorite from "~/components/UI/iconFavorite";

  export default {
    name: "ItemFavorites",
    components:{
      IconFavorite
    },
    data: () => ({
      active: false,
      backURL: process.env.backURL
    }),
    computed: {
      ...mapState({
        user: state => state.user,
        favorites: state => state.catalog.catalogFavorite,
        openMenu: state => state.ui.topMenuItem
      }),
    },
    methods: {
      firstImage(favorite) {
        const copyProduct = JSON.parse(JSON.stringify(favorite))
        return copyProduct.images ? copyProduct.images.shift() : copyProduct.images
      },
      favorit() {
        if (!this.$cookies.get("_us") && !this.$cookies.get("_ui")) {
          this.$router.push('?auth=login')
          return false
        }
        this.active = !this.active
        this.$store.commit('ui/TOPMENUOPEN', 'favorite')
        if(window.matchMedia("(max-width: 992px)").matches) {
          this.$router.push('/user/favorites')
        }
      },
      toFavorite() {
        this.$store.commit('ui/TOPMENUOPEN', [])
        this.$router.push('/user/favorites')
      }
    },
    async mounted() {
      if(!this.$cookies.get('_us') && !this.$cookies.get('_ui')) return false
      if (this.user && !Object.keys(this.user).includes('favorites')) return false

      let requestString = ''
      this.user.favorites.forEach(item => {
        requestString += `&id_in=${item.id_favorite}`
      })

      await this.$store.dispatch('catalog/FetchCatalogFavorites', requestString)
    },
    async beforeUpdate() {
      if(!this.$cookies.get('_us')) return false
      if (this.user.favorites.length === 0) this.$store.commit('catalog/FAVORITES', '')
    }
  }
</script>
