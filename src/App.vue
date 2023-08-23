<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import router from './router';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

const userStore = useUserStore();

const checkingAuthStatus = ref(false);
FirebaseAuthentication.addListener('authStateChange', async (authStateChange) => {
  checkingAuthStatus.value = true;
  console.log(authStateChange);
  const user = authStateChange.user;
  if (user != undefined) {
    // User exists in firebase
    // If user has unverified email redirect to verifyEmail
    if (!user.emailVerified) { router.push({ name: "verifyEmail" }); }
    else {
      try {
        userStore.loadUser(user.uid);
        // if redirect exists redirect to redirect path
        if (router.currentRoute.value.query.redirectTo)
          router.push({ path: router.currentRoute.value.query.redirectTo as string });
        // if user is loged in and on login or register or initializeUser page redirect to budgets
        else if (router.currentRoute.value.name === "login" || router.currentRoute.value.name === "register") {
          router.replace({ name: "RecordsList" });
        }

        // try to get user server from firestore
      } catch (err) {
        console.log("🔥", "firebase user not found");
      }
    }
  } else {
    userStore.$reset()
    if (router.currentRoute.value.name !== "login") router.replace({ name: "login" });
  }
  checkingAuthStatus.value = false;
})
</script>
<template>
  <ion-app>
    <p v-show="checkingAuthStatus">Loading user</p>
    <ion-router-outlet v-if="!checkingAuthStatus" />
  </ion-app>
</template>