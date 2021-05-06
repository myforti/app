<template>
  <Fragment>
    <div ref="cardCarousel" class="swiper-container card-img__carousel">
      <div class="swiper-wrapper">
        <div v-for="image of product.images" class="swiper-slide" >
          <div :key="image.id" :style="{backgroundImage: `url(${backURL+image.url})`}" class="card-img__preview"></div>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
    <div class="swiper-container card-img__carousel--thumbs">
      <div ref="thumbWrapper" class="swiper-wrapper">
        <div v-for="image of product.images" class="swiper-slide" >
          <div :key="image.id" :style="{backgroundImage: `url(${backURL+image.url})`}" class="card-img__preview"></div>
        </div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
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
        setTimeout(() => {


        const heigthWrapper = () => {
          this.$refs.thumbWrapper.style.height =  `${this.$refs.cardCarousel.offsetHeight}px`
        }
        heigthWrapper()
        const galleryThumbs = new Swiper('.card-img__carousel--thumbs', {
          direction: 'vertical',
          spaceBetween: 10,
          slidesPerView: 3,
          navigation: {
            nextEl: '.card-img__carousel--thumbs .swiper-button-next',
            prevEl: '.card-img__carousel--thumbs .swiper-button-prev',
          },
          //freeMode: true,
          //watchSlidesVisibility: true,
          //watchSlidesProgress: true,
        });
        const galleryTop = new Swiper('.card-img__carousel', {
          spaceBetween: 10,
          navigation: {
            nextEl: '.card-img .swiper-pagination',
            prevEl: '.card-img .swiper-button-prev',
          },
          pagination: {
            el: '.card-img__carousel .swiper-pagination',
            type: "bullets",
            clickable: true,
          },
          thumbs: {
            swiper: galleryThumbs
          }
        });

        window.addEventListener('resize', heigthWrapper)
        }, 0)
    }
  }
</script>

<style lang="scss">
.card-img__carousel--thumbs{
  position: relative;
  .swiper-pagination{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    width: auto;
    span{
      margin-left: 0 !important;
      border-color: #655c9c !important;
      & + span{
        margin-top: 10px;
      }
      &.swiper-pagination-bullet-active{
        background-color: #655c9c !important;
      }
    }
  }
  [class^="swiper-button"] {
    position: absolute;
    left: 50%;
    margin-left: -15px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: #352e5f;
    border-radius: 50%;
    opacity: 1 !important;
    z-index: 10;
    &.swiper-button-disabled{
      opacity: .5 !important;
    }
    &:hover{
      cursor: pointer;
    }
    &::before{
      display: none;
    }
    &::after{
      content: '';
      width: 10px;
      height: 10px;
      border-left: 1px solid #fff;
      border-bottom: 1px solid #fff;
    }
  }
  .swiper-button-prev{
    top: 20px;
    &::after{
      transform: rotate(135deg);
      margin-bottom: -3px;
    }
  }
  .swiper-button-next{
    bottom: 20px;
    &::after{
      transform: rotate(135deg);
      margin-bottom: -3px;
    }
  }
}
</style>
