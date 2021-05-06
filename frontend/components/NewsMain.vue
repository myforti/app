<template>
    <div v-if="newsLimit.length" class="container">
        <div class="row">
            <div class="col-12">
                <div class="preview-block preview-block__transparent">
                    <div class="preview-block__title">
                        <h3>Новости</h3>
                        <nuxt-link to="/news">
                            Перейти в раздел
                            <span></span>
                        </nuxt-link>
                    </div>
                    <div class="row custom-row-10 d-none d-sm-flex">
                        <div v-for="item of newsLimit" class="col-xl-3 col-lg-4 col-md-6">
                            <CardNews :new-item="item" />
                        </div>
                    </div>
                    <div class="preview-block__carousel--news d-sm-none">
                        <div class="preview-block__wrapper">
                            <div ref="carousel" class="swiper-container">
                                <div class="swiper-wrapper">
                                    <div v-for="item of newsLimit" class="swiper-slide">
                                        <CardNews :new-item="item" />
                                    </div>
                                </div>
                            </div>
                            <div ref="pagination" class="swiper-pagination"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper, { Navigation, Pagination, Thumbs } from "swiper";
    Swiper.use([Navigation, Pagination, Thumbs]);
    import CardNews from "~/components/UI/CardNews"
    export default {
        name: 'NewsMain',
        components: {
            CardNews
        },
        data: () => ({
           newsLimit: []
        }),
        async fetch() {
            const { status, data } = await this.$axios.get('/news-lists?_limit=8')
            if (Number(status) === 200) {
                this.newsLimit = data
            }
        },
        methods: {
            carousel() {
                const swiper = new Swiper(this.$refs.carousel, {
                    spaceBetween: 10,
                    pagination: {
                        el: this.$refs.pagination,
                        type: "bullets",
                        clickable: true,
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        576: {
                            slidesPerView: 2,
                        },
                        992: {
                            slidesPerView: 3,
                        },
                        1240: {
                            slidesPerView: 4,
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
            }
        },
        mounted() {
            this.carousel()
        },
        beforeMount() {
            this.carousel()
        }
    }
</script>