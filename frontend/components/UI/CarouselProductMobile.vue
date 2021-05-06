<template>
  <Fragment>
    <div class="swiper-container card-img__carousel--mobile">
      <div class="swiper-wrapper" >
        <div v-for="image of product.images" class="swiper-slide" >
          <div :key="image.id" :style="{backgroundImage: `url(${backURL+image.url})`}" class="card-img__preview"></div>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"></div>
    </div>
  </Fragment>
</template>

<script>
  import Swiper from "swiper";
  import { Fragment } from 'vue-fragment'

  export default {
    name: "CarouselProduct",
    props:{
      product: {
        type: Object,
        required: true
      }
    },
    components:{
      Fragment
    },
    data: () => ({
      backURL: process.env.backURL,
    }),
    mounted() {
        const galleryTMobile = new Swiper('.card-img__carousel--mobile', {
          spaceBetween: 10,
          pagination: {
            el: '.card-img__carousel--mobile .swiper-pagination',
            type: "bullets",
            clickable: true,
          },
        });
      }
  }
</script>
