<template>
    <form @submit.prevent="submitHandler">
        <div class="group-search">
            <input type="text" v-model="searchValue" placeholder="Поиск по каталогу">
            <button :disabled="searchValue.length < 3">search</button>
        </div>
    </form>
</template>

<script>
    export default {
        name: "search",
        data: () => ({
            searchValue: ''
        }),
        methods:{
            submitHandler() {
                if (this.$route.path !== '/search') {
                    this.$router.push('/search?search='+this.searchValue)
                } else {
                    this.$router.push('?search='+this.searchValue)
                }

              this.$yandexMetrika.reachGoal('748970625')
            }
        },
        mounted() {
            if (this.$route.query.search) {
                this.searchValue = this.$route.query.search
            }
        }
    }
</script>