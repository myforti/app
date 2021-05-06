<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="preview-block preview-block__transparent solution">
                    <div class="preview-block__title">
                        <h3>Готовые решения</h3>
                        <nuxt-link to="/catalog/gotovye-resheniya/">
                            Перейти в раздел
                            <span></span>
                        </nuxt-link>
                    </div>
                    <div class="preview-block__carousel preview-block__carousel--solutions">
                        <Loader />
                        <div class="preview-block__wrapper">
                          <client-only>
                            <splide ref="splide" :options="options">
                                <splide-slide v-for="solution of solutions" :key="solution.id">
                                    <template >
                                        <div class="solution__block">
                                            <div class="solution__block-top">
                                                <div v-if="solution.images && solution.images.length" class="solution__block-img">
                                                    <template v-for="(image, index) of solution.images">
                                                        <img v-if="index === 0" :src="backURL+image.url" :alt="solution.name">
                                                    </template>
                                                </div>
                                                <div v-else class="solution__block-img">
                                                    <img src="/no-image.jpg" :alt="solution.name">
                                                </div>
                                                <h3><nuxt-link :to="/catalog/+solution.catalog.slug+'/'+solution.catalog_element.slug+'/'+solution.slug">{{solution.name}}</nuxt-link></h3>
                                                <div v-html="markDown(solution.description)"></div>
                                            </div>
                                            <div class="solution__block-bottom">
                                                <div class="price">
                                                    {{Number(solution.price).toLocaleString('ru')}} $
                                                </div>
                                                <BasketButton :id="Number(solution.id)" />
                                                <br>
                                                <nuxt-link :to="/catalog/+solution.catalog.slug+'/'+solution.catalog_element.slug+'/'+solution.slug" class="read">Подробнее</nuxt-link>
                                            </div>
                                        </div>
                                    </template>
                                </splide-slide>
                            </splide>
                          </client-only>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import marked from "marked"
    import BasketButton from "~/components/UI/BasketButton"
    import Loader from "~/components/UI/loader";

    export default {
        name: 'ReadySolutions',
        async fetch() {
            const { status , data } = await this.$axios.get('/products?_where[catalog.slug]=gotovye-resheniya')
            if (status === 200) {
                this.solutions = data
            }
        },
        components: {
            BasketButton,
            Loader
        },
        data: () => ({
           solutions: [],
            backURL: process.env.backURL,
            load: false,
            options: {
                perPage: 4,
                gap: '10px',
                arrows: false,
                breakpoints: {
                    576: {
                        perPage: 1,
                    },
                    992: {
                        perPage: 2,
                    },
                    1240: {
                        perPage: 3,
                    },
                },
            }
        }),
        methods: {
            markDown(content) {
                if (!content) {
                  return false
                }
                return marked(content)
            },
        },
        mounted() {
            this.load = true
        },
        beforeUpdate() {
          setTimeout(() => {
            this.$refs.splide.splide.refresh()
          })
        }
    }
</script>