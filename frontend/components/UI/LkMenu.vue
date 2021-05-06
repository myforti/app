<template>
  <ul>
    <li>
      <nuxt-link @click.native="$store.commit('ui/TOPMENUOPEN', [])" to="/user/personal-data" href="#">Личные данные</nuxt-link>
    </li>
    <li>
      <nuxt-link @click.native="$store.commit('ui/TOPMENUOPEN', [])" to="/user/my-orders">Мои заказы</nuxt-link>
    </li>
    <li>
      <nuxt-link @click.native="$store.commit('ui/TOPMENUOPEN', [])" to="/user/favorites">Избранное ({{Object.keys(user).includes('favorites') ? user.favorites.length : 0}})</nuxt-link>
    </li>
    <li>
      <nuxt-link @click.native="$store.commit('ui/TOPMENUOPEN', [])" to="/basket">Корзина ({{basket ? basket.length : '0'}})</nuxt-link>
    </li>
    <li class="logout-li">
      <a class="logout" @click.prevent="logout" href="#">Выйти</a>
    </li>
  </ul>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    name: "LkMenu",
    computed:{
      ...mapState({
        user: state => state.user,
        basket: state => state.catalog.basket
      })
    },
    methods: {
      logout() {
        this.$store.commit('USER', null)
        this.$cookies.remove('_us')
        this.$cookies.remove('_uh')
        this.$cookies.remove('_ui')
        // this.$store.commit('ui/TYPEPOPUPS', {
        //   state: 'error',
        //   value: true,
        //   title: 'Уведомление',
        //   text: 'Вы вышли!'
        // })
        this.$router.push('/')
      }
    }
  }
</script>
