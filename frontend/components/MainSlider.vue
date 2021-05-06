<template>
    <div v-if="mainCarousel.length" class="main-carousel">
        <Loader />
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div ref="carousel" class="swiper-container main-carousel--swiper">
                        <div class="swiper-wrapper" >
                            <div v-for="item of mainCarousel" class="swiper-slide" :key="item.id">
                                <div v-if="load" class="main-carousel__item"
                                     :style="{backgroundImage: `url(${backURL+item.background.url})`, color: item.color}"
                                >
                                    <div class="row align-items-center">
                                        <div class="col-lg-6 col-sm-12">
                                            <div class="main-carousel__text">
                                                <h3>{{item.title}}</h3>
                                                <p>{{item.description}}</p>
                                                <nuxt-link @click.native="$yandexMetrika.reachGoal('748970622')" :to="item.link" class="btn btn-accent">Подробнее</nuxt-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div ref="pagination" class="swiper-pagination"></div>

                        <div ref="prev" class="swiper-button swiper-button-prev"></div>
                        <div ref="next" class="swiper-button swiper-button-next"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper, { Navigation, Pagination, Thumbs } from "swiper";
    Swiper.use([Navigation, Pagination, Thumbs]);
    import Loader from "~/components/UI/loader"
    export default {
        name: "MainSlider",
        async fetch() {
            const { status, data } = await this.$axios.get('/sliders?_sort=published_at:ASC')
            if (Number(status) === 200) {
                console.log(data);
                this.mainCarousel = data.sort((a, b) => {
                    if (a.index < b.index) {
                        return -1
                    } else {
                        return 1
                    }
                })
            }
        },
        components: {
            Loader
        },
        data: () => ({
            mainCarousel: [],
            backURL: process.env.backURL,
            load: false
        }),
        methods:{
            carousel() {
                setTimeout(() => {
                    new Swiper(this.$refs.carousel, {
                        pagination: {
                            el: this.$refs.pagination,
                            type: "bullets",
                            clickable: true,
                        },
                        navigation: {
                            nextEl: this.$refs.next,
                            prevEl: this.$refs.prev,
                        },
                    });
                }, 0)
            }
        },
        mounted() {
            this.carousel()
            this.load = true
        },
        beforeUpdate(){
            this.carousel()
        }
    }
</script>