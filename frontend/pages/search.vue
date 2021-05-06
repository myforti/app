<template>
    <section class="search__page">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="preview-block preview-block__transparent">
                        <h2 class="preview-block__title">Результаты поиска</h2>

                        <div v-if="$route.query.search" class="result-search">
                            По запросу “<b>{{$route.query.search}}</b>” найдено {{countSearch}} товаров
                        </div>
                        <div v-else class="result-search">
                            Пустой запрос {{$route.query.search}}
                        </div>
                        <div class="catalog-filter__block">
                            <FiltersProducts :paramsSearch="$route.query.search" :searchAll="true" :ruler="''" />
                        </div>
                        <div v-if="searchElements.length !== 0" class="preview-block__container">
                            <template v-for="product of searchElements">
                                <Card add-class="preview-block__product--vertical" :product="product" />
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapState } from "vuex"
    import Card from "~/components/UI/Card"
    import FiltersProducts from "~/components/UI/FiltersProducts";
    export default {
        name: "SearchPage",
        components: {
            Card, FiltersProducts
        },
        computed: {
            ...mapState({
               searchElements: state => state.catalog.searchElements
            }),
            watchSearch() {
                return this.$route.query.search
            },
            countSearch() {
                return this.searchElements.length
            }
        },
        watch: {
            watchSearch(newValue) {
                this.searchElement()
            }
        },
        methods:{
          searchElement() {
              if (this.$route.query.search === '') return false
              this.$store.dispatch('catalog/FetchSearchElements', this.$route.query.search)
          }
        },
        mounted() {
            if (this.$route.query.search) {
                this.searchElement()
            }
            this.$nuxt.$on('filtersFill', async requset => {
                const { status, data } = await this.$axios.get(`/${requset}`)

                if (status === 200) {
                    this.$store.commit('catalog/SEARCHELEMENTS', data)
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
                    this.$store.commit('catalog/SEARCHELEMENTS', data)
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

<style lang="scss">
    .result-search{
        font-size: 18px;
        line-height: 24px;
        margin-bottom: 30px;
        font-weight: 600;
    }
</style>