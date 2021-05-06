<template>
    <div>
        <Breadcrumbs :chain="[{name:'Главная', url: '/'}, {name:'акции', url: ''}]" />
        <div class="acii__block">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="preview-block preview-block__transparent">
                            <div class="preview-block__title">
                                <h3>Акции</h3>
                            </div>
                            <div class="row">
                                <h4 v-if="data.length === 0">Акций не найдено.</h4>
                                <template v-else >
                                    <div v-for="acii of data" :key="acii.id" class="col-xl-3 col-lg-4 col-md-6">
                                        <div class="acii-item">
                                            <div v-if="acii.previewImage" class="acii-item__img">
                                                <nuxt-link :style="{backgroundImage: `url('${backURL+acii.previewImage.url}')`}" :to="'stocks/'+acii.slug"></nuxt-link>
                                            </div>
                                            <div v-else class="acii-item__img">
                                                <nuxt-link :style="{backgroundImage: `url('/no-image.jpg')`}" :to="'stocks/'+acii.slug"></nuxt-link>
                                            </div>
                                            <div :class="$moment() >= $moment(acii.to) ? 'disabled' : ''" class="acii-item__date">
                                                <template v-if="$moment() >= $moment(acii.to)">
                                                    Акция завершена - {{$moment(acii.to).format('DD.MM.YYYY')}}
                                                </template>
                                                <template v-else >
                                                    {{$moment(acii.from).format('DD.MM.YYYY')}} - {{$moment(acii.to).format('DD.MM.YYYY')}}
                                                </template>

                                            </div>
                                            <div class="acii-item__text">
                                                <h3><nuxt-link :to="'stocks/'+acii.slug">{{acii.title}}</nuxt-link></h3>
                                                <nuxt-link :to="'stocks/'+acii.slug" class="read">Подробнее...</nuxt-link>
                                            </div>
                                        </div>
                                    </div>
                                </template>
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
    export default {
        name: "stocks",
        components: {
            Breadcrumbs
        },
        head() {
            return {
                title: 'Акции' ,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'Fortistock акции'
                    },
                    {
                        hid: 'key',
                        name: 'key',
                        content: 'Fortistock, акции'
                    }
                ]
            }
        },
        async asyncData({$axios}) {
            const {status, data} = await $axios.get('/aciis')

            if (Number(status) === 200 ) {
                return { data }
            } else {
                return { data: [] }
            }

        },
        data: () => ({
            backURL: process.env.backURL
        }),
    }
</script>