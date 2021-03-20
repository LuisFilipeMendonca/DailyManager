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
    <div class="spinner" v-if="isLoading">
      <base-spinner />
    </div>
    <p class="contacts__empty" v-else-if="!isLoading && !hasContacts">
      You have no contacts yet, start adding them.
    </p>
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
    hasContacts() {
      return this.$store.getters["contacts/hasContacts"];
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
    if (this.hasContacts) return;
    this.fetchContacts();
  },
};
</script>

<style scoped>
.badge {
  padding: 16px;
}

.section > *:not(:last-child) {
  margin-bottom: 16px;
}

.spinner {
  display: flex;
  justify-content: center;
}

.contacts-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.contacts__empty {
  text-align: center;
}

.contacts-menu > *:not(:last-child) {
  margin-bottom: 16px;
}

@media screen and (min-width: 768px) {
  .section > *:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>
