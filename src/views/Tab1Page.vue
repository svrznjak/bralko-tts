<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-button @click="() => $router.push('/login')">Go to detail</ion-button>
      <ion-button router-link="/login" router-direction="back">Click Me</ion-button>


      <ExploreContainer name="Tab 1 page" />
      <p>asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd<br />
        asdasd
        asdsad

      </p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>
