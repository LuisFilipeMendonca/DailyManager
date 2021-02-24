import { createApp } from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTasks,
  faStickyNote,
  faAddressCard,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

library.add(faTasks);
library.add(faStickyNote);
library.add(faAddressCard);
library.add(faCoins);

console.log(library);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
