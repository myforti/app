<template>
  <div class="custom-edit">
    <div v-if="!edit">

      <template v-if="value === 'password'" >
        {{visiblePassword}}
      </template>
      <template v-else>
        {{view}}
      </template>
      <template v-if="view.length === 0" >
        <div @click="focusInput" class="fieldset error"><input type="text" readonly="readonly"></div>
      </template>
    </div>
    <div v-else>
      <template v-if="value === 'phone'">
        <input ref="inputEdit" v-model="values" @blur="save" v-mask="'+7 (###) ###-##-##'" type="text">
      </template>
      <template v-else-if="value === 'password'" >
        <input ref="inputEdit" v-model="values" @blur="save" type="text">
      </template>
      <template v-else>
        <input ref="inputEdit" v-model="values" @blur="save" type="text">
      </template>
    </div>
    <div v-if="!edit" @click="edit = !edit, values = name" class="edit-data">
      <svg>
        <use xlink:href="#pencil-svg"></use>
      </svg>
    </div>
  </div>
</template>

<script>
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
      }
    },
    computed: {
      visiblePassword() {
        let countStar = ''
        if (this.view.length === 0) return false
        this.view.split('').forEach(item => {
          countStar += '*'
        })
        return countStar
      }
    },
    data: () => ({
      edit: false,
      values: ''
    }),
    methods: {
      focusInput() {
        this.edit= true
        setTimeout(() => {
          this.$refs.inputEdit.focus()
        },0)

      },
      async save() {
        const ObjRequest = {}
        ObjRequest[this.value] = this.values
        if (this.values.length === 0) {
          this.edit = !this.edit
          return false
        }
        const result = await this.$store.dispatch('fetchUpdateUser', {type: this.value, object: ObjRequest, id: this.id})
        this.edit = !this.edit
      }
    },
    created() {
      this.edit = this.editActive
    }
  }
</script>
