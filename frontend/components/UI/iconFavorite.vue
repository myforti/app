<template>
  <div :class="isActive ? 'active' : ''" @click="favoriteHandler" class="heart">
    <svg class="icon">
      <use xlink:href="#heart-svg"></use>
    </svg>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    name: 'iconFavorite',
    props: {
      id: {
        type: Number
      }
    },
    middleware: ['auth'],
    data: () => ({
        active: false
    }),
    computed: {
      ...mapState({
        user: state => state.user
      }),
      isActive() {
        let active = false
        if (!this.user) return false

        this.user.favorites.forEach(item => {
          if (Number(item.id_favorite) === Number(this.id)) {
            active = true
          }
        })
        return active
      },
      watchUserFavorite() {
        return this.user ? this.user.favorites : ''
      }
    },
    methods: {
      async favoriteHandler() {
        if (!this.isActive) {
          let isId = JSON.parse(JSON.stringify(this.user.favorites)).filter(item => item.id_favorite === this.id).length ? true : false
          if (isId) {
            return false
          } else {
            await this.$store.dispatch('fetchUpdateUser', {
              id: this.user.id,
              object: {
                favorites: [...this.user.favorites, {
                  id_favorite: this.id
                }]
              },
              popup: false
            })
          }
        } else {
          await this.$store.dispatch('fetchUpdateUser', {
            id: this.user.id,
            object: {
              favorites: [...JSON.parse(JSON.stringify(this.user.favorites)).filter(item => Number(item.id_favorite) !== Number(this.id))]
            }
          })
        }
      },
      async updateFavoriteProducts(newValue) {
        let requestString = ''
        if (!newValue.length) return false
        newValue.forEach(item => {
          requestString += `&id_in=${item.id_favorite}`
        })

        if (newValue.length) {
          await this.$store.dispatch('catalog/FetchCatalogFavorites', requestString)
        } else {
          await this.$store.commit('catalog/FAVORITES', '')
          this.active = false
        }
      }
    },
    watch: {
      watchUserFavorite(newValue) {
        this.updateFavoriteProducts(newValue)
      }
    },

  }
</script>
