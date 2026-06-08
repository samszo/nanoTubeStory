import { App } from './app.js';

const app = new App();

window.addEventListener('DOMContentLoaded', () => {
  app.init();
  // Exposer pour débogage console
  window.__nanoApp = app;
});
