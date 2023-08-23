import { acceptHMRUpdate, defineStore } from "pinia";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import { IUser } from "@/types/userInterface";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { Capacitor } from "@capacitor/core";
import { Purchases } from "@awesome-cordova-plugins/purchases";
import { isNative } from "@/helpers/deviceInfo";
import rtDatabase from "./rtDatabase";
import { ref, onValue, set } from "firebase/database";
const db = rtDatabase.getDatabase();

export const useUserStore = defineStore("UserStore", {
  state: () => ({ user: undefined as IUser | undefined }),
  actions: {
    async loadUser(userId: string) {
      if (!db) throw new Error("Database not initialized");

      const userRef = ref(db, `users/${userId}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        try {
          // check if data is of type IUser
          if (typeof data.email !== "string") throw new Error("email is not of type string");
          if (typeof data.premiumCharacters !== "number") throw new Error("premiumCharacters is not of type number");
          if (typeof data.reloadDate !== "number") throw new Error("reloadDate is not of type number");
          if (typeof data.standardCharacters !== "number") throw new Error("standardCharacters is not of type number");
          if (data.subscription !== undefined) {
            if (typeof data.subscription.expiryDate !== "number") throw new Error("expiryDate is not of type number");
            if (typeof data.subscription.purchaseDate !== "number")
              throw new Error("purchaseDate is not of type number");
            if (typeof data.subscription.subscriptionId !== "string")
              throw new Error("subscriptionId is not of type string");
          }
          this.setUser({ ...data, id: userId });
        } catch (err: any) {
          console.log(err);
          this.initializeUser();
        }
      });
    },
    setUser(user: IUser) {
      this.user = user;
    },
    async signUpWithEmailAndPassword(email: string, password: string) {
      await FirebaseAuthentication.createUserWithEmailAndPassword({ email: email, password: password });
      await FirebaseAuthentication.sendEmailVerification();
    },
    async initializeUser() {
      const currentUser = (await FirebaseAuthentication.getCurrentUser()).user;
      if (currentUser === null) throw new Error("Please login if you want to initialize User");

      if (!db) throw new Error("Database not initialized");
      // set APIEndpoint to firestore.users.APIEndpoint
      try {
        set(ref(db, "users/" + currentUser.uid), {
          email: currentUser.email,
          premiumCharacters: 500,
          reloadDate: Date.now(),
          standardCharacters: 5000,
        });
      } catch (err: any) {
        console.log(err);
        throw new Error(err.message);
      }
    },
    async loginWithEmailAndPassword(email: string, password: string) {
      const auth: any = getAuth();
      await setPersistence(auth, browserLocalPersistence);
      return await FirebaseAuthentication.signInWithEmailAndPassword({ email: email, password: password });
    },
    async getAuthProviders() {
      // Waiting for this feature to get implemented in capacitor-firebase-authentication
      // https://github.com/capawesome-team/capacitor-firebase/issues/161
    },
    async logout() {
      await FirebaseAuthentication.signOut();
    },
    /*async getSubscription(): Promise<IUser["subscription"]> {
      const subscription: IUser["subscription"] = {
        type: "FREE",
        duration: undefined,
        expiresDate: undefined,
        provider: undefined,
      };
      const entitlements = await this.getSubscriptionEntitlements();
      if (
        entitlements.money_lender_pro &&
        new Date(entitlements.money_lender_pro.expires_date).getTime() > Date.now()
      ) {
        subscription.type = "STANDARD";
        subscription.expiresDate = entitlements.money_lender_pro.expires_date;

        if (entitlements.money_lender_pro.product_identifier === "prod_NHunLmr0bkEmsX") {
          subscription.duration = "YEARLY";
          subscription.provider = "STRIPE";
        }
        if (entitlements.money_lender_pro.product_identifier === "prod_NHumCyfRojBKtg") {
          subscription.duration = "MONTHLY";
          subscription.provider = "STRIPE";
        }
        if (entitlements.money_lender_pro.product_identifier === "android_standard_yearly:android-standard-yearly") {
          subscription.duration = "YEARLY";
          subscription.provider = "GOOGLE";
        }
        if (entitlements.money_lender_pro.product_identifier === "android_standard_monthly") {
          subscription.duration = "MONTHLY";
          subscription.provider = "GOOGLE";
        }
      }

      return subscription;
    },
    async initPurchase(type: IUser["subscription"]["type"], duration: IUser["subscription"]["duration"]): Promise<any> {
      // type argument is not used jet, because only one type is available on production
      if (this.user === undefined) throw new Error("User not initialized");
      const platform = Capacitor.getPlatform();

      Purchases.configureWith({
        apiKey: "goog_xrYZyUYlnigdRILeILDhKCPGFoh",
        appUserID: this.user._id,
      });

      if (platform === "web") {
        if (duration === "MONTHLY")
          window.location.href = `https://buy.stripe.com/test_00g2bvglGb6E2E88wx?prefilled_email=${encodeURI(
            this.user?.email
          )}&client_reference_id=${encodeURI(this.user._id)}`;
        else if (duration === "YEARLY")
          window.location.href = `https://buy.stripe.com/test_aEU03nd9ucaIfqUcMM?prefilled_email=${encodeURI(
            this.user?.email
          )}&client_reference_id=${encodeURI(this.user._id)}`;
      } else if (platform === "android") {
        if (duration === "MONTHLY") {
          return await Purchases.purchaseProduct("android_standard_monthly");
        } else if (duration === "YEARLY") {
          return await Purchases.purchaseProduct("android_standard_yearly");
        }
      } else if (platform === "ios") {
        if (duration === "MONTHLY") {
          return await Purchases.purchaseProduct("");
        } else if (duration === "YEARLY") {
          return await Purchases.purchaseProduct("");
        }
      }
    },
    async restoreSubscription() {
      if (!(await isNative())) return;
      if (this.user === undefined) throw new Error("User not initialized");
      Purchases.configureWith({
        apiKey: "goog_xrYZyUYlnigdRILeILDhKCPGFoh",
        appUserID: this.user._id,
      });
      return await Purchases.restorePurchases();
    },*/
  },

  getters: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
