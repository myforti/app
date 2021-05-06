<template>
  <div>
    <Breadcrumbs :chain="[{name: 'Главная', url: '/'}, {name: 'Корзина', url: ''}]" />
    <div v-if="basket" class="basket__block">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="preview-block preview-block__transparent">
              <div class="preview-block__title">
                <h3>Корзина ({{basket.length}})</h3>
                <a @click.prevent="cleanBasket" class="basket__clean" href="#">Очистить</a>
              </div>
              <div class="row justify-content-center">
                <div class="col-xl-9">
                  <div class="basket__wrapper">
                    <div class="basket__title">
                        <div class="basket__checkbox">
                            <label>
                                <input @change="allSelected" v-model="allCheck" type="checkbox">
                                <span class="cust-checkbox"></span>
                                <span class="text">Выбрать все</span>
                            </label>
                        </div>

                        <a v-if="check.length" @click.prevent="deleteBasketItem" href="#">Удалить выбранные</a>
                    </div>
                    <div class="basket__content">
                      <table>
                        <tbody>
                        <tr v-for="item of basket" :key="item.id">
                          <td class="checkbox-td">
                              <div class="basket__checkbox">
                                  <label>
                                      <input @change="onlyCheck" type="checkbox" v-model="check" :value="item.id">
                                      <span class="cust-checkbox"></span>
                                  </label>
                              </div>
                          </td>
                          <td class="image-td">
                            <div v-if="item.images.length" class="basket__image">
                              <template v-for="(image, index) of item.images">
                                <a :key="image.if" v-if="index === 0" :style="{backgroundImage: `url(${backURL+image.url})`}" >
                                  <iconFavorite :id="Number(item.id)" />
                                </a>
                              </template>

                            </div>
                            <div v-else class="basket__image">
                              <a style="background-image: url('/no-image.jpg');" >
                                <iconFavorite :id="Number(item.id)" />
                              </a>
                            </div>
                          </td>
                          <td class="desc-td">
                            <div class="basket__desc">
                              <h3><nuxt-link :to="`/catalog/${item.catalog.slug}/${item.catalog_element.slug}/${item.slug}`">{{item.name}}</nuxt-link></h3>
                              <p v-if="item.filters">
                                <template v-for="(filter, index) of item.filters">
                                  <span v-if="index === 0">
                                    {{filter.name}}
                                  </span>
                                  <span v-else>
                                    ,{{filter.name}}
                                  </span>
                                </template>
                              </p>
                            </div>
                          </td>
                          <td class="count-td">
                            <Counter :ids="Number(item.id)" />
                          </td>
                          <td class="price-td">
                            <div class="basket__price">
                              <div v-if="Number(item.price_old) !== 0" class="price-old">{{Number(item.price_old).toLocaleString('ru')}} $</div>
                              <b v-if="Number(item.price) > 0">{{Number(item.price).toLocaleString('ru')}} $</b>
                              <p v-else>Цена по запросу</p>
                            </div>
                          </td>
                          <td class="mobile-control-td">
                            <div class="favarites-heart__block">
                              <div class="favorites">
                                <a class="remove__link" @click.prevent="delItemBasket(item.id)" href="#">Удалить</a>
                              </div>
                              <div class="heart__block">
                                <iconFavorite :id="Number(item.id)" />
                                <span>В избранном</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-md-6">
                  <div class="basket__info">
                    <div class="basket__info-item">
                      <p>
                        <span>Товары ({{basket.length}})</span>
                        <span>{{Number(summary).toLocaleString('ru')}} $ </span>
                      </p>
                      <p v-if="Number(salePrice) !== 0">
                        <span>Скидка</span>
                        <span>- {{Number(salePrice).toLocaleString('ru')}} $ </span>
                      </p>
                    </div>
                    <div class="basket__summary">
                      <div class="basket__summary-price">
                        <b>Итого</b>
                        <b>{{Number(summary).toLocaleString('ru')}} $ </b>
                      </div>
                      <div v-if="isNotPrice" class="alert-info">
                        Стоимость некоторых позиций не была учтена. Окончательную стоимость заказа вы сможете узнать у менеджера после оформления заявки.
                      </div>
                      <a href="#" @click.prevent="orderNext()" class="btn btn-accent">Оформить заказ</a>
                    </div>
                    <div class="promo-code">
                      <form>
                        <input type="text" placeholder="Промокод ">
                        <button class="btn btn-accent" disabled="">Применить</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <br>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <EmptyData />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex"
  import Breadcrumbs from "~/components/UI/Breadcrumbs";
  import iconFavorite from "~/components/UI/iconFavorite";
  import Counter from "~/components/UI/Incriment";
  import EmptyData from "~/components/UI/empty-data"
  export default {
    name: "basket",
    components:{
      Breadcrumbs,
      iconFavorite,
      Counter,
      EmptyData
    },
    //middleware: ['auth'],
    computed:{
      ...mapState({
        basket: state => state.catalog.basket
      }),
      ...mapGetters({
        summary: ['catalog/basketSummaryGETTERS']
      }),
      isNotPrice() {
        let is = false
        this.basket.forEach(item => {
          if (Number(item.price) === 0) {
            is = true
          }
        })
        return is
      },
      salePrice() {
        let summary = 0
        this.basket.forEach(item => {
          if (Number(item.sale) !== 0) {
            summary = (summary + (Number(item.price_old) * Number(item.sale)) / 100) * Number(item.count)
          }
        })
        return summary.toFixed(0).toLocaleString('ru')
      }
    },
    data: () => ({
      backURL: process.env.backURL,
      check: [],
      allCheck: false
    }),
    methods:{
      orderNext() {
        if (!this.$cookies.get("_us") && !this.$cookies.get("_ui")) {
          this.$router.push('?auth=login')
          return false
        } else {
          this.$router.push('/order')
        }
        this.$yandexMetrika.reachGoal('7489706218')
      },
      highlight() {
        if (!this.allValue) {
          this.checkboxValues = []
        } else {
          this.basket.forEach(item => {
            this.checkboxValues.push(item.id)
          })
        }
      },
      allSelected() {
        if (this.allCheck) {
          this.check = this.basket.map(item => item.id)
        } else {
          this.check = []
        }
      },
      onlyCheck() {
        if (this.check.length < this.basket.length) {
          this.allCheck = false
        }
      },
      async deleteBasketItem() {
        let params = ''
        await this.$cookies.set('_bs', this.$cookies.get('_bs').filter(item => this.check.includes(item) !== true))
        await this.$cookies.get('_bs').forEach(item => {
          params += `&id_in=${item}`
        })

        if (params.length){
          await this.$store.dispatch('catalog/FetchProductBasket', params)
        } else {
         await this.$store.commit('catalog/BASKET', '')
        }
        if (this.basket.length === 0) {
          this.$cookies.remove('test')
        }

        this.check = []
       
      },
      async cleanBasket() {
        await this.$store.dispatch('catalog/FetchProductBasket', '')
        await this.$store.commit('catalog/BASKET', '')
        this.$cookies.remove('_bs')
        this.$cookies.remove('test')
      },
      async delItemBasket(id){
        let params = ''
        await this.$cookies.set('_bs', this.$cookies.get('_bs').filter(item => Number(item) !== id))
        await this.$cookies.get('_bs').forEach(item => {
          params += `&id_in=${item}`
        })
        if (params.length){
          await this.$store.dispatch('catalog/FetchProductBasket', params)
        } else {
         await this.$store.commit('catalog/BASKET', '')
        }
        if (this.basket.length === 0) {
          this.$cookies.remove('test')
        }
      }
    },
    
    beforeUpdate() {
      if (this.check.length === this.basket.length) {
        this.allCheck = true
      }
    }
  }
</script>


<style lang="scss">
  .basket__title{
    a{
      margin-left: 20px;
    }
  }
</style>