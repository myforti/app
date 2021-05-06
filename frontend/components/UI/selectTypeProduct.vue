<template>
  <div>
    <client-only>
      <p class="title-select" @click="testOpen">{{plh}}</p>
      <v-select  multiple :searchable="false" @input="selectedOption" :placeholder="plh" :value="valueFilter" v-model="select" label="name" :options="options">
    </v-select>
    </client-only>
  </div>
</template>

<script>
  export default {
    name: "selectTypeProduct",
    data: () => ({
      select: '',
      options: [],
      plh: 'Тип товара',
      valueFilter: []
    }),
    computed: {
    },
    methods: {
      selectedOption(value) {
        this.$nuxt.$emit("selectedType", value);
      },
      testOpen() {
        this.$refs.selectRule.open = !this.$refs.selectRule.dropdownOpen
      },
    },
    async created() {
      const { data } = await this.$axios.get(`/filters`)
      this.options = data
    },
    mounted() {
      this.$nuxt.$on('optionUpdateType', newValue => {
        this.select = newValue
        this.valueFilter = newValue
      })
    }
  }
</script>
