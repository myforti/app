<template>
  <div>
    <Breadcrumbs :chain="chains" />
    <div class="basket__block">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="preview-block preview-block__transparent">
              <div class="preview-block__title">
                <h3>Избранное</h3>
              </div>
              <div  class="row justify-content-center">
                <div class="col-lg-3">
                  <nav class="aside-nav">
                    <LkMenu />
                    <div class="open-nav"></div>
                  </nav>
                </div>
                <div class="col-lg-9">
                  <div class="lk lk__favorites">
                    <div class="lk__title">
                      Избранное
                    </div>
                    <div v-if="userFavorites.length" class="lk__content">
                      <div class="row no-gutters">
                        <div v-for="favorit of favorites" class="col-lg-6">
                          <div class="preview-block__product">
                            <template v-if="favorit.images.length">
                              <div class="preview-block__img">
                                <nuxt-link :style="{backgroundImage: `url(${backURL + JSON.parse(JSON.stringify(favorit.images)).shift().url})`}" :to="`/catalog/${favorit.catalog.slug}/${favorit.catalog_element.slug}/`+favorit.slug">
                                  <span v-if="favorit.sale" class="sale">-{{favorit.sale}}%</span>
                                  <newIcon :class="favorit.sale ? 'offset' : ''" v-if="favorit.new" />
                                  <iconFavorite :id="Number(favorit.id)" />
                                </nuxt-link>
                              </div>
                            </template>
                            <template v-else>
                              <div class="preview-block__img">
                                <nuxt-link style="background-image: url(/no-image.jpg);" :to="`/catalog/${favorit.catalog.slug}/${favorit.catalog_element.slug}/`+favorit.slug">
                                  <span v-if="favorit.sale" class="sale">-{{favorit.sale}}%</span>
                                  <newIcon :class="favorit.sale ? 'offset' : ''" v-if="favorit.new" />
                                  <iconFavorite :id="Number(favorit.id)" />
                                </nuxt-link>
                              </div>
                            </template>

                            <div class="preview-block__text">
                              <div class="preview-block__text--top">
                                <h4><nuxt-link :to="`/catalog/${favorit.catalog.slug}/${favorit.catalog_element.slug}/`+favorit.slug">{{favorit.name}}</nuxt-link></h4>
                                <p v-if="favorit.filters.length">
                                  <span v-for="filter of favorit.filters">{{filter.name}} <br></span>
                                </p>
                              </div>
                              <div class="preview-block__text--bottom">
                                <div class="price">
                                  <div v-if="favorit.price_old" class="price-old">{{Number(favorit.price_old).toLocaleString('ru-RU')}} $</div>
                                  <b>{{Number(favorit.price).toLocaleString('ru-RU')}} $</b>
                                </div>
                                <div class="button">
                                  <BasketButton :icon="true" :id="Number(favorit.id)" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="alert-user">
                      <div class="row justify-content-center">
                        <div class="col-lg-8">
                          <h3>Пока здесь ничего нет</h3>
                          <p>Войдите, если уже добавляли товары в своем аккаунте или добавьте новые из каталога</p>
                          <div class="group-btn">
                            <a href="#" class="btn btn-primary">Перейти в каталог</a>
                            <a href="#" class="btn btn-outline btn-outline--primary">Войти</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
  import Breadcrumbs from "~/components/UI/Breadcrumbs";
  import LkMenu from "~/components/UI/LkMenu";
  import iconFavorite from "~/components/UI/iconFavorite";
  import newIcon from "~/components/UI/newIcon";
  import BasketButton from "~/components/UI/BasketButton"
  export default {
    name: 'favoritesPage',
    middleware: ['auth'],
    components: {
      Breadcrumbs,
      LkMenu,
      iconFavorite,
      newIcon,
      BasketButton
    },
    data: () => ({
      backURL: process.env.backURL,
      chains:[
        {name: 'Главная', url: '/'},
        {name: 'Избранное', url: ''},
      ]
    }),
    computed: {
      ...mapState({
        userFavorites: state => state.user.favorites,
        favorites: state => state.catalog.catalogFavorite
      })
    }
  }
</script>
