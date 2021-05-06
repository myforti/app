<template>
  <div :class="isClass ? isClass : ''" class="fieldset">
    <span class="message" v-if="error">{{error.text}}</span>
    <template v-if="type === 'tel'">
      <input @input="inputHandler" :value="value" :type="type" v-mask="'+7 (###) ###-##-##'"  :placeholder="placeholder" />
    </template>
    <template v-else >
      <input @input="inputHandler" :value="value" :type="type"  :placeholder="placeholder" />
    </template>
  </div>
</template>

<script>
  export default {
    name: "inputForm",
    props: {
      placeholder: {
        type: String,
        default: "placegolder"
      },
      type:{
        type: String,
        default: "text"
      },
      addClass:{
        type: String,
        default: ""
      },
      value:{
        type: String,
        default: ""
      },
      error:{
        type: Object
      }
    },
    computed: {
      isClass() {
        let className = ''
        if (Object.keys(this.error).length) {
          className += this.error.className+' '
        }
        if (Object.keys(this.addClass).length) {
          className += this.addClass+' '
        }
        return className ? className.trim() : false
      },
    },
    data: () => ({
      values: ""
    }),
    methods: {
      inputHandler(e) {
        this.$emit('update:value', e.target.value)
      }
    },
    create() {
      if (this.value.length !== 0) {

      }
    }
  }
</script>

<style lang="scss">
  .fieldset{
    .message{
      font-size: 14px;
      display: block;
      margin-bottom: 5px;
    }
    &.error{
      position: relative;
      &::before{
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        right: 25px;
        bottom: calc(50% - 17px);
        background-image: url('~assets/img/icons/error.svg');
        background-size: cover;
      }
      .message{
        color: #ff4242;
      }
      input{
        padding-right: 50px;
        border-color: #FF4242;
        color: #ff4242;
        &::placeholder{
          color: #ff4242;
        }
      }
    }
  }
</style>
