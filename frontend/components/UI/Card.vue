<template>
  <div :class="addClass ? addClass : ''" v-if="product && product.catalog !== null" class="preview-block__product">
    <div v-if="product.images && product.images.length" class="preview-block__img">
        <nuxt-link :style="{backgroundImage: `url(${backURL + firstImage.url})`}" :to="'/catalog/'+product.catalog.slug+'/'+product.catalog_element.slug+'/'+product.slug">
          <newIcon v-if="product.new === 'Y'" />
          <span v-if="product.sale" class="sale">-{{product.sale}}%</span>
        </nuxt-link>
      <iconFavorite v-if="user !== null" :id="Number(product.id)" />
    </div>
    <div v-else class="preview-block__img">
      <nuxt-link :style="{backgroundImage: `url(/no-image.jpg)`}" :to="'/catalog/'+product.catalog.slug+'/'+product.catalog_element.slug+'/'+product.slug">
        <newIcon v-if="product.new === 'Y'" />
        <span v-if="product.sale" class="sale">-{{product.sale}}%</span>
      </nuxt-link>
      <iconFavorite v-if="user !== null" :id="Number(product.id)" />
    </div>
    <div class="preview-block__text">
      <div class="preview-block__text--top">
        <h4><nuxt-link :to="'/catalog/'+product.catalog.slug+'/'+product.catalog_element.slug+'/'+product.slug">{{product.name}}</nuxt-link></h4>
        <template v-if="product.filters">
            <p>
              <template v-for="filter of product.filters">
                <span :key="filter.id">{{filter.name}}</span> <br>
              </template>
            </p>
        </template>
      </div>
      <div class="preview-block__text--bottom">
        <div class="price">
          <div v-if="Number(product.price_old) !== 0" class="price-old">{{Number(product.price_old).toLocaleString('ru')}} $</div>
          <b v-if="Number(product.price) !== 0">{{Number(product.price).toLocaleString('ru-RU')}} $</b>
          <b v-else >Цена по запросу</b>
        </div>
        <div class="button">
          <BasketButton :id="Number(product.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import newIcon from "~/components/UI/newIcon";
  import iconFavorite from "~/components/UI/iconFavorite";
  import BasketButton from "~/components/UI/BasketButton";
  export default {
    name: "CardProducts",
    props:{
      product: {
        type: Object,
      },
      addClass:{
        type: String
      },
      params: {
        type: String
      }
    },
    components: {
      newIcon, iconFavorite, BasketButton, mapState
    },
    data: () => ({
      backURL: process.env.backURL
    }),
    computed: {
      ...mapState({
        user: state => state.user
      }),
      firstImage() {
        const copyProduct = JSON.parse(JSON.stringify(this.product.images))
        return copyProduct.length ? copyProduct.shift() : ''
      },
      isUser() {
        let is = false
        if (this.user !== null) {
          is = true
        }
        return is
      },
      resultParams() {
        return this.params ? '/catalog/'+this.params + '/' : '/product/'
      }
    }
  }
</script>
