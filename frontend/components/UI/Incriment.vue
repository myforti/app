<template>
    <div data-incriment="" class="count-incriment">
      <span @click="incrimentMinus" class="count-incriment--minus">-</span>
      <input ref="incrimentInput" step="1" min="1" type="number" v-model="values" @input="inputHandler">
      <span @click="incrimentPlus" class="count-incriment--plus">+</span>
    </div>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    name: "Counter",
    props: {
      ids: {
        type: Number,
        required: true
      }
    },
    data: () => ({
      value: 1,
      values: 1
    }),
    computed: {
      ...mapState({
        basket: state => state.catalog.basket,
      })
    },
      watch:{
        basket(newValue) {
            if (newValue.length) {
                newValue.forEach(item => {
                    if (Number(item.id) === Number(this.ids)) {
                        this.values = item.count
                    }
                })
            }
        }
      },
    methods:{
      incrimentPlus() {
        setTimeout(() => {
          this.$refs.incrimentInput.stepUp();
          this.values = Number(this.$refs.incrimentInput.value)
            //this.$cookies.set('test', [...this.$cookies.get('test'),{id: this.ids, count: this.values}])
          if (this.basket.length) {
            this.$store.commit('catalog/BASLETCOUNT', {id: this.ids, count: this.values})
          }
        },0)
          // let isCookies = this.$cookies.get('test').filter(item => Number(item.id) === Number(this.ids))
          // console.log(isCookies)
      },
      incrimentMinus() {
        setTimeout(() => {
          this.$refs.incrimentInput.stepDown()
          if (Number(this.values) > 1) {
            this.values = Number(this.values) - 1
            if (this.basket.length) {
              this.$store.commit('catalog/BASLETCOUNT', {id: this.ids, count: this.values})
            }
          }
        },0)
      },
      async inputHandler(e){
        if (Number(this.values) === 0) {
          this.values = 1
        }
        if (this.basket.length) {
          await this.$store.commit('catalog/BASLETCOUNT', {id: this.ids, count: this.values})
        }
      }
    },
    mounted() {
        console.log(this.basket)
      if (this.basket.length === 0) {
        return false
      }
      this.basket.forEach(item => {
        if (Number(item.id) === Number(this.ids)) {
          this.values = item.count
        }
      })
    },
    beforeUpdate() {
        if (this.basket.length === 0) {
            return false
        }
        this.basket.forEach(item => {
            if (Number(item.id) === Number(this.ids)) {
                this.values = item.count
            }
        })
    },
  }
</script>
