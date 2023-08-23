import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import i18n from "./i18n-setup";

import { initializeApp } from "firebase/app";
import rtDatabase from "./stores/rtDatabase.js";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import firebaseConfig from "@/config/firebaseConfig.js";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import { isNative } from "./helpers/deviceInfo.js";
import nativeAppBoot from "./helpers/nativeAppBoot.js";
(async () => {
  if (await isNative()) nativeAppBoot();
})();

/* Initialize Firebase */
const firebaseApp = initializeApp(firebaseConfig);
rtDatabase.initDatabse(firebaseApp);
const analytics = getAnalytics(firebaseApp);

/* Initialize vue app */
import VeeValidatePlugin from "./plugins/VeeValidatePlugin";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
getAuth(firebaseApp);

app.use(IonicVue);
app.use(i18n);
app.use(VeeValidatePlugin);
app.use(router);

router.isReady().then(() => {
  app.mount("#app");
});
