<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="breadcrumbs">
          <ul>
            <li v-for="(item, index) of chain" :key="index" >
              <nuxt-link :to="item.url">{{item.name}}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'breadcrumbs',
    props: {
      chain: {
        type: Array,
        default: ['Главная'],
        required: true
      }
    }
  }
</script>
