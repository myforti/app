<template>
  <div class="custom-edit">
    <div v-if="!edit">{{view}}</div>
    <div v-else>
      <input v-model="values" type="text" @blur="save">
    </div>
    <div v-if="!edit" @click="edit = !edit, values = name" class="edit-data">
      <svg>
        <use xlink:href="#pencil-svg"></use>
      </svg>
    </div>
<!--    <div v-else class="edit-data">-->
<!--      <div v-if="values.length" @click="save" class="save">save</div>-->
<!--    </div>-->
  </div>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    name: 'PencilToInput',
    props: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        default: ''
      },
      view: {
        type: String,
        default: ''
      },
      value:{
        type: String
      },
      editActive: {
        type: Boolean,
        default: false
      },
      child: {
        type: String
      },
      itemid: {
        type: Number
      }
    },
    data: () => ({
      edit: false,
      values: ''
    }),
    computed: {
      ...mapState({
        user: state => state.user
      })
    },
    methods: {
      async save() {
        let new_user = JSON.parse(JSON.stringify(this.user))
        if (this.child) {
          new_user[this.child].forEach(el => {
            if (el.id === this.itemid) {
              el[this.value] = this.values
            }
          })
        } else {
          new_user[this.value] = this.values
        }

        await this.$store.dispatch('UpdateUser', {object: new_user, id: this.id, popup: false})
        this.edit = !this.edit
      }
    },
    created() {
      this.edit = this.editActive
    }
  }
</script>

<style lang="scss">
  .custom-edit{
    input{
      eight: 32px;
      padding-left: 10px;
      border: none;
      border-bottom: 1px solid #403e4f;
    }
  }
</style>
