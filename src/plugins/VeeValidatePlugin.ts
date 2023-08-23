import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import rules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import { getDeviceLanguageCode } from "@/helpers/deviceInfo.js";

import defaultVeeTranslation from "./VeeValidateTranslations/en-US.json";
import locales from "@/data/locales.json";

export default {
  install: (app: any) => {
    // Define all default rules from @vee-validate/rules
    Object.keys(rules).forEach((rule) => {
      defineRule(rule, rules[rule]);
    });

    // Set en-US as translation for all languages to ensure default is working well
    for (const locale in locales) {
      configure({
        generateMessage: localize(locale, { messages: defaultVeeTranslation.messages }),
      });
    }

    //Import all translations from adjacent folder
    (async () => {
      const imports = import.meta.glob("./VeeValidateTranslations/*.json");
      for (const path in imports) {
        const language: any = await imports[path]();
        const code = language.code;
        const messages = { messages: language.messages };
        configure({
          generateMessage: localize(code, messages),
        });
      }
      // default language in case no new language is set
      setLocale((await getDeviceLanguageCode()).toString());
    })();

    // register components to app (global)
    app.component("VeeForm", Form);
    app.component("VeeField", Field);
    app.component("VeeErrorMessage", ErrorMessage);
  },
};
