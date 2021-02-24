<template>
  <section class="contacts">
    <header class="contacts-header">
      <h1 class="contacts-header__title">Contacts</h1>
      <p class="contacts-header__subtitle">Add a new contact here</p>
    </header>
    <ul class="contacts-menu">
      <contact-item
        v-for="contact in contacts"
        :key="contact.id"
        :name="contact.name"
        :email="contact.email"
        :phone="contact.phone"
        :address="contact.address"
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
      contacts: [
        {
          photo: null,
          id: 1,
          name: "Filipe",
          email: "filipe@teste.com",
          phone: "962068557",
          address: "",
        },
        {
          photo: null,
          id: 2,
          name: "Luis",
          email: "luis@teste.com",
          phone: "968151184",
          address: "Caminho da Cancela nº 10",
        },
      ],
    };
  },
};
</script>

<style scoped>
.contacts {
  width: 100%;
}

.contacts-menu {
  margin-top: 64px;
}

.contacts-menu > *:not(:last-child) {
  margin-bottom: 16px;
}
</style>
