<template>
  <div>
    <client-only>
      <v-select :searchable="false" @input="selectedOption" :placeholder="plh" :value="valueFilter" v-model="select" label="name" :options="options">
    </v-select>
    </client-only>
  </div>
</template>

<script>
  export default {
    name: "selectSortProduct",
    data: () => ({
      select: '',
      options: [
        {name: 'По дате добавления', value: '&_sort=created_at:ASC'},
        {name: 'По цене возрастание', value: '&_sort=price:ASC'},
        {name: 'По цене убывания', value: '&_sort=price:DESC'},
      ],
      plh: 'По дате добавления',
      valueFilter: []
    }),
    computed: {
    },
    methods: {
      selectedOption(value) {
        this.$nuxt.$emit("selectedSort", value);
      },
      testOpen() {
        this.$refs.selectRule.open = !this.$refs.selectRule.dropdownOpen
      },
    },
    mounted() {
      this.$nuxt.$on('optionUpdateSort', newValue => {
        this.select = newValue
        this.valueFilter = newValue
      })
    }
  }
</script>
