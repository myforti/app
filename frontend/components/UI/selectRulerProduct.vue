<template>
  <div>
    <client-only>
      <p class="title-select" @click="testOpen">{{plh}}</p>
      <v-select :searchable="false" multiple ref="selectRule" @input="selectedOption" :placeholder="plh" :value="valueFilter" v-model="select" label="name" :options="options"></v-select>
    </client-only>
  </div>
</template>

<script>
  export default {
    name: "selectRulerProduct",
    props: {
      ruler: {
        type: String
      }
    },
    data: () => ({
      select: '',
      options: [],
      plh: 'Линейка товара',
      valueFilter: []
    }),
    computed: {
    },
    methods: {
      selectedOption(value) {
        this.$nuxt.$emit("selectedRuller", value);
      },
      testOpen() {
        this.$refs.selectRule.open = !this.$refs.selectRule.dropdownOpen
      },
    },
    async created() {
      if (this.ruler) {
        const { data, config } = await this.$axios.get(`/catalogs?slug=${this.ruler}`)
        const [item] = data
        this.options = item.catalog_elements
      } else {
        const { data, config } = await this.$axios.get(`/catalog-elements`)
        this.options = data
      }

    },
    mounted() {
      this.$nuxt.$on('optionUpdateRuler', newValue => {
        this.select = newValue
        this.valueFilter = newValue
      })
    }
  }
</script>
