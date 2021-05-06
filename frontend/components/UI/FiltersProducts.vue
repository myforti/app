<template>
  <div class="filter" >
    <div class="filter-container">
<!--      <div class="filter-grid d-lg-none">-->
<!--        <div class="button-filter">-->
<!--          Фильтры <sup>10</sup>-->
<!--        </div>-->
<!--      </div>-->
      <div v-if="disableRule" class="filter-grid">
        <div class="filter-select">
          <div class="custom-select">
            <SelectRulerProduct :ruler="rulers" />
          </div>
        </div>
      </div>
      <div class="filter-grid">
        <div class="filter-select">
          <div class="custom-select">
            <SelectTypeProduct />
          </div>
        </div>
      </div>
      <div class="filter-grid">
        <div class="filter-price">
          <span>Цена $ </span>
          <div class="fieldset">
            <b>от</b>
            <input v-model="filtersValue.fromPrice" type="number">
          </div>
          <div class="fieldset">
            <b>до</b>
            <input v-model="filtersValue.toPrice" type="number">
          </div>
        </div>
      </div>
      <div class="filter-grid ml-auto">
        <div class="sorting-select">
          <SelectSortProduct />
        </div>
      </div>
      <div :data-sort="filtersValue.sort.value" class="filter-grid row-filters-button d-none d-lg-flex w-100">
        <template v-if="filtersValue.rulerProduct.length">
          <template v-for="ruler of filtersValue.rulerProduct">
            <button :key="ruler.id" @click.prevent="deleteFilterRule(ruler.id)">{{ruler.name}}</button>
          </template>
        </template>
        <template v-if="filtersValue.typeProduct.length">
          <template v-for="typeItem of filtersValue.typeProduct">
            <button :key="typeItem.id" @click.prevent="deleteFilterType(typeItem.id)">{{typeItem.name}}</button>
          </template>
        </template>

      </div>
    </div>
  </div>
</template>
<script>
  import SelectRulerProduct from "~/components/UI/selectRulerProduct"
  import SelectTypeProduct from "~/components/UI/selectTypeProduct"
  import SelectSortProduct from "~/components/UI/selectSortProduct"

  export default {
    name: "FiltersProducts",
    props: {
      disableRule: {
        type: Boolean,
        default: true
      },
      rulers: {
        type: String
      },
      searchAll: {
        type: Boolean,
        default: false
      },
      paramsSearch: {
        type: String
      }
    },
    components: {
      SelectRulerProduct,
      SelectTypeProduct,
      SelectSortProduct
    },
    data: () => ({
      filtersValue: {
        rulerProduct: '',
        typeProduct: '',
        fromPrice: '',
        toPrice: '',
        sort: ''
      },
      requestString: ''
    }),
    methods:{
      deleteFilterRule(id) {
        this.filtersValue.rulerProduct = this.filtersValue.rulerProduct.filter(item => item.id !== id)
        this.$nuxt.$emit('optionUpdateRuler', this.filtersValue.rulerProduct)
      },
      deleteFilterType(id) {
        this.filtersValue.typeProduct = this.filtersValue.typeProduct.filter(item => item.id !== id)
        this.$nuxt.$emit('optionUpdateType', this.filtersValue.typeProduct)
      }
    },
    async beforeUpdate() {
      let ruler = ''
      let type = ''
      let fromPrice = ''
      let toPrice = ''
      let sort = ''
      if (this.filtersValue.rulerProduct.length) {
        this.filtersValue.rulerProduct.forEach(item => {
          ruler += `&_where[catalog_element.slug]=${item.slug}`
        })
      } else {
        ruler = ''
      }
      if (this.filtersValue.typeProduct.length) {
        this.filtersValue.typeProduct.forEach(item => {
          type += `&_where[filters.name]=${item.name}`
        })
      } else {
          type = ''
      }
      if (this.filtersValue.fromPrice.length) {
        fromPrice += `&_where[price_gte]=${this.filtersValue.fromPrice}`
      } else {
        fromPrice = ''
      }
      if (this.filtersValue.toPrice.length) {
        toPrice += `&_where[price_lte]=${Number(this.filtersValue.toPrice)}`
      } else {
        toPrice = ''
      }

      if (Object.values(this.filtersValue.sort).length) {
        sort += this.filtersValue.sort.value
      } else {
        sort = ''
      }


      this.requestString = ruler + type + fromPrice + toPrice
      let request = ''
      if (this.requestString.length ) {
        //await this.$store.dispatch('catalog/FetchCatalogParams', `products?_where[catalog.slug]=${this.$route.params.slugs + this.requestString + sort}`)
        request = this.searchAll ?
                `products?_where[_or][0][name_contains]=${this.paramsSearch}&_where[_or][1][filters.name_contains]=${this.paramsSearch + this.requestString + sort}` :
                `products?_where[catalog.slug]=${this.$route.params.slugs + this.requestString + sort}`
        this.$nuxt.$emit("filtersFill", request);
      } else {
        //await this.$store.dispatch('catalog/FetchCatalogParams', `products?_where[catalog.slug]=${this.$route.params.slugs + sort}`)
        request = this.searchAll ?
                `products?_where[_or][0][name_contains]=${this.paramsSearch}&_where[_or][1][filters.name_contains]=${this.paramsSearch + sort}` :
                `products?_where[catalog.slug]=${this.$route.params.slugs + sort}`
        this.$nuxt.$emit("filtersEmpty", request);
      }

    },
    mounted() {
      this.$nuxt.$on('selectedRuller', value => {
        this.filtersValue.rulerProduct = value
      })
      this.$nuxt.$on('selectedType', value => {
        this.filtersValue.typeProduct = value
      })
      this.$nuxt.$on('selectedSort', value => {
        this.filtersValue.sort = value
      })
    }

  }
</script>

<style lang="scss">
  .catalog-filter__block .filter-price span{
    white-space: nowrap;
  }
  .catalog-filter__block .filter-container{
    @media (max-width: 767px) {
      justify-content: center;
    }
  }
  .catalog-filter__block .filter-grid{
    &.ml-auto{
      @media (max-width: 767px) {
        margin-right: auto;
      }
    }
  }
</style>