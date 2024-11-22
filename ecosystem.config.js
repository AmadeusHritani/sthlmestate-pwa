/* eslint-disable quotes */
/* eslint-disable quote-props */
module.exports = {
  apps: [
    {
      name: "SthlmEstate-Static",
      exec_mode: "cluster",
      instances: 3,
      watch: true,
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start"
    }
  ]
}
