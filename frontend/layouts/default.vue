<template>
  <div class="site">
    <div class="site-top">
      <TopLine />
      <NavigateCatalogTop />
      <Nuxt />
      <Consultation />
      <Info v-if="settings.info" :info="settings.info" />
    </div>
    <div class="site-bottom">
      <Footer />
      <Popups />
    </div>
    <Sprite />
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import TopLine from "@/components/TopLine"
  import NavigateCatalogTop from "@/components/NavigateCatalogTop"
  import Consultation from "@/components/Consultation"
  import Info from "@/components/Info"
  import Sprite from "@/components/UI/Sprite"
  import Footer from "@/components/Footer"
  import Popups from "@/components/Popups"

  export default {
    name: "default",
    components: {
      TopLine,
      NavigateCatalogTop,
      Consultation,
      Info,
      Sprite,
      Footer,
      Popups
    },
    computed: {
      ...mapState({
        settings: state => state.settings,
        openMenu: state => state.ui.topMenuItem
      })
    },
    head() {
      return {
        title: this.settings.metaTitle,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.settings.metaDescription
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.settings.metaKey
          }
        ]
      }
    },
    mounted() {
      document.addEventListener('click', (e) => {
        if(!e.target.closest('[data-popup-list]')) {
          this.$store.commit('ui/TOPMENUOPEN', [])
        }
      })
    }
  }
</script>

<style lang="scss">
  @import '@splidejs/splide/dist/css/themes/splide-default.min.css';
</style>
