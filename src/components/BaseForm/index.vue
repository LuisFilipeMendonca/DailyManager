<template>
  <section class="section-form">
    <base-card>
      <header class="form__header">
        <slot name="form-header" />
      </header>
      <form class="form" @submit.prevent="submitHandler">
        <slot name="form-inputs" />
        <div class="form__actions">
          <base-button mode="flatten" type="submit">{{
            submitDescription
          }}</base-button>
          <slot name="form-aditional-action" />
        </div>
      </form>
    </base-card>
  </section>
</template>

<script>
export default {
  props: ["submitDescription", "submitHandler"],
};
</script>

<style scoped>
.form__header {
  padding: 16px;
  text-align: center;
}

.form {
  padding: 16px;
}

.form__actions {
  display: flex;
  justify-content: center;
}

.form__actions > *:not(:last-child) {
  margin-right: 16px;
}
</style>
