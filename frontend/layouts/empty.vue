<template>
    <div>
        <style>
            #__layout > div > div,
            #__layout > div,
            #__layout,
            #__nuxt,
            .site{
                height: 100%;
            }
            body{
                overflow: hidden;
            }
        </style>

        <Nuxt />
    </div>
</template>

<script>
    export default {
        name: "empty",
        //props: ['error']
    }
</script>