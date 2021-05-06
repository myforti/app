<template>
  <Fragment>
    <template v-if="template">
      <div @click.prevent="basketDelete" :class="isBasket || isActive ? 'no-empty' : 'empty'" class="backet">
        <svg>
          <use xlink:href="#backet-svg"></use>
        </svg>
      </div>
    </template>
    <template v-else-if="icon">
      <a v-html="isCartIcon" @click.prevent="Number(countClick) === 1 ? basket() : basketDelete()" href="#" :class="isClass" class="btn btn-icons btn-icons--cart">
      </a>
    </template>
    <template v-else>
      <a @click.prevent="Number(countClick) === 1 ? basket() : basketDelete()" href="#" :class="isClass" class="btn">
        {{isBasket || isActive ? 'Убрать' : 'В корзину'}}
      </a>
    </template>
  </Fragment>
</template>

<script>
  import { mapState } from "vuex"
  import { Fragment } from "vue-fragment"
  export default {
    name: 'BasketButton',
    props: {
      id: {
        type: Number,
        required: true
      },
      template: {
        type: Boolean
      },
      icon: {
        type: Boolean
      }
    },
    components:{
      Fragment
    },
    middleware: ['auth'],
    async fetch() {
      let { $cookies, store } = this.$nuxt.context
      if ($cookies.get('_bs') && $cookies.get('_bs').length) {
        let params = ''
        $cookies.get('_bs').forEach(item => {
          params += `&id_in=${item}`
        })

        await store.dispatch('catalog/FetchProductBasket', params)
      }
    },
    data: () => ({
      isActive: false
    }),
    computed:{
      ...mapState({
        BASKET: state => state.catalog.basket
      }),
      isClass() {
        if (this.isBasket || this.isActive) {
          this.countClick = 2
          return 'btn-accent'
        } else {
          this.countClick = 1
          return 'btn-primary'
        }
      },
      isBasket() {
        let active = false
        this.isActive = false
        if (this.$cookies.get('_bs') && this.BASKET) {
          this.BASKET.forEach(item => {
            if (Number(item.id) === this.id) {
              active = true
              this.isActive = true
            }
          })
        }
        return active
      },
      isCartIcon() {
        if (this.isBasket || this.isActive) {
          return `<svg class="icon"><use xlink:href="#basket-white-svg"></use></svg>`
        } else {
          return `<svg class="icon"><use xlink:href="#cart--svg"></use></svg>`
        }
      }
    },
    data: () => ({
      countClick: 1
    }),
    methods:{
      async basket() {
        if (this.countClick === 1) {
          this.countClick++
        }
        this.isActive = true
        let params = ''
        if (this.$cookies.get('_bs')) {
          this.$cookies.set('_bs', [...new Set([...this.$cookies.get('_bs'), this.id])])
        } else {
          this.$cookies.set('_bs', [this.id])
        }
        this.$cookies.get('_bs').forEach(item => {
          params += `&id_in=${item}`
        })

        await this.$store.dispatch('catalog/FetchProductBasket', params)
        this.$nuxt.$emit('updateButtonBasket', true)

        this.$yandexMetrika.reachGoal('748970626')
      },
      async basketDelete() {
        if (this.countClick === 2) {
          this.countClick = 1
        }
        let params = ''
        await this.$cookies.set('_bs', this.$cookies.get('_bs').filter(item => Number(item) !== this.id))
        await this.$cookies.get('_bs').forEach(item => {
          params += `&id_in=${item}`
        })
        if (params.length){
          await this.$store.dispatch('catalog/FetchProductBasket', params)
        } else {
         await this.$store.commit('catalog/BASKET', '')
        }
        if (this.BASKET.length === 0) {
          this.$cookies.remove('test')
        }
        this.$nuxt.$emit('updateButtonBasket', false)
      }
    },
  }
</script>

<style lang="scss">
  .btn-icons .icon{
    fill: #101622 !important;
    stroke: #101622 !important;
  }
</style>
