import { createI18n } from "vue-i18n";
import { getDeviceLanguageCode } from "./helpers/deviceInfo.js";
import messages from "./globalMessages.i18n.json";

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: (await getDeviceLanguageCode()).toString(), // set locale
  fallbackLocale: "en", // set fallback locale
  fallbackWarn: false,
  missingWarn: false,
  warnHtmlMessage: false,
  messages: messages,
  numberFormats: {
    en: {
      currency: {
        style: "currency",
        currency: "USD",
      },
    },
    sl: {
      currency: {
        style: "currency",
        currency: "EUR",
      },
    },
  },
});

export default i18n;
