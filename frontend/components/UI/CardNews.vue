<template>
    <div v-if="newItem" class="news-item">
        <div>
          <template v-if="newItem.custom_date !== null">
            <div class="date">{{$moment(newItem.custom_date).format('DD.MM.YYYY')}}</div>
          </template>
          <template v-else >
            <div class="date">{{$moment(newItem.published_at).format('DD.MM.YYYY')}}</div>
          </template>
            <h3><nuxt-link :to="/news/+newItem.slug">{{newItem.title}}</nuxt-link></h3>
            <p>{{newItem.description}}</p>
        </div>
        <div>
            <nuxt-link class="read" :to="/news/+newItem.slug">Подробнее...</nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CardNews",
        props: {
            newItem: {
                type: Object
            }
        }
    }
</script>