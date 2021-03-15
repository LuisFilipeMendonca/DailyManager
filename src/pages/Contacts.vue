<template>
  <router-view></router-view>
  <section class="section">
    <base-card>
      <header class="contacts-header">
        <h1 class="contacts-header__title">Contacts</h1>
        <base-button :isLink="true" mode="outline" path="/contacts/add"
          >Add Contact</base-button
        >
      </header>
      <div class="contacts__filter">
        <base-input
          id="filter"
          :type="filter.type"
          :placeholder="filter.placeholder"
          :value="filter.value"
          classValue="mb-none"
          :noLabel="true"
          :isValid="true"
          @change-handler="changeHandler"
        />
      </div>
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
      filter: {
        type: "text",
        value: "",
        placeholder: "Find Contact",
      },
    };
  },
  computed: {
    contactsList() {
      const regex = new RegExp(`^${this.filter.value}`, "i");
      let contacts = this.$store.getters["contacts/getContacts"];

      if (this.filter.value) {
        contacts = contacts.filter((contact) => regex.test(contact.name));
      }

      return contacts;
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
    changeHandler(target) {
      this.filter.value = target.value;
    },
  },
  created() {
    this.fetchContacts();
  },
};
</script>

<style scoped>
.badge {
  padding: 16px;
}

.contacts-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.contacts-menu {
  margin-top: 16px;
}

.contacts-menu > *:not(:last-child) {
  margin-bottom: 16px;
}

@media screen and (min-width: 768px) {
  .contacts-menu {
    margin-top: 24px;
  }
}
</style>
