<template>
  <section class="contact-form">
    <base-badge>
      <header class="contact-form__header">
        <h2>Add Contact</h2>
      </header>
      <form class="form">
        <div class="input-group">
          <input
            class="input-group__input"
            type="text"
            placeholder="Contact name"
            id="name"
          />
          <label class="input-group__label" for="name">Contact Name</label>
        </div>
        <div class="input-group">
          <input
            class="input-group__input"
            type="tel"
            placeholder="Contact phone"
            id="phone"
          />
          <label class="input-group__label" for="phone">Contact Phone</label>
        </div>
        <div class="input-group">
          <input
            class="input-group__input"
            type="email"
            placeholder="Contact Email"
            id="email"
          />
          <label class="input-group__label" for="email">Contact Email</label>
        </div>
        <div class="input-group">
          <input
            class="input-group__input"
            type="text"
            placeholder="Contact Address"
            id="address"
          />
          <label class="input-group__label" for="address"
            >Contact Address</label
          >
        </div>
        <div class="form__actions">
          <button type="submit">Add Contact</button>
        </div>
      </form>
    </base-badge>
  </section>
</template>

<script>
export default {
  created() {
    console.log(this.$route.params.id);
  },
};
</script>

<style scoped>
.contact-form {
  margin: 16px 0;
}

.contact-form__header {
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

.input-group {
  position: relative;
  margin-bottom: 40px;
}

.input-group__input {
  display: block;
  width: 100%;
  background-color: #454544;
  padding: 8px 16px;
  border-radius: 3px;
  color: #d1d1d0;
  border: 1px solid transparent;
  z-index: 1;
}

.input-group__input:focus {
  border-color: #d1d1d0;
}

.input-group__label {
  position: absolute;
  top: 0;
  left: 4px;
  opacity: 0;
  transform: translateY(0);
  transition: 0.2s ease-in;
  transition-property: opacity, transform;
}

.input-group__input:focus + .input-group__label,
.input-group__input:not(:placeholder-shown) + .input-group__label {
  opacity: 1;
  transform: translateY(-24px);
}
</style>
