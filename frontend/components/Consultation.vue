<template>
  <div class="consultaion__block">
    <div class="container">
      <div class="row">
        <div class="col-xl-3">
          <div class="consultaion__block-title">
            <h3>Нужна <br>консультация?</h3>
            <p>Оставьте заявку</p>
          </div>
        </div>
        <div class="col-xl-9">
          <FormConsultation />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FormConsultation from "~/components/Form/FormConsultation"
  export default {
    name: "Consultation",
    components: {
      FormConsultation
    }
  }
</script>

<style lang="scss">
  .consultaion__block-form{
    .fieldset{
      display: flex;
      flex-direction: column;
      .message{
        order: 2;
      }
      input{
        order: 1;
      }
    }
  }
</style>
