<template>
    <div>
        <Breadcrumbs :chain="[{name: 'Главная', url: '/'}, {name: this.contentPage.title, url: ''}]" />
        <div v-if="contentPage" class="return__block">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="textgraph textgraph--flex textgraph--bg-white">
                            <h1>{{contentPage.title}}</h1>
                            <div v-html="content(contentPage.content)"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumbs from "~/components/UI/Breadcrumbs"
    import marked from "marked"
    export default {
        name: 'ForLegalEntitiesPage',
        components: {
            Breadcrumbs,
            marked
        },
        head() {
            return {
                title: this.contentPage.title ,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.contentPage.metaDescription
                    },
                    {
                        hid: 'key',
                        name: 'key',
                        content: this.contentPage.metaKey
                    }
                ]
            }
        },
        async fetch() {
            const { error } = this.$nuxt.context
            const { status, data } = await this.$axios.get('/partners')
            if (status !== 200) {
                error({statusCode: 404, message: 'Страница не найдена'})
            } else {
                this.contentPage = data
            }
        },
        data: () => ({
            contentPage: ''
        }),
        methods: {
            content(cont) {
                return marked(cont)
            }
        }

    }
</script>