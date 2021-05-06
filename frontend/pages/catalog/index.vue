<template>
  <div>
    <Breadcrumbs :chain="chains" />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="preview-block preview-block__transparent">
            <div class="preview-block__title">
              <h3>Каталог</h3>
            </div>
            <div class="row">
              <div
                v-for="catalog of catalogs"
                class="col-xl-3 col-lg-4 col-md-6 ">
                <nuxt-link :to="'/catalog/'+catalog.slug" class="category__block-item">
                  <svg>
                    <use :xlink:href="'#'+catalog.slug"></use>
                  </svg>
                  <span v-html="replaceSpace(catalog.name)"></span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import Breadcrumbs from "~/components/UI/Breadcrumbs";
  export default {
    name: "catalogPage",
    components: {
      Breadcrumbs
    },
    computed:{
      ...mapState({
        catalogs: state => state.catalog.catalog,
        settings: state => state.settings
      }),
    },
    head() {
      return {
        title: 'Каталог',
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
    data: ()=> ({
      chains: [
        {
          url: '/',
          name: 'Главная',
        },
        {
          url: '',
          name: 'Каталог',
        }
      ]
    }),
    methods: {
      replaceSpace(string) {
        return string.replace(/(\s+)/g, (i => m => i++ ? m : '<br>')(0))
      }
    }
  }
</script>
