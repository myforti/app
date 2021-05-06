<template>
  <div>
    <div  v-if="productOnly">
      <Breadcrumbs :chain="chains" />
      <div class="padding"></div>
      <Loader />
      <div v-if="load" class="container">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="row">
                <div class="col-xl-7 col-lg-5">
                  <div class="card-text">

                    <h3>{{productOnly.name}}</h3>
                    <span v-if="productOnly.sku">{{productOnly.sku}}</span>

                    <div class="d-lg-none">
                      <template v-if="productOnly.images.length">
                        <CarouselProductMobile :product="productOnly" />
                      </template>
                      <template v-else>
                        <div style="background-image: url('/no-image.jpg');" class="card-img__preview no-image"></div>
                      </template>
                    </div>

                    <p v-html="productOnly.description"></p>
                    <div :class="user ? 'card__group-control--heart' : ''" class="card__group-control">
                      <div class="price">{{Number(productOnly.price).toLocaleString('ru')}} $</div>
                      <Counter v-if="updateButton" :ids="Number(productOnly.id)" />
                      <BasketButton :id="Number(productOnly.id)" />
                      <IconFavorite v-if="user" :id="productOnly.id" />
                    </div>
                  </div>
                </div>
                <div class="col-xl-5 col-lg-7 d-none d-lg-block">
                  <div v-if="productOnly.images.length" class="card-img">

                    <CarouselProduct :product="productOnly" />

                  </div>
                  <div v-else class="card-img">
                    <div style="background-image: url('/no-image.jpg');" class="card-img__preview no-image"></div>
                  </div>
                </div>
                <div v-if="productOnly"  class="col">
                  <div v-if="productOnly.detailed_information || productOnly.characteristics.length" class="card-poperties">
                    <div class="tabs d-none d-md-block">
                      <div class="tabs__controls">
                        <div v-if="productOnly.detailed_information" @click="tab('tab1')" :class="tabActive === 'tab1' ? 'active' : ''"  class="tabs__controls-item">
                          <span>Подробная информация</span>
                        </div>
                        <div v-if="productOnly.characteristics.length" @click="tab('tab2')" :class="tabActive === 'tab2' ? 'active' : ''" class="tabs__controls-item">
                          <span>Технические характеристики</span>
                        </div>
                      </div>
                      <div class="tabs__content">
                        <div v-if="tabActive === 'tab1'" class="tabs__content-item active" data-tabs-id="id1">
                          <div class="row">
                            <div v-if="productOnly.detailed_information" v-html="compilerMarked(productOnly.detailed_information)" class="col-lg-6">
                            </div>
                            <div v-if="productOnly.files.length" class="col-lg-6">
                              <template v-for="file of productOnly.files">
                                <a :key="file.id" :href="backURL+file.files.url" download target="_blank" class="download">{{file.name}}</a>
                                <br>
                                <br>
                              </template>

                            </div>
                          </div>

                        </div>
                        <div v-if="tabActive === 'tab2'" class="tabs__content-item active" data-tabs-id="id2">
                          <div class="row">
                            <div class="col-lg-6">
                              <div v-if="productOnly.characteristics.length" class="properties-list">
                                <div v-for="characteristic of productOnly.characteristics" class="properties-list__item">
                                  <span>{{characteristic.name}}</span>
                                  <span>{{characteristic.value}}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="d-md-none">
                      <div  class="drop-down__list">
                        <div :class="info ? 'active' : ''" class="drop-down__list-item">
                          <div @click="info = !info" class="drop-down__list--title">
                            <span>Подробная информация</span>
                          </div>
                          <div v-if="productOnly.detailed_information"  class="drop-down__list--content">
                            <div v-html="compilerMarked(productOnly.detailed_information)"></div>
                            <div v-if="productOnly.files.length" class="pt-3">
                              <template v-for="file of productOnly.files">
                                <a :key="file.id" :href="backURL+file.files.url" download target="_blank" class="download">{{file.name}}</a>
                                <br>
                                <br>
                              </template>

                            </div>
                          </div>
                        </div>
                        <div :class="charaster ? 'active' : ''" class="drop-down__list-item">
                          <div @click="charaster = !charaster" class="drop-down__list--title">
                            <span>Технические характеристики</span>
                          </div>
                          <div class="drop-down__list--content">
                            <div v-if="productOnly.characteristics.length" class="properties-list">
                              <div v-for="characteristic of productOnly.characteristics" class="properties-list__item">
                                <span>{{characteristic.name}}</span>
                                <span>{{characteristic.value}}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <PreviewBlock :id-product="Number(productOnly.id)" :params="{name: 'С этим заказывают', slugs: productOnly.catalog.slug }" :similar="productOnly.catalog.slug" />

                  <br><br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import marked from "marked"
  import Swiper, { Navigation, Pagination, Thumbs } from "swiper";
  import Breadcrumbs from "~/components/UI/Breadcrumbs"
  import CarouselProduct from "~/components/UI/CarouselProduct";
  import CarouselProductMobile from "~/components/UI/CarouselProductMobile";
  import BasketButton from "~/components/UI/BasketButton";
  import Counter from "~/components/UI/Incriment";
  import IconFavorite from "~/components/UI/iconFavorite"
  import PreviewBlock from "~/components/PreviewBlock"
  import Loader from "~/components/UI/loader"
  Swiper.use([Navigation, Pagination, Thumbs]);

  export default {
    name: "productInnerPage",
    components: {
      CarouselProduct,
      Breadcrumbs,
      CarouselProductMobile,
      BasketButton,
      Counter,
      IconFavorite,
      PreviewBlock,
      Loader
    },
    head() {
      return {
        title: this.productOnly.name,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.productOnly.metaDescription ? this.productOnly.metaDescription : this.settings.metaDescription
          },
          {
            hid: 'key',
            name: 'key',
            content: this.productOnly.metaKey ? this.productOnly.metaKey : this.settings.metaKey
          }
        ]
      }
    },
    async fetch() {
      const { store, route } = this.$nuxt.context
      const { status, data } = await this.$axios.get(`/products?_where[slug]=${route.params.id}`)
      if (status === 200) {
        const [item] = data
        this.productOnly = item
      }
    },
    data: () => ({
      backURL: process.env.backURL,
      tabActive: 'tab1',
      info: false,
      charaster: false,
      productOnly: '',
      load: false,
      updateButton: false
    }),
    computed:{
      ...mapState({
        user: state => state.user,
        settings: state => state.settings
      }),
      chains() {
        if (this.productOnly.length === 0) return false
        return [
          {
            name: 'Главная',
            url: '/'
          },
          {
            name: 'каталог',
            url: '/catalog'
          },
        ]
      },
    },
    methods:{
      tab(tab){
        this.tabActive = tab
      },
      compilerMarked(data) {
        return marked(data)
      }
    },
    mounted() {
      this.load = true,
              this.$nuxt.$on('updateButtonBasket', value => {
                this.updateButton = value
              })
    },
  }
</script>

<style lang="scss">
  .padding{
    padding-top: 40px;
  }
</style>
