<template>
  <div>
    <Breadcrumbs :chain="[{name: 'Главная', url: '/'}, {name: 'мои заказы', url: ''}]" />
    <div class="basket__block">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="preview-block preview-block__transparent">
              <div class="preview-block__title">
                <h3>Мои заказы</h3>
              </div>
              <div class="row justify-content-center">
                <div class="col-lg-3">
                  <nav class="aside-nav">
                    <LkMenu />
                    <div class="open-nav"></div>
                  </nav>
                </div>
                <div class="col-lg-9">
                  <div class="lk lk__my-orders">
                    <div class="lk__title">
                      Мои заказы
                    </div>
                    <div class="lk__content">
                      <table v-if="myOrders.length" class="my-orders--table">
                        <tbody>
                          <tr>
                            <th>Дата</th>
                            <th>Позиций</th>
                            <th>Сумма</th>
                            <th>Статус заказа</th>
                            <th></th>
                          </tr>
                          <template v-for="order of myOrders">
                            <tr :key="order.id">
                              <td @click="openDettail" data-label="Дата" class="td">{{$moment(order.created_at).format('DD.MM.YYYY')}}</td>
                              <td @click="openDettail" data-label="Позиций" class="td">{{order.count}} шт.</td>
                              <td @click="openDettail" data-label="Сумма" class="td">{{Number(order.summary).toLocaleString('ru')}} $</td>
                              <td @click="openDettail" data-label="Статус заказа" class="td">{{statusOrder(order.statusOrder)}}</td>
                              <td @click="openDettail" class="td"><div data-chevron-open="" class="chevron">Подробнее о заказе</div></td>
                            </tr>
                            <tr v-if="order.productsOrder.length" class="opening">
                              <td colspan="5">
                                <table>
                                  <tbody>
                                    <tr v-for="product of order.productsOrder" :key="product.id">
                                      <td>{{product.name}}</td>
                                      <td>{{product.sku}}</td>
                                      <td><div class="functiononal">{{product.functions ? product.functions : 'Не задано.'}}</div></td>
                                      <td>{{product.count}} шт</td>
                                      <td v-if="Number(product.price) !== 0">{{Number(product.priceCount).toLocaleString('ru')}} $</td>
                                      <td v-else>Цена по запросу</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </template>
                          </tbody>
                        </table>
                      <EmptyData v-else />
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
  import EmptyData from '~/components/UI/empty-data'

  export default {
    name: "myOrdersPage",
    components: {LkMenu, Breadcrumbs, EmptyData},
    async fetch() {
      const { store } = this.$nuxt.context
      await store.dispatch('fetchMyOrders', store.state.user.id)
    },
    computed: {
      ...mapState({
        myOrders: state => state.myOrders
      }),
    },
    methods:{
      statusOrder(value) {
        let status = ''
        if (value === 'O') {
          status = 'Ожидает оплаты'
        } else if (value === 'D') {
          status = 'Выполняется доставка'
        } else if (value === 'Z') {
          status = 'Заказ выполнен'
        }
        return status
      },
      openDettail(e) {
        let target = e.currentTarget
        if (target.parentNode.classList.contains('open')) {
          target.parentNode.classList.remove('open')
        } else {
          target.parentNode.classList.add('open')
        }
      }
    }
  }
</script>
