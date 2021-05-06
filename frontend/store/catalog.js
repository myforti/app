export const state = () => ({
  catalog: '',
  catalogInner: '',
  catalogProducts: '',
  catalogFavorite: '',
  productOnly: '',
  basket: '',
  filters: [],
  searchElements: []
})

export const mutations = {
  CATALOG(state, payload) {
    state.catalog = payload
  },
  PRODUCTS(state, payload) {
    state.catalogProducts = payload
  },
  FAVORITES(state, payload) {
    state.catalogFavorite = payload
  },
  PRODUCTONLY(state, payload) {
    state.productOnly = payload
  },
  BASKET(state, payload) {
    state.basket = payload
  },
  BASLETCOUNT(state, payload) {
    console.log(state.basket)
    state.basket.forEach(item => {
      if (Number(item.id) === Number(payload.id)) {
        item.count = payload.count
        if (this.$cookies.get('test')) {
          let del = this.$cookies.get('test').filter(counter => Number(counter.id) !== Number(payload.id))
          this.$cookies.set('test', [...del, {id: payload.id, count: item.count}])
        } else {
          this.$cookies.set('test', [{id: payload.id, count: item.count}])
        }
      }
    })
  },
  FILTERS(state, payload) {
    state.filters= payload
  },
  SEARCHELEMENTS(state, payload) {
    state.searchElements = payload
  }
};

export const actions ={
  async FetchCatalog({commit}) {
    const {status, data, config} = await this.$axios.get('/catalogs')

    if (status !== 200) {
      await this.commit('ui/TYPEPOPUPS', {
        state: 'error',
        value: true,
        text: 'Что-то пошло не так.'
      })
    } else {
      await commit('CATALOG', data)
    }
  },
  async FetchCatalogParams({commit}, params) {
    const {status, data, config} = await this.$axios.get(`/${params}`)

    if (status !== 200) {
      await this.commit('ui/TYPEPOPUPS', {
        state: 'error',
        value: true,
        text: 'Что-то пошло не так.'
      })
    } else {
      await commit('PRODUCTS', data)
    }
  },
  async FetchCatalogFavorites({commit}, string) {
    const {status, data, config} = await this.$axios.get(`/products?${string}`)
    if (status !== 200) {
      await this.commit('ui/TYPEPOPUPS', {
        state: 'error',
        value: true,
        text: 'Что-то пошло не так.'
      })
    } else {
      await commit('FAVORITES', data)
    }
  },
  async FetchProductOnly({commit}, string) {
    const {status, data, config} = await this.$axios.get(`/products?${string}`)
    if (status !== 200) {
      await this.commit('ui/TYPEPOPUPS', {
        state: 'error',
        value: true,
        text: 'Что-то пошло не так.'
      })
    } else {
      await commit('PRODUCTONLY', data)
    }
  },
  async FetchProductBasket({commit, dispatch}, string) {
    const {status, data, config} = await this.$axios.get(`/products?${string}`)
    if (status !== 200) {
      await this.commit('ui/TYPEPOPUPS', {
        state: 'error',
        value: true,
        text: 'Что-то пошло не так.'
      })
    } else {
      if (this.$cookies.get('test')) {
        this.$cookies.get('test').forEach(item => {
          data.forEach(product => {
            if (Number(item.id) === Number(product.id)) {
              product.count = item.count
            }
          })

        })
      }
      if (string.length) {
        await commit('BASKET', data)
      } else {
        await commit('BASKET', [])
      }
      
    }
  },
  async FetchFilters({commit}, payload) {
    const {status, data, config} = await this.$axios.get(`/filters?${payload}`)
    if (status !== 200) {
      await this.commit('ui/TYPEPOPUPS', {
        state: 'error',
        value: true,
        text: 'Что-то пошло не так.'
      })
    } else {
      commit('FILTERS', data)
    }
  },
  async FetchSearchElements({commit}, searchString){
    searchString = searchString.replace(/\s+/g, '-')
    const urls = `products?_where[_or][0][name_contains]=${encodeURIComponent(searchString)}&_where[_or][1][filters.name_contains]=${encodeURIComponent(searchString)}`
    const { status, data, config } = await this.$axios.get(urls)

    if (status !== 200) {
      await this.commit('ui/TYPEPOPUPS', {
        state: 'error',
        value: true,
        text: 'Не смог выполнить поиск.'
      })
    } else {
      commit('SEARCHELEMENTS', data)
    }
  }
};

export const getters = {
  basketSummaryGETTERS: (state) => {
    let product = state.basket
    if (product.length === 0) return
    let summary = 0
    product.forEach(item => {
      if (Number(item.price) === 0) return
      summary = summary + (Number(item.price) * Number(item.count))
    });
    return summary
  }
}


