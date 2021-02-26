<template>
  <base-card>
    <li class="contacts-item">
      <span class="contacts-item__icon">
        <font-awesome-icon icon="user-circle" />
      </span>
      <div class="contacts-item__details">
        <h2 class="contacts-item__name">{{ name }}</h2>
        <p><span class="bold">Email:</span> {{ email }}</p>
        <p><span class="bold">Phone:</span> {{ phone }}</p>
        <template v-if="address">
          <p><span class="bold">Address:</span> {{ address }}</p>
        </template>
        <div class="btn-container">
          <base-button mode="flatten" :isLink="true" :path="editLink"
            >Edit</base-button
          >
          <base-button mode="unstyled">Delete</base-button>
        </div>
      </div>
    </li>
  </base-card>
</template>

<script>
export default {
  props: ["id", "name", "email", "phone", "address"],
  computed: {
    editLink() {
      return `/contacts/edit/${this.id}`;
    },
  },
};
</script>

<style scoped>
.contacts-item {
  padding: 16px 0;
  display: flex;
  align-items: center;
}

.contacts-item__icon {
  font-size: 4rem;
  padding: 0 32px;
}

.contacts-item__details {
  padding: 0 16px;
  border-left: 1px solid #d1d1d0;
  width: 100%;
  text-align: left;
}

.contacts-item__details > *:not(:last-child):not(:first-child) {
  margin-bottom: 8px;
}

.contacts-item__name {
  text-align: center;
  margin-bottom: 16px;
}

.bold {
  font-weight: bold;
}

.btn-container {
  display: flex;
}

.btn-container > *:not(:last-child) {
  margin-right: 16px;
}
</style>
