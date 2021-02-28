<template>
  <base-card>
    <li class="contacts-item">
      <span class="contacts-item__icon" v-if="!photo">
        <font-awesome-icon icon="user-circle" />
      </span>
      <div class="contacts-item__photo" v-else>
        <img :src="photoUrl" alt="contact photo" />
      </div>
      <div class="contacts-item__details">
        <h2 class="contacts-item__name">{{ name }}</h2>
        <p><span class="bold">Email:</span> {{ email }}</p>
        <p><span class="bold">Phone:</span> {{ phone }}</p>
        <p><span class="bold">Address:</span> {{ address }}</p>
        <div class="btn-container">
          <base-button mode="flatten" :isLink="true" :path="editLink"
            >Edit</base-button
          >
          <base-button mode="unstyled" :clickHandler="deleteContact"
            >Delete</base-button
          >
        </div>
      </div>
    </li>
  </base-card>
</template>

<script>
export default {
  props: ["id", "name", "email", "phone", "address", "photo", "photoUrl"],
  computed: {
    editLink() {
      return `/contacts/edit/${this.id}`;
    },
  },
  methods: {
    deleteContact() {
      this.$store.dispatch("contacts/deleteContact", this.id);
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

.contacts-item__photo {
  display: block;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 16px;
}

.contacts-item__photo img {
  height: 100%;
  width: 100%;
  display: block;
  object-fit: cover;
}

.contacts-item__details {
  padding: 0 16px;
  border-left: 1px solid #d1d1d0;
  flex: 1;
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
