<template>
  <router-view></router-view>
  <section class="contacts">
    <base-card>
      <header class="contacts-header">
        <h1 class="contacts-header__title">Contacts</h1>
        <base-button :isLink="true" mode="outline" path="/contacts/add"
          >Add Contact</base-button
        >
      </header>
    </base-card>
    <base-spinner v-if="isLoading" />
    <ul class="contacts-menu" v-else>
      <contact-item
        v-for="contact in contactsList"
        :key="contact.id"
        :id="contact.id"
        :name="contact.name"
        :email="contact.email"
        :phone="contact.phone"
        :address="contact.address"
        :photo="contact.photo"
        :photoUrl="contact.photoUrl"
      ></contact-item>
    </ul>
  </section>
</template>

<script>
import ContactItem from "../components/ContactItem";

export default {
  components: {
    "contact-item": ContactItem,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    contactsList() {
      return this.$store.getters["contacts/getContacts"];
    },
  },
  methods: {
    async fetchContacts() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("contacts/getContacts");
      } catch (e) {
        console.log(e);
      }
      this.isLoading = false;
    },
  },
  created() {
    this.fetchContacts();
  },
};
</script>

<style scoped>
.contacts {
  width: 100%;
  padding: 24px 0;
}

.contacts-header {
  display: flex;
  justify-content: space-between;
  padding: 16px;
}

.contacts-menu {
  margin-top: 16px;
}

.contacts-menu > *:not(:last-child) {
  margin-bottom: 16px;
}
</style>
