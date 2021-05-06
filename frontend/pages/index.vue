<template>
  <div>
    <MainSliders />

    <ReadySolutions />

    <div class="container">
      <div class="row">
        <div class="col-12">
          <template v-if="catalogMain.length">
            <template v-for="group of catalogMain">
              <template v-for="element of group.catalog_elements">
                <PreviewBlock v-if="element.showMain" :params="{group: element.slug, slugs: group.slug, name: element.name, catalogs: group.catalog_elements}" />
              </template>
            </template>
          </template>
          <nuxt-link @click.native="$yandexMetrika.reachGoal('748970629')" to="/catalog/" class="btn btn-width-all">
            <span>
              Смотреть весь ассортимент
              <svg>
                <use xlink:href="#link-arrow--svg"></use>
              </svg>
            </span>
          </nuxt-link>

        </div>
      </div>
    </div>
    <div class="category__block">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h3>Все категории товаров</h3>
        </div>
        <div v-for="catalog of catalogs" class="col-xl-3 col-lg-4 col-md-6 ">
          <nuxt-link @click.native="$yandexMetrika.reachGoal('7489706211')" :to="'/catalog/'+catalog.slug" class="category__block-item">
            <svg>
              <use :xlink:href="'#'+catalog.slug+'-main'" class="use"></use>
              <use :xlink:href="'#'+catalog.slug+'--hover'" class="use-hover"></use>
            </svg>
            <span v-html="replaceSpace(catalog.name)"></span>
          </nuxt-link>
        </div>
        <div class="col-12">
          <div class="form__search">
            <Search />
          </div>
        </div>
      </div>
    </div>
  </div>
    <NewsMain />
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import MainSliders from "~/components/MainSlider"
  import NewsMain from "~/components/NewsMain"
  import PreviewBlock from "~/components/PreviewBlock"
  import ReadySolutions from "~/components/ReadySolutions"
  import Search from "~/components/Search"
export default {
  name: "IndexPage",
  components: {
    PreviewBlock,
    NewsMain,
    MainSliders,
    ReadySolutions,
    Search
  },
  data: () => ({
    catalogMain: []
  }),
  async fetch() {
    const {status, data} = await this.$axios.get('/catalogs?_where[catalog_elements.showMain]=true')
    if (Number(status) === 200) {
      this.catalogMain = data
    }
  },
  computed: {
    ...mapState({
      catalogs: state => state.catalog.catalog
    }),
  },
  methods: {
    replaceSpace(string) {
      return string.replace(/(\s+)/g, (i => m => i++ ? m : '<br>')(0))
    }
  }
}
</script>

