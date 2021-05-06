<template>
  <div>
    <breadcrumbs :chain="chains" />
    <br>
    <Loader />
    <div v-if="load" class="container">
      <div class="row">
        <div class="col-12">
          <div v-if="typeProducts" class="catalog-inner">
            <div class="row align-items-center">
              <div class="col-lg-5 order-2 order-lg-1">
                <div  class="catalog-inner__text">
                  <h3>{{typeProducts.name}}</h3>
                  <p v-if="typeProducts.description">
                    {{typeProducts.description}}
                  </p>
                  <p v-else >Нет описания.</p>
                  <div v-if="typeProducts && typeProducts.filters" class="group-icons">
                    <div v-for="filter of typeProducts.filters" class="group-icons__col">
                      <div class="group-icons__item">
                        <span v-if="filter.icon" :style="{backgroundImage: `url(${backURL+filter.icon.url})`, backgroundSize: `${filter.icon.width - 2}px`}" class="group-icons__img"></span>
                        <span>{{filter.name}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-7 order-1 order-lg-2">
                <div v-if="typeProducts.mainImage" :style="{backgroundImage: `url(${backURL+typeProducts.mainImage.url})`}" class="catalog-inner__img"></div>
                <div v-else style="background-image: url('/no-image.jpg');" class="catalog-inner__img"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="load" class="container">
      <div class="row">
        <div class="col-12">
          <div class="preview-block preview-block__transparent">
            <div class="catalog-filter__block">
              <FiltersProducts :disableRule="false" />
              <div class="filter-content">
                <div class="row">
                  <div class="col-12">
                    <div class="preview-block__container">
                      <template v-if="products.length">
                        <template v-for="product of products">
                          <Card 
                            :key="product.id"
                            :add-class="'preview-block__product--vertical'" 
                            :product="product" 
                            :params="$route.params.slugs+'/'+$route.params.slug" 
                          />
                        </template>
                      </template>
                      <template v-else>
                        <IconLoader v-if="oadContent === false"  />
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
  import Breadcrumbs from "~/components/UI/Breadcrumbs";
  import Card from "~/components/UI/Card";
  import FiltersProducts from "~/components/UI/FiltersProducts";
  import Loader from "~/components/UI/loader"
  import IconLoader from "~/components/UI/IconLoad"
  export default {
    name: "slugProduct",
    components: {
      Card,
      Breadcrumbs,
      FiltersProducts,
      Loader,
      IconLoader
    },
    head() {
      return {
        title: this.typeProducts.name,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.typeProducts.metaDescription ? this.typeProducts.metaDescription : this.settings.metaDescription
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.typeProducts.metakey ? this.typeProducts.metakey : this.settings.metaKey
          }
        ]
      }
    },
    async fetch() {
      const { store, route } = this.$nuxt.context
      const RequestRulerProducts = await this.$axios.get(`/products?_where[catalog.slug]=${route.params.slugs}&_where[catalog_element.slug]=${route.params.slug}`)
      const RequestTypeProducts = await this.$axios.get(`/catalog-elements?slug=${route.params.slug}`)
      if (RequestTypeProducts.status === 200) {
        [this.typeProducts] = RequestTypeProducts.data
      }
      if (RequestRulerProducts.status === 200) {
        this.products = RequestRulerProducts.data
        this.loadContent = true
      } else {
        this.$store.commit('ui/TYPEPOPUPS', {
          state: 'error',
          value: true,
          title: 'Ошибка',
          text: 'Не удалось загрузить данные'
        });
      }
      //await store.dispatch('catalog/FetchFilters', `[catalog_elements.slug]=${route.params.slug}`)
      await store.dispatch('catalog/FetchCatalogParams', `catalogs?slug=${route.params.slugs}`)
      //await store.dispatch('catalog/FetchCatalogParams', `products?_where[catalogs.slug]=${route.params.slugs}&_where[catalog_element.slug]=${route.params.slug}`)
      
    },
    computed: {
      ...mapState({
        catalogs: state => state.catalog.catalog,
        settings: state => state.settings
        //products: state => state.catalog.catalogProducts,
        //filters: state => state.catalog.filters
      }),
      catEl() {
        if (this.catalogs.length === 0) return false
        const [elOnly] = this.catalogs.filter(item => item.slug === this.$route.params.slugs)
        return elOnly
      },
      firstProduct() {
        if (this.products.length) {
          let [item] = this.products
          return item
        }
      },
      chains() {
        let name = ''
        let slugs = ''
        let ctlg = JSON.parse(JSON.stringify(this.catalogs)).filter(item => item.slug === this.$route.params.slugs)
        ctlg.forEach(item => {
          console.log('test', this.typeProducts)
          name = item.name
          slugs = item.slug
        })

        const chain = [
          {
            name: "Главная",
            url: "/"
          },
          {
            name: "каталог",
            url: "/catalog"
          },
          {
            name: name.toLowerCase(),
            url: '/catalog/'+slugs
          },
          {
            name: this.typeProducts ? this.typeProducts.name : this.$route.params.slug,
            url: ''
          }
        ]
        return chain
      }
    },
    data: () => ({
      backURL: process.env.backURL,
      products: [],
      typeProducts: '',
      load: false,
      loadContent: false
    }),
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
      this.load = true
    }
  }
</script>
