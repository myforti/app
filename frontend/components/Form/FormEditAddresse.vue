<template>
    <div>
        <h3>Редактировать адрес</h3>
        <form @submit.prevent="submitHandler" class="form">
            <InputForm
                    :value.sync="form.index"
                    type="text"
                    placeholder="Индекс"
                    :error="error.index.length !== 0 ? {text: error.index, className: 'error'} : {}"
            />
            <InputForm
                    :value.sync="form.city"
                    type="text"
                    placeholder="Город *"
                    :error="error.city.length !== 0 ? {text: error.city, className: 'error'} : {}"
            />
            <InputForm
                    :value.sync="form.street"
                    type="text"
                    placeholder="Улица *"
                    :error="error.street.length !== 0 ? {text: error.street, className: 'error'} : {}"
            />
            <InputForm
                    :value.sync="form.house"
                    type="text"
                    placeholder="Дом *"
                    :error="error.house.length !== 0 ? {text: error.house, className: 'error'} : {}"
            />
            <InputForm
                    :value.sync="form.apartment"
                    type="text"
                    placeholder="Квартира или офис *"
                    :error="error.apartment.length !== 0 ? {text: error.apartment, className: 'error'} : {}"
            />
            <div class="form__bottom">
                <input type="submit" class="btn btn-primary" value="сохранить">
            </div>
        </form>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import InputForm from "~/components/Form/inputForm"
    export default {
        name: "FormEditAddresse",
        props: {
            id: {
                type: Number
            }
        },
        components: {
            InputForm
        },
        computed: {
            ...mapState({
                user: state => state.user
            }),
            addresseOnly() {
                let [item] = this.user.delivery_addresse.filter( item => Number(item.id) === this.id)
                return item
            },
            city() {
                return this.addresseOnly.city
            },
            street() {
                return this.addresseOnly.street
            },
            house() {
                return this.addresseOnly.house
            },
            apartment() {
                return this.addresseOnly.apartament
            },
        },
        data: () => ({
            form: {
                index: '',
                city: 'sdfsdf',
                street: '',
                house: '',
                apartment: ''
            },
            error: {
                index: '',
                city: '',
                street: '',
                house: '',
                apartment: ''
            }
        }),
        methods: {
            validate() {
                if (this.form.city.length === 0) {
                    this.error.city = 'Поле не должно быть пустым'
                } else {
                    this.error.city = ''
                }
                if (this.form.street.length === 0) {
                    this.error.street = 'Поле не должно быть пустым'
                } else {
                    this.error.street = ''
                }
                if (this.form.house.length === 0) {
                    this.error.house = 'Поле не должно быть пустым'
                } else {
                    this.error.house = ''
                }
                if (this.form.apartment.length === 0) {
                    this.error.apartment = 'Поле не должно быть пустым'
                } else {
                    this.error.apartment = ''
                }
            },
            async submitHandler() {
                this.validate()

                if (this.form.city.length && this.form.street.length && this.form.house.length && this.form.apartment.length) {
                    let update_delivery = [...this.user.delivery_addresse.filter( item => Number(item.id) !== this.id), {
                        index: this.form.index,
                        city: this.form.city,
                        street: this.form.street,
                        house: this.form.house,
                        apartament: this.form.apartment
                    }]

                    const { status , data } = await this.$axios.put(`/users/${this.user.id}`,JSON.stringify({
                        delivery_addresse: update_delivery
                    }), {
                        headers: {
                            Authorization: 'Bearer '+this.$cookies.get('_uh')
                        }
                    })
                    if (status === 200) {
                        this.$store.commit('USER', data)
                        this.$store.commit('ui/TYPEPOPUPS', {
                            state: 'editAddresse',
                            value: false
                        })
                    }
                }
            }
        },
        watch: {
            city(newValue) {
                if (newValue.length) {
                    this.error.city = ''
                }
            },
            street(newValue) {
                if (newValue.length) {
                    this.error.street = ''
                }
            },
            house(newValue) {
                if (newValue.length) {
                    this.error.house = ''
                }
            },
            apartment(newValue) {
                if (newValue.length) {
                    this.error.apartment = ''
                }
            }
        },
        async mounted() {
            //if (!this.addresseOnly) return false
            if (this.addresseOnly.index) {
                this.form.index = this.addresseOnly.index
            }
            this.form.city = this.addresseOnly.city
            this.form.street = this.addresseOnly.street
            this.form.house = this.addresseOnly.house
            this.form.apartment = this.addresseOnly.apartament
        }
    }
</script>