/* eslint-disable quotes */
/* eslint-disable quote-props */
module.exports = {
  apps: [
    {
      name: "SthlmEstate-PWA",
      exec_mode: "cluster",
      instances: 2,
      watch: true,
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
      env: {
        "PORT": 3000,
        "NODE_ENV": "production",
        "APP_URL_PROD": "https://sthlmestate.se",
        "APP_URL_DEV": "http://localhost:3000",
        "API_AUTHORIZATION": "Basic NTg2OnVpdDJlRmdxVG9kNlAzbVpUNzQ1bjEyS3NHR0xIa2MzdHFPT2NkTDRkNEZlQjBHdWJ1ZEVaVTB0Zlo4TXhKWWg=",
        "API_CUSTOMER_ID": "M19854",

        "CDN_BASE_URL": "https://driftservice.blob.core.windows.net/cdn",
        "GOOGLE_MAPS_API_KEY": "AIzaSyA8lZzg1ThvxW8WzOvyVxFs3cPxqd-BXL8",

        "MAIL_GOOGLE_AUTH_USERNAME": "amadeus.hritani@simhop.se",
        "MAIL_GOOGLE_AUTH_PASSWORD": "uhfbyqdxnnfjxpou",

        "MAIL_IMAP_AUTH_USERNAME": "info@sthlmestate.se",
        "MAIL_IMAP_AUTH_PASSWORD": "I@mTheP@ssword"

      }
    }
  ]
}
