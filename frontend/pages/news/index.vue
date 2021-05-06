<template>
    <div>
        <Breadcrumbs :chain="[{name: 'Главная', url: '/'}, {name: 'новости', url: '/news'}]" />
        <div class="container news-page">
            <div class="row">
                <div class="col-12">
                    <div class="preview-block preview-block__transparent">
                        <div class="preview-block__title">
                            <h3>Новости</h3>
                        </div>
                        <div v-if="newsList.length" class="row custom-row-10">
                            <div v-for="news of newsList" class="col-xl-3 col-lg-4 col-md-6">
                                <CardNews :new-item="news" />
                            </div>
                        </div>
                        <div v-else class="row">
                            <div class="col-12">
                                <h3>Категория пуста</h3>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumbs from "~/components/UI/Breadcrumbs"
    import CardNews from "~/components/UI/CardNews"
    export default {
        name: 'newsPage',
        components: {
            Breadcrumbs,
            CardNews
        },
        data: () => ({
            newsList: []
        }),
        head() {
          return {
              title: 'Новости',
              meta: [
                  {
                      hid: 'description',
                      name: 'description',
                      content: 'Fortistock новости'
                  },
                  {
                      hid: 'key',
                      name: 'key',
                      content: 'Fortistock, новости'
                  }
              ]
          }
        },
        async fetch() {
            const { status, data } = await this.$axios.get('/news-lists')
            if (Number(status) === 200) {
                this.newsList = data
            }
        }
    }
</script>