<template>
    <div ref="carousel" class="swiper-container">
        <div class="swiper-wrapper">
            <div v-for="item of items" class="swiper-slide">
                <CardNews :new-item="item" />
            </div>
        </div>
        <div ref="carouselPagination" class="swiper-pagination"></div>
    </div>
</template>
<script>
    import Swiper, { Navigation, Pagination, Thumbs } from "swiper";
    Swiper.use([Navigation, Pagination, Thumbs]);
    import CardNews from "~/components/UI/CardNews"
    export default {
        name: 'CarouselNews',
        props: {
            items: {
                type: Array
            }
        },
        components: {
            CardNews
        },
        methods: {
            carousel() {
                const swiper = new Swiper(this.$refs.carousel, {
                    spaceBetween: 10,
                    pagination: {
                        el: this.$refs.carouselPagination,
                        type: "bullets",
                        clickable: true,
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        767: {
                            slidesPerView: 2,
                        },
                        1200: {
                            slidesPerView: 3,
                        },
                    },
                });
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