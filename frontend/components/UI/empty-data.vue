<template>
  <div class="alert-user">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <h3>Пока здесь ничего нет</h3>
        <p>Добавьте новые товары из каталога</p>
        <div class="group-btn">
          <nuxt-link to="/catalog" class="btn btn-primary">Перейти в каталог</nuxt-link>
          <div class="form__search">
            <Search />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from "~/components/Search";
  export default {
    name: "emptyData",
    components: {
      Search
    }

  }
</script>
