<template>
    <ul>
        <li v-for="social of socials">
            <template v-if="social.nameNetwork === 'vk'">
                <a target="_blank" :href="social.link">
                    <svg>
                        <use :xlink:href="`#${social.nameNetwork}-svg`"></use>
                    </svg>
                </a>
            </template>
            <template v-if="social.nameNetwork === 'ok'">
                <a target="_blank" :href="social.link">
                    <svg>
                        <use :xlink:href="`#odn-svg`"></use>
                    </svg>
                </a>
            </template>
            <template v-if="social.nameNetwork === 'fb'">
                <a target="_blank" :href="social.link">
                    <svg>
                        <use :xlink:href="`#${social.nameNetwork}-svg`"></use>
                    </svg>
                </a>
            </template>
          <template v-if="social.nameNetwork === 'instagram'">
            <a target="_blank" :href="social.link">
              <svg>
                <use :xlink:href="`#${social.nameNetwork}-svg`"></use>
              </svg>
            </a>
          </template>
        </li>
    </ul>
</template>

<script>
    import { mapState } from "vuex"
    export default {
        name: "social",
        computed:{
            ...mapState({
                socials: state => state.settings.social
            })
        }

    }
</script>