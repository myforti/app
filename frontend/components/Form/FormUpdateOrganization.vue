<template>
    <div>
        <h3>Изменить организацию</h3>
        <form class="form">
            <div v-if="user && user.organization.length" class="lk__content">
                <div  class="add-item-input">
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
                        </tbody>
                    </table>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import PencilToInputOrganization from "~/components/UI/PencilToInputOrganization";
    export default {
        name: "FormUpdateOrganization",
        props: {
          id: {
              type: Number
          }
        },
        components:{
            PencilToInputOrganization
        },
        computed: {
            ...mapState({
                user: state => state.user
            }),
            item() {
                let [itemOnly] = this.user.organization.filter(item => Number(item.id) === this.id)
                return itemOnly
            }
        }
    }
</script>