<template>
    <div v-if="dataAll.length" class="column-aside column-aside--carousel d-lg-none">
        <div class="swiper-container">
            <div class="swiper-wrapper" >
                <div v-for="stock of dataAll" class="swiper-slide">
                    <div class="acii-item">
                        <div v-if="stock.mainImage" class="acii-item__img">
                            <nuxt-link :style="{backgroundImage: `url('${backendURL+stock.mainImage.url}')`}" :to="'/stocks/' + stock.slug"></nuxt-link>
                        </div>
                        <div v-else class="acii-item__img">
                            <a style="background-image: url('/no-image.jpg');":to="'/stocks/' + stock.slug"></a>
                        </div>
                        <div :class="$moment() > $moment(stock.to) ? 'disabled' : ''" class="acii-item__date">
                            <template v-if="$moment() > $moment(stock.to)">
                                Акция завершена - {{$moment(stock.to).format('DD.MM.YYYY')}}
                            </template>
                            <template v-else >
                                {{$moment(stock.from).format('DD.MM.YYYY')}} - {{$moment(stock.to).format('DD.MM.YYYY')}}
                            </template>
                        </div>
                        <div class="acii-item__text">
                            <h3><nuxt-link :to="'/stocks/' + stock.slug">{{stock.title}}</nuxt-link></h3>
                            <nuxt-link :to="'/stocks/' + stock.slug" class="read">Подробнее...</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
    import Swiper, { Navigation, Pagination, Thumbs } from "swiper";
    Swiper.use([Navigation, Pagination, Thumbs]);
    export default {
        name: "stockCarousel",
        props: {
          dataAll: {
              type: Array
          }
        },
        data: () => ({
            backendURL: process.env.backURL
        }),
        mounted() {
            const swiper = new Swiper('.column-aside--carousel .swiper-container', {
                spaceBetween: 10,
                pagination: {
                    el: '.column-aside--carousel .swiper-container .swiper-pagination',
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
    }
</script>