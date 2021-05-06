<template>
  <li data-popup-list :class="openMenu.toString() === 'userNav' ? 'active' : ''">
    <template v-if="user !== null">
      <a @click.prevent="lk" class="menu-icon--link" >
        <span class="icon" :style="{backgroundImage: `url(${require('assets/img/icons/user.svg')})`}"><span class="count"></span></span>
        Личный кабинет
      </a>
    </template>
    <template v-else>
      <a @click.prevent="isPopupAuth" class="menu-icon--link" >
        <span class="icon" :style="{backgroundImage: `url(${require('assets/img/icons/user.svg')})`}"><span class="count"></span></span>
        Личный кабинет
      </a>
    </template>

    <div v-if="user !== null && openMenu.toString() === 'userNav'" class="list-popup list-popup--lk">
      <div @click.prevent="$store.commit('ui/TOPMENUOPEN', [])" class="list-popup__close"></div>
      <LkMenu />
    </div>
  </li>
</template>

<script>
  import { mapState, mapMutations } from "vuex"
  import LkMenu from "~/components/UI/LkMenu";
  export default {
    name: "MainItemNav",
    props:{
      url: {
        type: String
      },
      iconUrl: {
        type: String
      }
    },
    components: {
      LkMenu
    },
    data:() => ({
      subMenu: false
    }),
    computed:{
      ...mapState({
        user: state => state.user,
        openMenu: state => state.ui.topMenuItem
      })
    },
    methods: {
      ...mapMutations(['ui/TYPEPOPUPS']),
      isPopupAuth() {
        this['ui/TYPEPOPUPS']({
          state: 'auth',
          value: true
        })
      },
      lk() {
        this.subMenu = !this.subMenu
        if(window.matchMedia("(max-width: 992px)").matches) {
          this.$router.push('/user/personal-data')
        } else {
          this.$store.commit('ui/TOPMENUOPEN', 'userNav')
        }
      },
      logout() {
        this.$store.commit('USER', null)
        this.$cookies.remove('_us')
        this.$cookies.remove('_uh')
        this.$store.commit('ui/TYPEPOPUPS', {
          state: 'error',
          value: true,
          title: 'Уведомление',
          text: 'Вы вышли!'
        })
      }
    }
  }
</script>
