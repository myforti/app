<template>
  <div class="info__block">
    <div class="container">
      <div class="row">
        <div v-for="item of info" class="col-xl-3 col-lg-4 col-md-6">
          <div class="info__block-item">
            <img v-if="item.icon" :src="backURL+item.icon.url" :alt="item.icon.name">
            <img v-else src="/no-image.jpg" alt="no-image">
            <h4>{{item.title}}</h4>
            <p>{{item.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Info",
    props:{
      info: {
        type: Array
      }
    },
    data: () => ({
      backURL: process.env.backURL
    })
  }
</script>
