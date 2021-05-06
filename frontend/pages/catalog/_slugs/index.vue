<template>
  <div>
    <Breadcrumbs :chain="[{name: 'Главная', url: '/'}, {name: 'каталог', url: '/catalog'}, {name: subCatalog.name.toLowerCase(), url: ''}]" />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="preview-block preview-block__transparent">
            <div class="preview-block__title">
              <h3>{{subCatalog.name}}</h3>
            </div>
            <div v-if="catalogs" class="row custom-row-10">
              <div
                v-for="catalog of subCatalog.catalog_elements"
                :key="catalog.id"
                class="col-xl-3 col-lg-4 col-md-6">
                <div class="catalog-item">
                  <div v-if="catalog.icons !== null" class="catalog-item__img">
                    <nuxt-link :style="{backgroundImage: `url(${backURL + catalog.icons.url})`,backgroundSize: `${catalog.icons.width}px`}" :to="'/catalog/'+$route.params.slugs+'/'+catalog.slug"></nuxt-link>
                  </div>
                  <div class="catalog-item__text">
                    <div>
                      <h3><nuxt-link :to="'/catalog/'+$route.params.slugs+'/'+catalog.slug">{{catalog.name}}</nuxt-link></h3>
                      <p v-if="catalog.description">{{catalog.description}}</p>
                    </div>
                    <div>
                      <nuxt-link class="read" :to="'/catalog/'+$route.params.slugs+'/'+catalog.slug">Перейти в раздел</nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="catalog-filter__block">
              <FiltersProducts :rulers="$route.params.slugs" />
              <div class="filter-content">
                <div class="row">
                  <div class="col-12">
                    <div class="preview-block__container">
                      <h4 v-if="loading === false">Загрузка....</h4>
                      <template v-if="products.length !== 0">
                        <template v-for="product of products">
                          <Card v-if="product.catalog_element" :add-class="'preview-block__product--vertical'" :params="$route.params.slugs +'/'+product.catalog_element.slug" :product="product" />
                        </template>
                      </template>
                      <template v-else>
                        <IconLoader v-if="loadContent === false" />
                        <h4 v-else>Товары не найдены.</h4>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import Card from "~/components/UI/Card";
  import Breadcrumbs from "~/components/UI/Breadcrumbs";
  import FiltersProducts from "~/components/UI/FiltersProducts";
  import IconLoader from "~/components/UI/IconLoad"

  export default {
    name: "catalogInnerPage",
    components: {
      Card,
      Breadcrumbs,
      FiltersProducts,
      IconLoader
    },
    head() {
      return {
        title: this.catalogs.filter(item => item.slug === this.$route.params.slugs)[0].name,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.catalogs.filter(item => item.slug === this.$route.params.slugs)[0].metaDescription ? this.catalogs.filter(item => item.slug === this.$route.params.slugs)[0].metaDescription : this.settings.metaDescription
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.catalogs.filter(item => item.slug === this.$route.params.slugs)[0].metaKey ? this.catalogs.filter(item => item.slug === this.$route.params.slugs)[0].metaKey : this.settings.metaKey
          }
        ]
      }
    },
    async fetch() {
      const { store } = this.$nuxt.context
      const { status, data } = await this.$axios.get(`/products?_where[catalog.slug]=${this.$route.params.slugs}`)
      if (status === 200) {
        this.products = data
        this.loading = true
        this.loadContent = true
      } else {
        this.$store.commit('ui/TYPEPOPUPS', {
          state: 'error',
          value: true,
          title: 'Ошибка',
          text: 'Не удалось загрузить данные'
        });
        this.loading = true
      }
    },
    data: () => ({
      backURL: process.env.backURL,
      products: [],
      loading: false,
      loadContent: false
    }),
    computed: {
      ...mapState({
        catalogs: state => state.catalog.catalog,
        settings: state => state.settings
      }),
      subCatalog() {
        const [sub] = this.catalogs.filter(item => item.slug === this.$route.params.slugs)
        return sub
      }
    },
    mounted() {
      this.$nuxt.$on('filtersFill', async requset => {
        const { status, data } = await this.$axios.get(`/${requset}`)

        if (status === 200) {
          this.products = data
        } else {
          this.$store.commit('ui/TYPEPOPUPS', {
            state: 'error',
            value: true,
            title: 'Ошибка',
            text: 'Не удалось загрузить данные'
          });
        }
      });
      this.$nuxt.$on('filtersEmpty', async requset => {
        const { status, data } = await this.$axios.get(`/${requset}`)
        if (status === 200) {
          this.products = data
        } else {
          this.$store.commit('ui/TYPEPOPUPS', {
            state: 'error',
            value: true,
            title: 'Ошибка',
            text: 'Не удалось загрузить данные'
          });
        }
      })
    }
  }
</script>
