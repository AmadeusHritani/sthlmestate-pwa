// import getSv from '../locales/sv/get'
// import getEn from '../locales/en/get'
import init from '../config/init'
import nav from '../config/nav'
// const init = {
//   customerId: 'M19854',
//   apiUrl: 'https://connect.maklare.vitec.net',
//   apiAltUrl: 'https://bostader-maklare-live.azurewebsites.net/api',
//   hasProxy: true,
//   auth: {
//     uname: '586',
//     upass: 'uit2eFgqTod6P3mZT745n12KsGGLHkc3tqOOcdL4d4FeB0GubudEZU0tfZ8MxJYh',
//     token: 'Basic NTg2OnVpdDJlRmdxVG9kNlAzbVpUNzQ1bjEyS3NHR0xIa2MzdHFPT2NkTDRkNEZlQjBHdWJ1ZEVaVTB0Zlo4TXhKWWg='
//   }
// }
const axios = {
  baseURL: !init.hasProxy ? init.apiUrl : '/api/'
  // baseURL: !process.env.NODE_ENV === 'production' ? init.apiUrl : '/api/'
}

const proxy = {
  '/api/': { target: init.apiUrl, pathRewrite: { '^/api/': '' } }
}

export default {
  settings: {
    title: 'Sthlm Estate AB',
    titleId: 'sthlm-estate',
    titleLong: 'Real Estate Lead Management',
    appTitle: 'Sthlm Estate AB',
    description: 'Sthlm Estate AB | Real Estate Lead Management: Generate leads by connecting to external APIs.',
    navigator: nav,
    googleApiKey: {
      test: 'AIzaSyDkQnW0MDECV62ogv2MrtZ2GbewAHkgqhY',
      prod: 'AIzaSyAs_AdPT-fLX4caeBA4ij9VgNm7cr90KuY'
    },
    googleSiteVerification: 'your_google_site_verification',
    googleOptimizeKey: null,
    dmcaSiteVerification: 'your_dmca_site_verification',
    baseUrl: {
      prod: 'https://sthlmestate.online/',
      dev: 'http://sthlmestate.test/'
    },
    api: { /* App Internal API >> To be implemented */ },
    stripeKey: {
      prod: 'prod_stripe_key_here',
      test: 'test_stripe_key_here'
    },
    square: {
      prod: {
        applicationId: 'prod-application_id',
        token: 'prod_long_token',
        locationId: 'prod_location_id',
        endpoint: 'https://js.squareupsandbox.com/v2/paymentform',
        apiEndpoint: 'https://connect.squareupsandbox.com'
      },
      test: {
        applicationId: 'sandbox-application_id',
        token: 'sandbox_long_token',
        locationId: 'sandbox_location_id',
        endpoint: 'https://js.squareupsandbox.com/v2/paymentform',
        apiEndpoint: 'https://connect.squareupsandbox.com'
      }
    }
  },
  cookies: {
    request: {
      name: 'sthlmestate-request-cookie',
      value: null,
      createdAt: null
    },
    response: {
      name: 'sthlmestate-response-cookie',
      value: null,
      createdAt: null
    },
    settings: {
      name: 'sthlmestate-settings-cookie',
      value: {
        theme: {
          dark: false,
          sticky: true
        }
      },
      createdAt: null
    }
  },
  api: {
    hasProxy: init.hasProxy,
    target: init.apiUrl,
    axios,
    proxy: init.hasProxy ? proxy : {},
    customerId: init.customerId, // Not required. if removed, just use data: {}
    requests: {
      auth: {
        username: init.auth.uname,
        password: init.auth.upass,
        token: init.auth.token,
        header: `Authorization: ${init.auth.token}`
      },
      headers: {
        Authorization: init.auth.token,
        AccessControlAllowOrigin: '*'
      },
      endpoints: {
        list: {
          id: 'api_endpoint_estate_list',
          action: '/Estate/GetEstateList',
          method: 'post',
          ContentType: 'application/json',
          docs: 'https://connect.maklare.vitec.net/Help/Api/POST-Estate-GetEstateList',
          params: {
            allAvailable: {
              countyMunicipalityCode: null,
              customerId: init.customerId,
              dateFrom: null,
              dateTo: null,
              statuses: [],
              type: [],
              typeOfDate: 0,
              userId: null
            },
            default: {
              customerId: init.customerId,
              statuses: process && process.env.NODE_ENV === 'production' ? [{ id: '3' }] : []
            }
          }
        },
        image: {
          id: 'api_endpoint_image_data',
          action: '/Image/GetImage',
          method: 'get',
          ContentType: null,
          docs: 'https://connect.maklare.vitec.net/Help/Api/GET-Image-GetImage',
          params: {
            allAvailable: {
              customerId: init.customerId,
              ImageId: null
            },
            default: {
              customerId: init.customerId,
              ImageId: null
            }
          }
        },
        file: {
          id: 'api_endpoint_file_data',
          action: '/File/GetFile',
          method: 'get',
          ContentType: null,
          docs: 'https://connect.maklare.vitec.net/Help/Api/GET-File-GetFile',
          params: {
            allAvailable: {
              customerId: init.customerId,
              FileId: null
            },
            default: {
              customerId: init.customerId,
              FileId: null
            }
          }
        },
        user: {
          id: 'api_endpoint_user_data',
          action: '/User/GetUser',
          method: 'get',
          ContentType: null,
          docs: 'https://connect.maklare.vitec.net/Help/Api/GET-User-GetUser',
          params: {
            allAvailable: {
              customerId: init.customerId,
              UserId: null
            },
            default: {
              customerId: init.customerId,
              UserId: null
            }
          }
        },
        objects: [
          {
            id: 'api_endpoint_house',
            type: 'house',
            action: '/Estate/GetHouse',
            method: 'get',
            docs: 'https://connect.maklare.vitec.net/Help/Api/GET-Estate-GetHouse',
            params: {
              allAvailable: {
                customerId: init.customerId,
                EstateId: null
              },
              default: {
                customerId: init.customerId,
                EstateId: null
              }
            }
          },
          {
            id: 'api_endpoint_cooperative',
            type: 'housingCooperative',
            action: '/Estate/GetHousingCooperative',
            method: 'get',
            docs: 'https://connect.maklare.vitec.net/Help/Api/GET-Estate-GetHousingCooperative',
            params: {
              allAvailable: {
                customerId: init.customerId,
                EstateId: null
              },
              default: {
                customerId: init.customerId,
                EstateId: null
              }
            }
          }
        ]
      }
    },
    resources: {}
  },
  mail: {
    active: 'google',
    accounts: [
      { name: 'Contact', to: 'info@sthlmestate.se' },
      { name: 'Sell', to: 'sell@sthlmestate.se' },
      { name: 'Buy', to: 'buy@sthlmestate.se' }
    ],
    smtp: {
      google: {
        service: 'gmail',
        auth: {
          user: 'amadeus.hritani@simhop.se',
          pass: 'uhfbyqdxnnfjxpou'
        }
      },
      imap: {
        host: 'send.one.com',
        port: 465,
        secure: true,
        auth: {
          user: 'info@sthlmestate.se',
          pass: 'I@mTheP@ssword2021'
        }
      }
    }
  },
  theme: {
    light: {
      primary: '#121212',
      accent: '#cfbf99',
      secondary: '#f4f0ed',
      info: '#085A8C',
      warning: '#F7931E',
      error: '#D60032',
      success: '#65B32E'
    },
    dark: {
      primary: '#999999',
      accent: '#cfbf99',
      secondary: '#f4f0ed',
      info: '#085A8C',
      warning: '#F7931E',
      error: '#D60032',
      success: '#65B32E'
    }
  }
}
