<template>
    <div>
        <div class="block__404-page">
            <div class="logo">
                <a href="/">
                    <img src="~/assets/img/logo.svg" alt="">
                </a>
            </div>

            <template v-if="error.statusCode === 404">
                <h1>404</h1>
                <h4>Страница не найдена</h4>
                <p>Страница, которую вы ищете, была перемещена, удалена или никогда не существовала. <br>Вернитесь на главную или воспользуйтесь поиском.</p>
            </template>
            <template v-else >
                <h1>Произошла ошибка</h1>
                <h4>{{error.statusCode}}</h4>
                <p>Вернитесь на главную или воспользуйтесь поиском.</p>
            </template>
            <div class="form__search">
                <a href="/" class="btn btn-accent">На главную</a>
                <form>
                    <div class="group-search">
                        <input type="text" placeholder="Поиск по каталогу">
                        <button>search</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['error'],
        layout: 'empty'
    }
</script>