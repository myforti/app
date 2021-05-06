<template>
  <div>
    <breadcrumbs :chain="[{name: 'Главная', url: '/'}, {name: 'корзина', url: '/basket'}, {name: 'оформление заказа', url: ''}]" />
    <div class="basket__block">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="preview-block preview-block__transparent">
              <div class="preview-block__title">
                <h3>Оформление заказа</h3>
                <div class="description">После оформления заказа наши менеджеры свяжутся с вами для уточнения деталей заказа и вариантов поставки продукции.</div>
              </div>
              <Loader />
              <template v-if="load">
                <template v-if="basket">
                  <div class="order-list">
                    <div class="order-list__title">Состав заказа</div>
                    <div class="order-list__content">
                      <table>
                        <tbody><tr>
                          <th>Наименование</th>
                          <th>Артикул</th>
                          <th>Линейка</th>
                          <th>Количество</th>
                          <th>Цена</th>
                        </tr>
                        <tr v-for="item of basket">
                          <td>
                            <div class="name">{{item.name}}</div>
                          </td>
                          <td>
                            <div v-if="item.sku" class="art">{{item.sku}}</div>
                            <div v-else class="art">Не найдено.</div>
                          </td>
                          <td>
                            <div v-if="'catalog' in item && item.catalog.name" class="functional">
                              {{item.catalog.name}}
                            </div>
                            <div v-else>
                              Не найдено.
                            </div>
                          </td>
                          <td>
                            <div class="col">{{item.count}} шт.</div>
                          </td>
                          <td>
                            <div v-if="Number(item.price) !== 0" class="price">{{Number(item.price).toLocaleString('ru')}} $</div>
                            <div v-else class="price"><p>Цена по запросу</p></div>
                          </td>
                        </tr>

                        </tbody>
                      </table>

                      <div class="order-list__content--summary">
                        <p>
                          {{basket.length}} {{ending}} на сумму: {{Number(summary).toLocaleString('ru')}} $ <br><template v-if="salePrice">Скидка: - {{Number(salePrice).toLocaleString('ru')}} $</template><template v-else>Скидка: 0 $</template>
                        </p>
                        <div v-if="isNotPrice" class="alert-info">
                          Стоимость некоторых позиций не была учтена. <br>Окончательную стоимость заказа  вы сможете узнать у менеджера после оформления заявки.
                        </div>
                        <b>Итого: {{Number(summary).toLocaleString('ru')}} $ </b>
                      </div>
                      <div class="order-list__content--replace">
                        <nuxt-link to="/basket">Изменить состав заказа</nuxt-link>
                      </div>
                    </div>
                  </div>
                  <div class="message-error" v-if="errors.payerOrganization !== false">{{errors.payerOrganization}}</div>
                  <div ref="payerBlock" :class="errors.payerOrganization !== false ? 'error-block':''" class="order-list">
                    <div class="order-list__title">Тип плательщика</div>
                    <div class="order-list__content">

                      <div class="tabs">
                        <div class="tabs__controls">
                          <div :class="Number(payerType) === 1 ? 'active' : ''" data-tabs-item="id1" class="tabs__controls-item">
                            <div class="radio-btn">
                              <label>
                                <input v-model="payerType" value="1" @click="errors.payerOrganization = false" type="radio" name="payer" checked="">
                                <div class="cust-radio"></div>
                                <div class="text">Юридическое лицо</div>
                              </label>
                            </div>
                          </div>
                          <div :class="Number(payerType) === 2 ? 'active' : ''" data-tabs-item="id2" class="tabs__controls-item">
                            <div class="radio-btn">
                              <label>
                                <input v-model="payerType" value="2" @click="errors.payerOrganization = false" type="radio" name="payer">
                                <div class="cust-radio"></div>
                                <div class="text">Физическое лицо</div>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div class="tabs__content">
                          <div v-if="Number(payerType) === 1" class="tabs__content-item active" data-tabs-id="id1">
                            <table class="organizer" v-if="user.organization.length">
                              <template v-for="(organization, index) of user.organization">
                                <template v-if="Number(user.organization.length) === 1" >
                                  <span style="display:none;">
                                    {{organization_id = organization.id}}
                                  </span>
                                  <tbody>
                                  <tr>
                                    <td>{{organization.name}}</td>
                                  </tr>
                                  <tr>
                                    <td class="inn">ИНН {{organization.inn}}</td>
                                  </tr>
                                  </tbody>
                                </template>
                                <template v-else>
                                  <tbody>
                                  <tr>
                                    <td rowspan="2">
                                      <div class="radio-btn">
                                        <label>
                                          <input type="radio" name="organiztion" v-model="organization_id" :value="organization.id" @click="errors.payerOrganization = false" :checked="index === 0">
                                          <div class="cust-radio"></div>
                                        </label>
                                      </div>
                                    </td>
                                    <td>{{organization.name}}</td>
                                  </tr>
                                  <tr>
                                    <td class="inn">ИНН {{organization.inn}}</td>
                                  </tr>
                                  </tbody>
                                </template>
                              </template>

                            </table>
                            <p v-else >Нет организаций.</p>
                            <div class="order-list__content--replace">
                              <template >
                                <a @click.prevent="$store.commit('ui/TYPEPOPUPS', {state: 'addOrganization', value: true})" href="#">Добавить организацию</a>
                                <template v-if="!Array.isArray(organization_id)" >
                                  <a @click.prevent="eventPopupUpdate(organization_id)" href="#">Редактировать организацию</a>
                                </template>
                              </template>
                            </div>
                          </div>
                          <div v-if="Number(payerType) === 2" class="tabs__content-item active" data-tabs-id="id2">
                            <table>
                              <tbody>
                              <tr>
                                <td><div class="th">Имя</div></td>
                                <td>{{user.username}}</td>
                              </tr>
                              <tr v-if="user.surname">
                                <td><div class="th">Фамилия</div></td>
                                <td>{{user.surname}}</td>
                              </tr>
                              <tr v-if="user.phone">
                                <td><div class="th">Телефон</div></td>
                                <td>{{user.phone}}</td>
                              </tr>
                              <tr v-if="user.email">
                                <td><div class="th">Электронная почта</div></td>
                                <td>{{user.email}}</td>
                              </tr>
                              <tr v-if="!user.phone" >
                                <td colspan="2">
                                  <div class="alert-info">Что бы сделать заказа, укажите свой телефон <nuxt-link to="/user/personal-data"><b>в личном кабинете</b></nuxt-link>.</div>
                                </td>
                              </tr>
                              </tbody></table>
                            <div class="order-list__content--replace">
                              <nuxt-link to="/user/personal-data">Изменить личные данные</nuxt-link>
                            </div>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>

                  <div class="message-error" v-if="errors.addresse !== false">{{errors.addresse}}</div>
                  <div ref="addresseBlock" :class="errors.addresse !== false ? 'error-block':''" class="order-list">
                    <div class="order-list__title">Адрес доставки</div>
                    <div class="order-list__content">
                      <template v-if="user.delivery_addresse.length">

                        <template v-for="(item, index) of addresse">
                          <template v-if="Number(addresse.length) === 1">
                            <span style="display:none;">
                              {{arrdesss_id = item.id}}
                            </span>
                            <div class="address">
                              {{item.index ? item.index + ',' : ''}} {{'г. '+item.city}}, {{'ул. '+item.street}}, {{'д.'+item.house}}, {{item.apartament}}
                            </div>
                          </template>

                          <template v-else >
                            <div class="address">
                              <div class="radio-btn">
                                <label>
                                  <input type="radio" name="addresse" v-model="arrdesss_id" :value="item.id" @click="errors.addresse = false">
                                  <div class="cust-radio"></div>
                                </label>
                              </div>
                              {{item.index ? item.index + ',' : ''}} {{'г. '+item.city}}, {{'ул. '+item.street}}, {{'д.'+item.house}}, {{item.apartament}}
                            </div>
                          </template>
                        </template>
                        <div class="order-list__content--replace">
                          <template >
                            <a @click.prevent="addAddresse" href="#">Создать адрес</a>
                            <template v-if="!Array.isArray(arrdesss_id)" >
                              <a @click.prevent="editAddresse(arrdesss_id)" href="#">Редактировать адрес</a>
                            </template>
                          </template>

                        </div>
                      </template>
                      <template v-else>
                        <div class="address">Нет адреса.</div>
                        <div class="order-list__content--replace">
                          <a @click.prevent="addAddresse" href="#">Создать адрес</a>
                        </div>
                      </template>

                    </div>
                  </div>

                  <div class="order-list__bottom">
                  <p>Завершая оформление заказа, я даю своё согласие на обработку персональных данных и подтверждаю ознакомление с <a href="#">политикой конфиденциальности.</a></p>
                    <div v-if="!user.phone" class="alert-info">Что бы сделать заказа, укажите свой телефон <nuxt-link to="/user/personal-data"><b>в личном кабинете</b></nuxt-link>.</div>
                  <a @click.prevent="orderHandler" href="#" class="btn btn-accent">Оформить заказ</a>
                </div>
                </template>
                <template v-else>
                  <EmptyData />
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapGetters } from "vuex"
  import Breadcrumbs from "~/components/UI/Breadcrumbs";
  import EmptyData from "~/components/UI/empty-data"
  import Loader from "~/components/UI/loader"
  export default {
    name: 'OrderPage',
    components: {Breadcrumbs, EmptyData, Loader},
    middleware: ['auth'],
    computed: {
      ...mapState({
        basket: state => state.catalog.basket,
        user: state => state.user,
        settings: state => state.settings
      }),
      ...mapGetters({
        summary: ['catalog/basketSummaryGETTERS']
      }),
      addresse() {
        return this.user.delivery_addresse
      },
      isNotPrice() {
        let is = false
        this.basket.forEach(item => {
          if (Number(item.price) === 0) {
            is = true
          }
        })
        return is
      },
      ending() {
        return this.basket.length === 1 ? 'товар' : (this.basket.length <= 2 && this.basket.length <= 4) ? 'товара' : '' ? 'товаров' : ''
      },
      salePrice() {
        let summary = 0
        this.basket.forEach(item => {
          if (Number(item.sale) !== 0) {
            summary = (summary + (Number(item.price_old) * Number(item.sale)) / 100) * Number(item.count)
          }
        })
        return summary
      },
      organizations() {
        let organization = ''
        if (this.user.organization) {

          if (this.organization_id.length === 0) return false

          this.user.organization.filter(item => item.id === Number(this.organization_id)).forEach(item => {
            organization += item.inn +', '+item.name
          })
        }
        return organization
      },
      deliveryAddresse() {
        let address = ''
        if (this.user.delivery_addresse.length) {
          this.user.delivery_addresse.forEach(item => {
            if (Number(item.id) === Number(this.arrdesss_id)) {
              address = `${item.index ? item.index + ',' : ''} г. ${item.city}, ул. ${item.street}, д. ${item.house}, ${item.apartament}`
            }
          })
        }
        return address
      }
    },
    data: () => ({
      payerType: 1,
      organization_id: [],
      arrdesss_id: [],
      errors: {
        payerOrganization: false,
        addresse: false
      },
      load: false
    }),
    methods: {
      editAddresse(id) {
        this.$store.commit('ui/TYPEPOPUPS', {
          state: 'editAddresse',
          value: id
        })
      },
      eventPopupUpdate(id) {
        this.$store.commit('ui/EDITORGANIZATION', id)
      },
      addAddresse() {
        this.$store.commit('ui/TYPEPOPUPS', {
          state: 'addAddresses',
          value: true
        })
      },
      async orderHandler() {
        if (!this.user.phone) {
          return false
        }
        if (this.payerType === 1) {
          if (!this.organizations) {
            this.$refs.payerBlock.scrollIntoView({block: "center", behavior: "smooth"});
            this.errors.payerOrganization = 'Выберите организацию'
            return false
          }
        }

        if (Array.isArray(this.arrdesss_id)) {
          this.errors.addresse = "Не выбран адрес доставки."
          this.$refs.addresseBlock.scrollIntoView({block: "center", behavior: "smooth"});
          return false
        }

        if (Number(this.payerType) === 1 ? this.user.organization.length === 0 : '' || this.user.delivery_addresse.length === 0) {
          this.$store.commit('ui/TYPEPOPUPS', {
            state: 'error',
            value: true,
            text: "Не заполнены обязательные поля. <br> Адрес доставки или Телефон"
          })
        } else {
          let product = []
          this.basket.forEach(item => {
            product.push({
              id_product: String(item.id),
              name: item.name,
              sku: String(item.sku),
              functions: item.catalog_element.name,
              count: String(item.count),
              sale: String(item.sale),
              price: String(item.price),
              priceCount: String((Number(item.price) * Number(item.count))),
            })
          })

          const requestObject = {
            count: String(this.basket.length),
            summary: String(this.summary),
            typePayer: Number(this.payerType) === 1 ? 'Юридическое лицо' : 'Физическое лицо' ,
            statusOrder: 'O',
            idSearch: this.user.id,
            userOrder : {
              id_user: String(this.user.id),
              name: this.user.username,
              email: this.user.email,
              phone: String(this.user.phone),
              city: this.user.city ? this.user.city : 'Не указан.',
              organization: this.organizations ? this.organizations : 'Не указан.',
              deliveryAddresse: this.deliveryAddresse
            },
            productsOrder: [...product]
          }
          const {status, data, config} = await this.$axios.post(`/orders`, JSON.stringify(requestObject), {
            headers: {
              Authorization: 'Bearer '+this.$cookies.get('_uh')
            }
          })

          if (status !== 200) {
            //error
            if (data.statusCode === 400) {
              this.$store.commit('ui/TYPEPOPUPS', {
                state: 'error',
                value: true,
                text: data.error
              })
            }
          } else {

            const requestEmail = await this.$axios.post('/email/', JSON.stringify({
              to: this.settings.email_send,
              from: 'fortistock@yandex.ru',
              subject: 'Заказ',
              html: `
                <h1>Заказ оформлен.</h1>
                <table>
                    <tr>
                        <td>Имя</td>
                        <td>${requestObject.userOrder.name}</td>
                    </tr>
                    <tr>
                        <td>Телефон</td>
                        <td>${requestObject.userOrder.phone}</td>
                    </tr>
                    <tr>
                        <td>e-mail</td>
                        <td>${requestObject.userOrder.email}</td>
                    </tr>
                    <tr>
                        <td>Город</td>
                        <td>${requestObject.userOrder.city}</td>
                    </tr>
                    <tr>
                        <td>Организация</td>
                        <td>${requestObject.userOrder.organization}</td>
                    </tr>
                    <tr>
                        <td>Адрес доставки</td>
                        <td>${requestObject.userOrder.deliveryAddresse}</td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <td>Тип платильщика:</td>
                        <td>${requestObject.typePayer}</td>
                    </tr>
                    <tr>
                        <td>Позиций:</td>
                        <td>${requestObject.count}</td>
                    </tr>
                    <tr>
                        <td>Cтатус:</td>
                        <td>
                            ${requestObject.statusOrder}
                            <p>O - ожидает оплаты, D - доставка, Z - завершен</p>
                        </td>
                    </tr>
                    <tr>
                        <td>На сумму:</td>
                        <td>${requestObject.summary}</td>
                    </tr>
                    <tr>
                        <td>
                            Товары:
                        </td>
                        <td>
                            <ol>
                                ${requestObject.productsOrder.map(item => `<li> ID: ` + item.id_product +` - `+ item.name +`</li>` ).join('')}
                            </ol>
                        </td>
                    </tr>
                </table>
              `,
            }))

            if (Number(requestEmail.status) !== 200) {
              this.$store.commit('ui/TYPEPOPUPS', {
                state: 'error',
                title: 'Ошибка',
                text: 'Не смог отправить email.',
                value: true
              })
            }
            await this.$store.commit('ui/TYPEPOPUPS', {
              state: 'successOrder',
              value: true,
            })
            await this.$store.commit('catalog/BASKET', '')
            this.$cookies.remove('test')
            this.$cookies.remove('_bs')
            this.$gtag('event', 'conversion', {'send_to': 'AW-393660833/DiLECOHFq4ACEKGT27sB'})
          }
        }
      }
    },
    mounted() {
      this.load = true
    }

  }
</script>

<style lang="scss">
  .message-error{
    color: #ff4242;
    font-size: 16px;
    margin-bottom: 5px;
  }
  .order-list{
    &.error-block{
      border: 1px solid #ff4242
    }
    .radio-btn{
      margin-top: 4px;
      margin-right: 15px;
    }
    table{
      td{
        &[rowspan="2"] {
          vertical-align: top;
        }
      }
    }
  }
  .order-list__content--replace{
    a{
      display: inline-block;
      margin-right: 15px;
    }
  }
  .organizer{
    td{
      padding-bottom: 10px;
    }
    .inn{
      color: #cccbd4;
    }
  }
</style>
