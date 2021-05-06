<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <Loader />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "~/components/UI/loader";
export default {
  name: 'redirect',
  components: {
    Loader
  },
  async mounted() {
    const request = await this.$axios.get(`/auth/google/callback${location.search}`)
    if (request.status === 200 && Object.keys(request.data).includes('jwt')) {
      this.$cookies.set('_uh', request.data.jwt, {
        path: '/',
      });

      if (!this.$cookies.get('_ui')) {
        this.$cookies.set('_ui', {id: request.data.user.id}, {
          path: '/',
        })
      }

      this.$store.commit('USER', request.data.user)
      this.$router.push('/user/personal-data?auth=false')
    }
  }
}
</script>