<template>
    <div>
        <Breadcrumbs :chain="[{name:'Главная', url:'/'}, {name:'новости', url:'/news'}, {name: itemNews.title, url:''},]" />
        <div class="acii__block-inner">
        <div class="container">
            <div class="row">
                <div class="col-lg-9">
                    <div class="textgraph textgraph--flex textgraph--bg-white">
                        <div>
                          <template v-if="itemNews.custom_date !== null">
                            <div class="date">{{$moment(itemNews.custom_date).format('DD.MM.YYYY')}}</div>
                          </template>
                          <template v-else >
                            <div class="date">{{$moment(itemNews.published_at).format('DD.MM.YYYY')}}</div>
                          </template>
                            <h1>{{itemNews.title}}</h1>
                            <div v-if="itemNews.content" v-html="markedContent(itemNews.content)"></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="column-aside d-none d-lg-block">
                        <h4>Другие новости</h4>
                        <template v-if="itemsAll.length">
                            <template v-for="items of itemsAll">
                                <CardNews :new-item="items" />
                            </template>
                        </template>
                    </div>
                    <div v-if="itemsAll.length" class="column-aside column-aside--carousel d-lg-none">
                        <CarouselNews :items="itemsAll" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import marked from "marked"
    import Breadcrumbs from "~/components/UI/Breadcrumbs"
    import CardNews from "~/components/UI/CardNews"
    import CarouselNews from "~/components/UI/CarouselNews"
    export default {
        name: 'idNews',
        components: {
            Breadcrumbs,
            CardNews,
            CarouselNews
        },
        data: () => ({
            itemNews: '',
            itemsAll: [],
            backendURL: process.env.backURL
        }),
        head() {
            return {
                title: this.itemNews.title,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.itemNews.metaDescription
                    },
                    {
                        hid: 'key',
                        name: 'key',
                        content: this.itemNews.metaKey
                    }
                ]
            }
        },
        async fetch() {
            const { route, error } = this.$nuxt.context
            const { status, data } = await this.$axios.get(`/news-lists?slug=${route.params.id}`)
            const req = await this.$axios.get(`/news-lists?slug_nin=${route.params.id}&_limit=3`)
            if(Number(status) === 200 || Number(req.status) === 200) {
                if (!data.length) {
                    error({statusCode: 404, message: 'Страница не найдена'})
                } else {
                    [this.itemNews] = data
                    this.itemsAll = req.data
                }
            } else {
                error({statusCode: 404, message: 'Страница не найдена'})
            }
        },
        methods: {
            markedContent(content) {
                let text = content.replace(/!\[(.*)\)/g, (match, p1, p2, p3, offset, string) => {
                    let link = match.replace(/!\[(.*)]/g, '').slice(1,-1)
                    let name = match.replace(/]\(.*\)/g, '').slice(2)
                    return `<div class="images"><img src="${this.backendURL+link}" alt="${name}"><span>${name}</span></div>`
                })
                return marked(text)
            }
        }
    }
</script>