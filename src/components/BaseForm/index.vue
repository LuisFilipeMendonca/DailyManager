<template>
  <base-card>
    <header class="form__header">
      <slot name="form-header" />
    </header>
    <form class="form" @submit.prevent="submitHandler">
      <slot name="form-inputs" />
      <div class="form__actions">
        <base-button mode="primary" type="submit" :isLoading="isBtnLoading">{{
          submitDescription
        }}</base-button>
        <slot name="form-aditional-action" />
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  props: ["submitDescription", "submitHandler", "isBtnLoading"],
};
</script>

<style scoped>
.form__header {
  padding: 16px;
  text-align: center;
  color: var(--light);
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

@media screen and (min-width: 576px) {
  .form {
    padding: 16px 32px;
  }
}

@media screen and (min-width: 768px) {
  .form {
    padding: 16px 64px;
  }
}

@media screen and (min-width: 992px) {
  .form {
    padding: 16px 128px;
  }
}
</style>
