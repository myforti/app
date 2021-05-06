<template>
  <div class="lk">
    <div class="lk__title">
      Организация
      <a @click.prevent="addOrganization" href="#">Добавить организацию</a>
    </div>
    <div v-if="user && user.organization.length" class="lk__content">
      <div v-for="item of user.organization" :key="item.id" class="add-item-input">
<!--        <div :class="item.selected ? 'checked' : ''" class="radio-btn">-->
<!--          <label>-->
<!--            <input v-model="checkedBox" type="radio" :value="item.id" @change="checkedBoxValue" name="organiztion" :checked="item.selected">-->
<!--            <div class="cust-radio"></div>-->
<!--          </label>-->
<!--        </div>-->
        <table>
          <tbody><tr>
            <td>
              <div class="th">Наименование</div>
            </td>
            <td>
              <PencilToInputOrganization :id="Number(user.id)" :itemid="item.id" :child="'organization'" :value="'name'" :name="`${item.name}`" :view="`${item.name}`" />
            </td>
          </tr>
          <tr>
            <td>
              <div class="th">ИНН</div>
            </td>
            <td>
              <PencilToInputOrganization :id="Number(user.id)" :itemid="item.id" :child="'organization'" :value="'inn'" :name="`${item.inn}`" :view="`${item.inn}`" />
            </td>
          </tr>
          </tbody></table>
        <a @click.prevent="deleteOrganization(item.id)" href="#" class="del">Удалить организацию</a>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  import PencilToInputOrganization from "~/components/UI/PencilToInputOrganization";
  export default {
    name: "Organizations",
    components: {
      PencilToInputOrganization
    },
    computed: {
      ...mapState({
        user: state => state.user
      })
    },
    data: () => ({
      checkedBox: []
    }),
    methods: {
      ...mapMutations(['ui/TYPEPOPUPS']),
      addOrganization() {
        this['ui/TYPEPOPUPS']({
          state: 'addOrganization',
          value: true
        })
      },
      async deleteOrganization(id) {
        let DelOrganization = this.user.organization.slice()

        DelOrganization = DelOrganization.filter(item => item.id !== id)

        await this.$store.dispatch('fetchUpdateOrganization', {
          id: this.user.id,
          organization: DelOrganization
        })
      },
      async checkedBoxValue() {
        let organization = this.user.organization.map((b, idx) => Object.assign({ index: idx }, b))
        for(let item of organization) {
          if (item.id === this.checkedBox) {
            item.selected = true
          } else {
            item.selected = false
          }
        }

        await this.$store.dispatch('fetchUpdateOrganization', {
          id: this.user.id,
          organization: organization
        })
      }
    }
  }
</script>
