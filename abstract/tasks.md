

Call Vitec >
************
- Connect app to Vitec - 2 way connection (Notification API)
- Do we need other endpoints
- Why don't we have all the info
- No "Published" label to filter (Important)
- City missing in the data

- Express: Add property to Website as Marketing Object

fetch("https://bostader-maklare-live.azurewebsites.net/api/Estate?type=0&status=3&municip=&customerId=M19854&pageIndex=0&pageCount=21", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "ARRAffinity=ef16f2525b4be572bef94f4dd817e8f90babb5638690b984c9c6d56dabdb2e75; ARRAffinitySameSite=ef16f2525b4be572bef94f4dd817e8f90babb5638690b984c9c6d56dabdb2e75",
    "Referer": "https://bostader-maklare-live.azurewebsites.net/Forsaljningar/M19854",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
});