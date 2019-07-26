if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/shopping-list-pwa/sw.js")
    .then(reg => console.log("SW registered", reg))
    .catch(err => console.log("SW not registered", err));
}
