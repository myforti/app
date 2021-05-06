<template>
    <div>
        <style>
            .site{
                height: 100%;

            }
            body{
                overflow: hidden;
            }
        </style>
        <div class="site">
            <div class="block__404-page">
                <div class="logo">
                    <a href="#">
                        <img src="~/assets/img/logo.svg" alt="">
                    </a>
                </div>
                <h1>404</h1>
                <h4>Страница не найдена</h4>
                <p>Страница, которую вы ищете, была перемещена, удалена или никогда не существовала. <br>Вернитесь на главную или воспользуйтесь поиском.</p>
                <div class="form__search">
                    <a href="#" class="btn btn-accent">На главную</a>
                    <form>
                        <div class="group-search">
                            <input type="text" placeholder="Поиск по каталогу">
                            <button>search</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "errorPage"
    }
</script>