<template>
    <div v-if="settings" class="contacts__block">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="preview-block preview-block__transparent">
                        <div class="preview-block__title">
                            <h3>Контакты</h3>
                        </div>
                        <div class="contact__wrapper">
                            <div class="row no-gutters">
                                <div class="col-lg-5">
                                    <div class="contacts__content">
                                        <h3>{{settings.title}}</h3>
                                        <a :href="`tel:${removeSpace}`">{{settings.phone}}</a>
                                        <p>{{settings.addresse}}</p>
                                        e-mail: <a :href="`mailto:${settings.email}`">{{settings.email}}</a>
                                        <div class="social">
                                            <social />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-7">
                                        <yandex-map v-if="showMap" :settings="{apiKey: settings ? settings.api_key_map : '',lang: 'ru_RU',coordorder: 'latlong',version: '2.1'}" :coords="coord" zoom="12" :controls="[]">
                                            <ymap-marker marker-id="map-pl" marker-type="Placemark" :coords="coord" />
                                        </yandex-map>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="contacts__block">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2>Не корректные настройки приложения.</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import { yandexMap, ymapMarker } from 'vue-yandex-maps'
    import social from "~/components/social"
    export default {
        name: 'contactsPage',
        components: {
            social,
            yandexMap,
            ymapMarker
        },
        computed: {
            ...mapState({
                settings: state => state.settings
            }),
            removeSpace() {
                let { phone } = this.settings
                return phone.replace(/\s/g, "")
            },
            coord() {
                let lat = this.settings.coords_map.split(',')[0]
                let lag = this.settings.coords_map.split(',')[1]
                console.log(lat, lag)
                return [Number(lat), Number(lag)]
            },
            lat() {
                const [lat] = this.settings.coords_map
                return lat
            },
            lag() {
                const [,lag] = this.settings.coords_map
                return lag
            }
        },
        data: () => ({
           showMap: false
        }),
        mounted(){
            this.showMap = true
        }
    }
</script>

<style lang="scss">
    .ymap-container{
        height: 100%;
        @media (max-width:992px) {
            height: 360px;
        }
    }
</style>