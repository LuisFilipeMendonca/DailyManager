import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTasks,
  faStickyNote,
  faAddressCard,
  faCoins,
  faUserCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import router from "./routes";

import BaseCard from "./components/BaseCard";
import BaseButton from "./components/BaseButton";
import BaseForm from "./components/BaseForm";
import BaseInput from "./components/BaseInput";

const app = createApp(App);

library.add(faTasks);
library.add(faStickyNote);
library.add(faAddressCard);
library.add(faCoins);
library.add(faUserCircle);
library.add(faPlusCircle);

app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-form", BaseForm);
app.component("base-input", BaseInput);

app.mount("#app");
