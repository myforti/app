<template>
  <div class="lk">
    <div class="lk__title">
      Адреса доставки
      <a @click.prevent="addAddresses" href="#">Добавить адрес</a>
    </div>
    <div v-if="user && user.delivery_addresse" class="lk__content">
      <div v-for="item of user.delivery_addresse" class="add-item-input">
<!--        <div :class="item.selected ? 'checked' : ''" class="radio-btn">-->
<!--          <label >-->
<!--            <input v-model="checkedBox" @change="checkedBoxValue" :value="item.id" type="radio" name="address" :checked="item.selected ? true : false">-->
<!--            <div class="cust-radio"></div>-->
<!--          </label>-->
<!--        </div>-->
        <table>
          <tbody>
          <tr>
            <td>
              <div class="td__addresse">
                <span>{{item.index ? item.index + ',' : ''}} {{'г. '+item.city}}, {{'ул. '+item.street}}, {{'д.'+item.house}}, {{item.apartament}}</span>
                <div @click="editAddresse(item.id)" class="edit-data"><svg><use xlink:href="#pencil-svg"></use></svg></div>
              </div>
            </td>
          </tr>
          </tbody></table>
        <a @click.prevent="deleteAddresse(item.id)" href="#" class="del">Удалить адрес</a>
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
      editAddresse(id) {
        this['ui/TYPEPOPUPS']({
          state: 'editAddresse',
          value: id
        })
      },
      addAddresses() {
        this['ui/TYPEPOPUPS']({
          state: 'addAddresses',
          value: true
        })
      },
      async deleteAddresse(id) {
        let DelAddresse = JSON.parse(JSON.stringify(this.user.delivery_addresse))

        DelAddresse = DelAddresse.filter(item => item.id !== id)
        await this.$store.dispatch('fetchUpdateAddresse', {
          id: this.user.id,
          addresse: DelAddresse
        })
      },
      async checkedBoxValue() {
        let organization = JSON.parse(JSON.stringify(this.user.delivery_addresse))
        for(let item of organization) {
          if (item.id === this.checkedBox) {
            item.selected = true
          } else {
            item.selected = false
          }
        }
        console.log(organization)
        await this.$store.dispatch('fetchUpdateAddresse', {
          id: this.user.id,
          addresse: organization
        })
      }
    }
  }
</script>

<style lang="scss">
  .td__addresse{
    display: flex;
    align-items: center;
    span{

    }
    .edit-data{
      width: 17px;
      height: 17px;
      display: inline-block;
      margin-left: 10px;
      &:hover{
        cursor: pointer;
        svg{
          stroke: #ff4242;
        }
      }
      svg{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
