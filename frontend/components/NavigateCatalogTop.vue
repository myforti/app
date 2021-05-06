<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="search__block">
          <div class="button-catalog">
            <a @click.prevent="$yandexMetrika.reachGoal('748970621')" data-catalog-btn="" class="btn btn-accent" href="#"><span class="burger"><span></span>
                            <span></span>
                            <span></span></span>Каталог</a>

            <nav data-catalog-nav="" class="catalog-nav">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <div class="catalog-nav__wrapper">
                      <div class="catalog-nav__close"></div>
                      <div class="catalog-nav__container">
                        <template v-for="catalog of catalogs" >
                          <div :key="catalog.id" :class="catalog.slug === 'gotovye-resheniya' ? 'catalog-nav__item--w100' : ''" class="catalog-nav__item isList">
                          <h3><nuxt-link :to="'/catalog/'+catalog.slug">{{catalog.name}}</nuxt-link></h3>
                          <ul>
                            <template v-if="catalog.slug === 'gotovye-resheniya'">
                              <li v-for="solution of solutions">
                                <nuxt-link :to="'/catalog/'+catalog.slug+'/'+solution.catalog_element.slug+'/'+solution.slug">
                                  <span class="catalog-nav__icon">
                                      <img  :src="backURL + solution.iconNavigate.url" :alt="solution.iconNavigate.name">
                                  </span>
                                  <span :style="{maxWidth: `${solution.name.length * 5}px`}" class="text">{{solution.name}}</span>
                                </nuxt-link>
                              </li>
                            </template>
                            <template v-else >
                              <li
                                      v-for="link of catalog.catalog_elements"
                                      :key="link.id"
                              >
                                <nuxt-link :to="'/catalog/'+catalog.slug+'/'+link.slug">{{link.name}}</nuxt-link>
                              </li>
                            </template>
                          </ul>
                        </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

          </div>
          <div class="form__search">
            <Search />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import { mapState } from "vuex"
  import Search from "~/components/Search"
  export default {
    name: "NavigateCatalogTop",
    async fetch() {
      const { store } = this.$nuxt.context
      await store.dispatch('catalog/FetchCatalog')
      const { status , data } = await this.$axios.get('/products?_where[catalog.slug]=gotovye-resheniya')
      if (status === 200) {
        this.solutions = data
      }
    },
    components:{
      Search
    },
    computed: {
      ...mapState({
        catalogs: state => state.catalog.catalog
      })
    },
    data: () => ({
      solutions: [],
      backURL: process.env.backURL
    }),
    methods: {
      CatalogHandler() {
        const burger = document.querySelector('[data-catalog-btn]')
        const nav = document.querySelector('[data-catalog-nav]')
        const nav_close = document.querySelector('.catalog-nav__close')
        const nav_titles = document.querySelectorAll('.catalog-nav__item h3')
        const nav_list = document.querySelectorAll('.catalog-nav__item ul')
        const container = document.querySelector('.container')
        const links = nav.querySelectorAll('a')

        document.addEventListener('click', (e) => {
          if (!e.target.closest('.button-catalog')) {
            nav.classList.remove('active')
            burger.classList.remove('active')
          }
        })

        burger.addEventListener('click', (e) => {
          e.preventDefault();
          if (nav.classList.contains('active')) {
            nav.classList.remove('active')
            burger.classList.remove('active')
          } else {
            nav.classList.add('active')
            burger.classList.add('active')
          }
        })
        nav_close.addEventListener('click', (e) => {
          nav.classList.remove('active')
          burger.classList.remove('active')
        })
        links.forEach(link => {
          link.addEventListener('click', (e) => {
              nav.classList.remove('active')
              burger.classList.remove('active')
          });
        })
        nav_titles.forEach(item => {
          item.addEventListener('click', e => {
            const target = e.target
            target.parentNode.classList.contains('open') ? target.parentNode.classList.remove('open') : target.parentNode.classList.add('open')

          });
        })
        function widthCatalogContainer() {
          nav.style.width = container.offsetWidth + 'px'
        }
        function isList() {
          nav_list.forEach(item => {
            item.parentNode.classList.add('isList')
          })
        }
        isList();
        widthCatalogContainer();
        window.addEventListener('resize', widthCatalogContainer)
      }
    },
    mounted() {
      this.CatalogHandler()
    }
  }
</script>

<style lang="scss">
  .catalog-nav__item--w100{
    .text{
      max-width: 100px;
    }
  }
</style>
