import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTasks,
  faStickyNote,
  faAddressCard,
  faCoins,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import router from "./routes";

import BaseBadge from "./components/BaseBadge";
import BaseButton from "./components/BaseButton";

const app = createApp(App);

library.add(faTasks);
library.add(faStickyNote);
library.add(faAddressCard);
library.add(faCoins);
library.add(faUserCircle);

app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("base-badge", BaseBadge);
app.component("base-button", BaseButton);

app.mount("#app");
