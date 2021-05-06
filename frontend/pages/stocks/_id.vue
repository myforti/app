<template>
    <div>
        <Breadcrumbs :chain="[{name:'Главная', url: '/'},{name: 'акции', url: '/stocks'}, {name: this.item.title.toLowerCase() , url: ''} ]" />
        <div class="acii__block-inner">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9">
                        <div class="textgraph textgraph--flex textgraph--bg-white">
                            <div>
                                <div  class="textgraph__preview-images">
                                    <img v-if="this.item.mainImage" :src="backendURL + item.mainImage.url" :alt="item.title">
                                    <div :class="$moment() > $moment(item.to) ? 'disabled' : ''" class="acii-item__date">
                                        <template v-if="$moment() > $moment(item.to)">
                                            Акция завершена - {{$moment(item.to).format('DD.MM.YYYY')}}
                                        </template>
                                        <template v-else >
                                            {{$moment(item.from).format('DD.MM.YYYY')}} - {{$moment(item.to).format('DD.MM.YYYY')}}
                                        </template>
                                    </div>
                                </div>
                                <div class="date">{{$moment(item.from).format('DD.MM.YYYY')}} - {{$moment(item.to).format('DD.MM.YYYY')}}</div>
                                <h1>{{item.title}}</h1>
                                <div v-html="markedContent(item.content)"></div>
                            </div>
                        </div>
                    </div>
                    <div v-if="dataAll.length" class="col-lg-3">
                        <div class="column-aside d-none d-lg-block">
                            <div v-for="stock of dataAll" class="acii-item">
                                <div v-if="stock.previewImage" class="acii-item__img">
                                    <nuxt-link :style="{backgroundImage: `url('${backendURL+stock.previewImage.url}')`}" :to="'/stocks/' + stock.slug"></nuxt-link>
                                </div>
                                <div v-else class="acii-item__img">
                                    <a style="background-image: url('/no-image.jpg');":to="'/stocks/' + stock.slug"></a>
                                </div>
                                <div :class="$moment() > $moment(stock.to) ? 'disabled' : ''" class="acii-item__date">
                                    <template v-if="$moment() > $moment(stock.to)">
                                        Акция завершена - {{$moment(stock.to).format('DD.MM.YYYY')}}
                                    </template>
                                    <template v-else >
                                        {{$moment(stock.from).format('DD.MM.YYYY')}} - {{$moment(stock.to).format('DD.MM.YYYY')}}
                                    </template>
                                </div>
                                <div class="acii-item__text">
                                    <h3><nuxt-link :to="'/stocks/' + stock.slug">{{stock.title}}</nuxt-link></h3>
                                    <nuxt-link :to="'/stocks/' + stock.slug" class="read">Подробнее...</nuxt-link>
                                </div>
                            </div>
                        </div>
                        <StockCarousel v-if="dataAll.length" :data-all="dataAll" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import marked from "marked"
    import Breadcrumbs from "~/components/UI/Breadcrumbs"
    import StockCarousel from "~/components/StockCarousel"
    export default {
        name: "stockIdPage",
        head() {
            return {
                title: this.item.title ,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.item.metaDescription
                    },
                    {
                        hid: 'key',
                        name: 'key',
                        content: this.item.mataKey
                    }
                ]
            }
        },
        async asyncData({$axios, app}) {
            const all = {}
            const { route, error } = app.context
            const {status, data} = await $axios.get(`/aciis?slug=${route.params.id}`)
            const req = await $axios.get(`/aciis?slug_nin=${route.params.id}&_limit=3`)

            if (Number(status) === 200 || Number(req.status) === 200) {
                const [item] = data
                if (item) {
                    if (req.data) {
                        return {
                            item,
                            dataAll: req.data
                        }
                    } else {
                        return {
                            item,
                            dataAll: []
                        }
                    }

                } else {
                    await error({statusCode: 404, message: 'Страница не найдена'})
                }
            } else {
                await error({statusCode: 404, message: 'Страница не найдена'})
            }
        },
        components: {
            Breadcrumbs,
            marked,
            StockCarousel
        },
        computed: {
        },
        data: () => ({
            backendURL: process.env.backURL
        }),
        methods: {
            markedContent(content) {
                return marked(content)
            }
        },

    }
</script>