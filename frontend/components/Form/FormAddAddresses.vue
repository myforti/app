<template>
  <div>
    <h3>Добавить адрес</h3>
    <form @submit.prevent="addHandler" class="form">
<!--      <InputForm-->
<!--        :value.sync="form.name"-->
<!--        type="text"-->
<!--        placeholder="Наименование"-->
<!--        :error="error.name.length !== 0 ? {text: error.name, className: 'error'} : {}"-->
<!--      />-->
      <InputForm
              :value.sync="form.index"
              type="text"
              placeholder="Индекс"
              :error="error.index.length !== 0 ? {text: error.index, className: 'error'} : {}"
      />
      <InputForm
              :value.sync="form.city"
              type="text"
              placeholder="Город *"
              :error="error.city.length !== 0 ? {text: error.city, className: 'error'} : {}"
      />
      <InputForm
              :value.sync="form.street"
              type="text"
              placeholder="Улица *"
              :error="error.street.length !== 0 ? {text: error.street, className: 'error'} : {}"
      />
      <InputForm
              :value.sync="form.house"
              type="text"
              placeholder="Дом *"
              :error="error.house.length !== 0 ? {text: error.house, className: 'error'} : {}"
      />
      <InputForm
              :value.sync="form.apartment"
              type="text"
              placeholder="Квартира или офис *"
              :error="error.apartment.length !== 0 ? {text: error.apartment, className: 'error'} : {}"
      />
      <div class="form__bottom">
        <span class="preview-text">{{this.form.index}} {{this.form.city.length ? ', '+this.form.city : ''}} {{this.form.street.length ? ', ул. '+this.form.street : ''}} {{this.form.house.length ? ', дом '+this.form.house : ''}} {{this.form.apartment.length ? ','+this.form.apartment : ''}}</span>
        <div class="group-btn">
          <input @click="close" class="btn btn-outline--primary" type="submit" value="Отменить">
          <input class="btn btn-primary" type="submit" value="Сохранить">
        </div>

      </div>
    </form>
  </div>
</template>

<script>
  import { mapMutations, mapState } from "vuex"
  import InputForm from "~/components/Form/inputForm"
  export default {
    name: 'FromAddAddresses',
    components: {
      InputForm
    },
    computed: {
      ...mapState({
        user: state => state.user
      }),
      city() {
        return this.form.city
      },
      street() {
        return this.form.street
      },
      house() {
        return this.form.house
      },
      apartment() {
        return this.form.apartment
      },
    },
    data: () => ({
      form: {
        index: '',
        city: '',
        street: '',
        house: '',
        apartment: ''
      },
      error: {
        index: '',
        city: '',
        street: '',
        house: '',
        apartment: ''
      }
    }),
    methods: {
      ...mapMutations(['ui/TYPEPOPUPS']),
      validate() {
        if (this.form.city.length === 0) {
          this.error.city = 'Поле не должно быть пустым'
        } else {
          this.error.city = ''
        }
        if (this.form.street.length === 0) {
          this.error.street = 'Поле не должно быть пустым'
        } else {
          this.error.street = ''
        }
        if (this.form.house.length === 0) {
          this.error.house = 'Поле не должно быть пустым'
        } else {
          this.error.house = ''
        }
        if (this.form.apartment.length === 0) {
          this.error.apartment = 'Поле не должно быть пустым'
        } else {
          this.error.apartment = ''
        }
      },
      async addHandler() {
        this.validate()

        if (this.form.city.length && this.form.street.length && this.form.house.length && this.form.apartment.length) {
          let delivery = []
          const object_addresse = {
            index: this.form.index,
            city: this.form.city,
            street: this.form.street,
            house: this.form.house,
            apartament: this.form.apartment
          }
          if (this.user.delivery_addresse.length !== 0) {
            delivery = [...this.user.delivery_addresse, object_addresse]
            console.log(delivery)
          } else {
            delivery = [object_addresse]
          }

          const { status , data } = await this.$axios.put(`/users/${this.user.id}`,JSON.stringify({
                                    delivery_addresse: delivery
                                  }), {
                                    headers: {
                                      Authorization: 'Bearer '+this.$cookies.get('_uh')
                                    }
                                  })
          if (status === 200) {
            this.$store.commit('USER', data)
              this.close()
          }
        }
      },
      close() {
        this['ui/TYPEPOPUPS']({
          state: 'addAddresses',
          value: false
        })
      }
    },
    watch: {
      city(newValue) {
        if (newValue.length) {
          this.error.city = ''
        }
      },
      street(newValue) {
        if (newValue.length) {
          this.error.street = ''
        }
      },
      house(newValue) {
        if (newValue.length) {
          this.error.house = ''
        }
      },
      apartment(newValue) {
        if (newValue.length) {
          this.error.apartment = ''
        }
      }
    }
  }
</script>

<style lang="scss">
  .fieldset.error::before{
    bottom: calc(50% - 5px);
  }
  .preview-text{
    margin-bottom: 20px;
    font-size: 12px;
    color: #cdcdcd;
  }
</style>
