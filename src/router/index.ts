import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import { useUserStore } from "@/stores/user";

import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import VerifyEmailPage from "@/views/VerifyEmailPage.vue";
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";
import PrivacyPolicyPage from "@/views/PrivacyPolicyPage.vue";
import TermsOfServicePage from "@/views/TermsOfServicePage.vue";
import RecordsListPage from "@/views/RecordsListPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/tab1",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1Page.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2Page.vue"),
      },
      {
        path: "tab3",
        component: () => import("@/views/Tab3Page.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.user !== undefined) {
        next({
          name: "RecordsList",
        });
      } else next();
    },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.user !== undefined) {
        next({
          name: "RecordsList",
        });
      } else next();
    },
  },
  {
    path: "/verify-email",
    name: "verifyEmail",
    component: VerifyEmailPage,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPasswordPage,
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.user !== undefined) {
        next({
          name: "RecordsList",
        });
      } else next();
    },
  },
  {
    path: "/privacy-policy",
    name: "privacyPolicy",
    component: PrivacyPolicyPage,
  },
  {
    path: "/terms-of-service",
    name: "termsOfService",
    component: TermsOfServicePage,
  },
  {
    path: "/records-list",
    name: "RecordsList",
    props: true,
    component: RecordsListPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
