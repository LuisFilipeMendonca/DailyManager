<template>
  <base-card>
    <li class="item">
      <div class="item__header">
        <span class="item__img" :class="{ 'item__img--icon': !photo }">
          <font-awesome-icon icon="user-circle" v-if="!photo" />
          <img :src="photoUrl" alt="contact photo" v-else />
        </span>
        <h2 class="item__name">{{ name }}</h2>
      </div>
      <div class="item__content">
        <div class="item__details" :class="{ 'item__details--hide': !isOpen }">
          <h2 class="item__name--md">{{ name }}</h2>
          <p v-if="email"><b>Email:</b> {{ email }}</p>
          <p v-if="phone"><b>Phone:</b> {{ phone }}</p>
          <p v-if="address"><b>Address:</b> {{ address }}</p>
          <p v-if="hasNoDetails">No details to show.</p>
        </div>
        <div class="item__actions">
          <base-button
            class="btn--hide"
            mode="primary"
            @click="toggleDetailsHandler"
            >{{ isOpen ? "Hide" : "Show" }}</base-button
          >
          <base-button mode="secondary" :isLink="true" :path="editLink"
            >Edit</base-button
          >
          <base-button mode="danger" :clickHandler="deleteContact"
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
  inject: ["errorHandler"],
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    editLink() {
      return `/contacts/edit/${this.id}`;
    },
    hasNoDetails() {
      return !this.email && !this.phone && !this.address;
    },
  },
  methods: {
    async deleteContact() {
      try {
        await this.$store.dispatch("contacts/deleteContact", this.id);
      } catch (e) {
        this.errorHandler(e, {
          redirect: {
            name: "Authentication",
            query: { redirect: this.$route.path },
          },
        });
      }
    },
    toggleDetailsHandler() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
}

.item__header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.item__img {
  display: flex;
  height: 48px;
  width: 48px;
  margin-right: 16px;
}

.item__img--icon {
  font-size: 48px;
}

.item__img img {
  width: 48px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.item__name {
  overflow: hidden;
  text-overflow: ellipsis;
}

.item__name--md {
  display: none;
}

.item__details {
  padding: 8px 0;
  border-top: 1px solid var(--secondary);
  display: block;
}

.item__details--hide {
  display: none;
}

.item__details > *:not(:last-child) {
  margin-bottom: 8px;
}

.item__actions {
  margin-top: 8px;
}

.item__actions > *:not(:last-child) {
  margin-right: 16px;
}

@media screen and (min-width: 576px) {
  .item {
    flex-direction: row;
    align-items: center;
  }

  .item__header {
    flex-direction: column-reverse;
    width: 150px;
    margin-bottom: 0;
  }

  .item__img {
    margin-top: 8px;
    margin-right: 0;
    width: 80px;
    height: 80px;
    font-size: 64px;
  }

  .item__img img {
    width: 100%;
  }

  .item__name {
    width: 100%;
    text-align: center;
  }

  .item__details,
  .item__details--hide {
    display: block;
    border-top: none;
    padding: 0;
  }

  .item__content {
    margin-left: 16px;
    border-left: 1px solid var(--secondary);
    padding: 16px;
  }

  .item__actions {
    margin-top: 16px;
  }

  .btn--hide {
    display: none;
  }

  @media screen and (min-width: 700px) {
    .item__content {
      display: flex;
      justify-content: space-between;
      flex: 1;
      padding: 0;
    }

    .item__img {
      margin-top: 0;
      width: 96px;
      height: 96px;
      font-size: 96px;
    }

    .item__name {
      display: none;
    }

    .item__name--md {
      display: block;
    }

    .item__details {
      padding: 0 16px;
    }

    .item__actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 0;
      padding: 16px 0 16px 16px;
      border-left: 1px solid var(--secondary);
    }

    .item__actions > *:not(:last-child) {
      margin-right: 0;
      margin-bottom: 8px;
    }
  }
}
</style>
