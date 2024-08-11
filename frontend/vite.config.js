/** @type {import('vite').UserConfig} */
export default {
  server: {
    port: 5000,
    proxy: {
      '/api': 'http://localhost:4000' // Any request that starts with /api will get routed to the API server
    }
  }
}
