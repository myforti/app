<template>
  <div>
    <h3>Добавить организацию</h3>
    <form @submit.prevent="addHandler" class="form">
      <InputForm
        :value.sync="form.name"
        type="text"
        placeholder="Наименование"
        :error="error.name.length !== 0 ? {text: error.name, className: 'error'} : {}"
      />
      <InputForm
        :value.sync="form.inn"
        type="text"
        placeholder="ИНН"
        v-mask="'##########'"
        :error="error.inn.length !== 0 ? {text: error.inn, className: 'error'} : {}"
      />
      <div class="form__bottom">
        <div class="group-btn">
          <input @click="close" class="btn btn-outline--primary" type="submit" value="Отменить">
          <input :disabled="form.inn.length <= 9" class="btn btn-primary" type="submit" value="Сохранить">
        </div>

      </div>
    </form>
  </div>
</template>

<script>
  import { mapMutations, mapState } from "vuex"
  import InputForm from "~/components/Form/inputForm"
  export default {
    name: 'FromAddOrganization',
    components: {
      InputForm
    },
    computed: {
      ...mapState({
        user: state => state.user
      }),
      name() {
        return this.form.name
      },
      inn() {
        return this.form.inn
      }
    },
    data: () => ({
      form: {
        name: '',
        inn: ''
      },
      error: {
        name: '',
        inn: ''
      }
    }),
    methods: {
      ...mapMutations(['ui/TYPEPOPUPS']),
      validate() {
        if (this.form.name.length === 0) {
          this.error.name = 'Поле не должно быть пустым'
        } else {
          this.error.name = ''
        }
        if (this.form.inn.length === 0) {
          this.error.inn = 'Поле не должно быть пустым'
        } else {
          this.error.inn  = ''
        }
      },
      async addHandler() {
        this.validate()
        if (this.form.inn && this.form.name) {
          await this.$store.dispatch('fetchAddOrganization', {
            id: this.user.id,
            name: this.form.name,
            inn: this.form.inn,
            organization: this.user.organization
          })
        }
      },
      close() {
        this['ui/TYPEPOPUPS']({
          state: 'addOrganization',
          value: false
        })
      }
    },
    watch: {
      name(newValue) {
        (newValue.length === 0) ? this.error.name = 'Пустое поле' : this.error.name = ''
      },
      inn(newValue) {
        (newValue.length === 0) ? this.error.inn = 'Пустое поле' : this.error.inn = ''
      },
    }
  }
</script>

<style lang="scss">
  .fieldset.error::before{
    bottom: calc(50% - 5px);
  }
</style>
