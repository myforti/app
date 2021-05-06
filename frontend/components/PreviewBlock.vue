<template>
    <div class="preview-block ">
        <div class="preview-block__title">
            <h3>{{params.name}}</h3>
            <nuxt-link @click.native="$yandexMetrika.reachGoal('748970627')" :to="url">
                Перейти в раздел
                <span></span>
            </nuxt-link>
        </div>
        <div v-if="previews.length" class="preview-block__carousel">
            <div class="preview-block__wrapper">
                <Loader />
                <splide v-if="load" :options="options">
                    <splide-slide v-for="preview of previews" :key="preview.id">
                        <div class="preview-block__product">
                            <div v-if="preview.images.length" class="preview-block__img">
                                <template v-for="(image, idx) of preview.images">
                                    <template v-if="idx === 0">
                                        <IconFavorite v-if="user" :id="preview.id" />

                                        <nuxt-link @click.native="$yandexMetrika.reachGoal('748970628')" :key="image.id" :style="{backgroundImage: `url(${backendURL+image.url})`}" :to="'/catalog/'+params.slugs+'/'+preview.catalog_element.slug+'/'+preview.slug"></nuxt-link>
                                    </template>
                                </template>
                            </div>
                            <div v-else class="preview-block__img">
                                <IconFavorite v-if="user" :id="preview.id" />
                                <nuxt-link @click.native="$yandexMetrika.reachGoal('748970628')" :style="{backgroundImage: `url(/no-image.jpg)`}" :to="'/catalog/'+params.slugs+'/'+preview.catalog_element.slug+'/'+preview.slug"></nuxt-link>
                            </div>
                            <div class="preview-block__text">
                                <div class="preview-block__text--top">
                                    <h4>
                                        <nuxt-link @click.native="$yandexMetrika.reachGoal('748970628')" :to="'/catalog/'+params.slugs+'/'+preview.catalog_element.slug+'/'+preview.slug">{{preview.name}}</nuxt-link>
                                    </h4>
                                    <p v-if="preview.filters.length">
                                        <template v-for="filter of preview.filters">
                                            <span>{{filter.name}}</span> <br>
                                        </template>
                                    </p>
                                </div>
                                <div :class="Number(preview.price_old) !== 0 ? '' : 'align-items-center'" class="preview-block__text--bottom">
                                    <div class="price">
                                        <div v-if="Number(preview.price_old) !== 0" class="price-old">{{Number(preview.price_old).toLocaleString('ru')}} $</div>
                                        <b v-if="Number(preview.price) !== 0">{{Number(preview.price).toLocaleString('ru')}} $</b>
                                        <b v-else >Цена по запросу</b>
                                    </div>
                                    <div class="button">
                                        <ButtonBasket :icon="true" :id="preview.id" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </splide-slide>
                </splide>
            </div>
        </div>
        <div v-else class="preview-block__carousel">
            <div class="preview-block__wrapper">
                <h3>В этой категории нет товаров.</h3>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import Swiper, { Navigation, Pagination, Thumbs } from "swiper";
    Swiper.use([Navigation, Pagination, Thumbs]);
    import ButtonBasket from "~/components/UI/BasketButton"
    import IconFavorite from "~/components/UI/iconFavorite"
    import Loader from "~/components/UI/loader"
    export default {
        name: "PreviewBlock",
        props: {
            params: {
                type: Object,
                required: true
            },
            similar: {
                type: String,
            },
            idProduct: {
                type: Number
            }
        },
        components: {
            ButtonBasket,
            IconFavorite,
            Loader
        },
        data: () => ({
            backendURL: process.env.backURL,
            previews: [],
            load: false,
            options: {
                perPage: 3,
                gap: '0px',
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
        async fetch() {
            const {error} = this.$nuxt.context

            if (this.similar) {
                const {status, data} = await this.$axios.get(`/products?_where[catalog.slug]=${this.similar}&_limit=4`)
                if (Number(status) === 200) {
                    this.previews = data.filter(item => Number(item.id) !== this.idProduct)
                }
            } else {
                const {status, data} = await this.$axios.get(`/products?_where[catalog.slug]=${this.params.slugs}&_where[catalog_element.slug]=${this.params.group}&_where[PreviewBlock]=true`)
                if (Number(status) === 200) {
                    this.previews = data
                }
            }
        },
        computed: {
            ...mapState({
                user: state => state.user
            }),
            catalogItem() {
                console.log(this.params.catalogs)
                const [item] = this.params.catalogs
                return item
            },
            url() {
                let end = this.params.group ? this.params.group : ''
                return '/catalog/'+ this.params.slugs +'/'+ end
            }
        },
        methods: {
            carousel() {
                setTimeout(() => {
                    const swiper = new Swiper(this.$refs.previewCarousel, {
                        pagination: {
                            el: this.$refs.previewPagination,
                            type: "bullets",
                            clickable: true,
                        },
                        breakpoints: {
                            0: {
                                slidesPerView: 1,
                            },
                            992: {
                                slidesPerView: 2,
                            },
                            1240: {
                                slidesPerView: 3,
                            },
                        },
                        init: false,
                    });

                    const isBulltes = () => {
                        if (swiper.pagination.bullets.length > 1) {
                            swiper.pagination.el.style.display = "flex"
                        } else {
                            swiper.pagination.el.style.display = "none"
                        }
                    }

                    swiper.on('init', isBulltes)
                    swiper.on('resize', isBulltes)

                    swiper.init();
                },0)
            }
        },
        mounted() {
            this.carousel()
            this.load = true
        },
        beforeUpdate() {
            this.carousel()
        }
    }
</script>

<style lang="scss">
  .preview-block {
    &__carousel{
      padding-left: 15px;
      padding-right: 10px;
    }
    .splide__list{
      .splide__slide{
        & + .splide__slide{
          .preview-block__product{
            @media (min-width: 992px) {
              border-left: 2px solid #f5f5f5;
            }
          }
        }
      }
    }
  }
</style>