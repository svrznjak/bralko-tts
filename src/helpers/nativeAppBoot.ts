import { App as CapacitorApp } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";
//StatusBar.setBackgroundColor({ color: "#F0F3F8" });
//StatusBar.setStyle({ style: Style.Light });
CapacitorApp.addListener("backButton", ({ canGoBack }) => {
  if (!canGoBack) {
    CapacitorApp.exitApp();
  } else {
    window.history.back();
  }
});

export default function nativeAppBoot() {
  StatusBar.setOverlaysWebView({ overlay: true });
  //StatusBar.setBackgroundColor({ color: "#F0F3F8" });
  StatusBar.setStyle({ style: Style.Light });
}
