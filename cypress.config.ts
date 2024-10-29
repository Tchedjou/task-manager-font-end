import { defineConfig } from "cypress";
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', // L'URL de ton application Angular
    viewportWidth: 1280,              // Largeur de la fenêtre de test
    viewportHeight: 720,              // Hauteur de la fenêtre de test
  },
});



// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });
