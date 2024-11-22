// import getSv from '../locales/sv/get'
// import getEn from '../locales/en/get'
import init from '../config/init'
import nav from '../config/nav'
const axios = {
  baseURL: !init.hasProxy ? init.apiUrl : '/api/'
  // baseURL: !process.env.NODE_ENV === 'production' ? init.apiUrl : '/api/'
}

const proxy = {
  '/api/': { target: init.apiUrl, pathRewrite: { '^/api/': '' } }
}

// const proxy = {
//   '/api/': 'https://sthlmestate.se/'
// }

// const proxy = [
//   'https://sthlmestate.se/api/'
// ]
export const business = {
  shortName: 'Sthlm Estate',
  longName: 'Sthlm Estate',
  shortDesc: 'Hitta ditt hem hos oss',
  phone: '08-889360',
  email: 'info@sthlmestate.se',
  location: {
    street: 'Svetsarvägen 15',
    city: 'Solna',
    zipCode: '171 41',
    coordinates: '59.3595594, 17.978075',
    mapsUrl: 'https://goo.gl/maps/5XSYFWypV4eGEc6s7',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2033.4061974448196!2d17.97807497770843!3d59.359559374628915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d844df5e9c3%3A0xd736ee61218354d5!2sSTHLM%20ESTATE!5e0!3m2!1sen!2sse!4v1694460421650!5m2!1sen!2sse'
  },
  social: {
    facebook: 'https://www.facebook.com/Sthlmestate.se',
    instagram: 'https://www.instagram.com/sthlmestate.se/?next=%2Fgabrielyohanoun%2F',
    linkedin: 'https://www.linkedin.com/company/sthlm-estate/?viewAsMember=true'
  }
}
export default {
  settings: {
    title: 'Sthlm Estate',
    titleId: 'Sthlm-Estate',
    titleLong: 'Hitta ditt drömhem i Stockholm',
    appTitle: 'Sthlm Estate',
    description: 'Sthlm Estate | Hitta ditt drömhem i Stockholm',
    deusNav: nav,
    googleApiKey: {
      test: 'AIzaSyDkQnW0MDECV62ogv2MrtZ2GbewAHkgqhY',
      prod: 'AIzaSyAs_AdPT-fLX4caeBA4ij9VgNm7cr90KuY'
    },
    googleSiteVerification: 'your_google_site_verification',
    googleOptimizeKey: null,
    dmcaSiteVerification: 'your_dmca_site_verification',
    baseUrl: {
      prod: 'https://sthlmestate.se/',
      dev: 'http://localhost:3000/'
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
    notificationToken: '682ad4b150604f97638aa6551ddeb10d', // I @m Vitec Notification Token => MD5
    hasProxy: init.hasProxy,
    target: init.apiUrl,
    vitec: init.vitec,
    axios,
    proxy,
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
              typeOfDate: init.typeOfDate,
              statuses: process && process.env.NODE_ENV === 'production' ? [{ id: '3' }] : [{ id: '3' }]
            }
          }
        },
        getViewings: {
          id: 'api_endpoint_get_estate_viewing',
          action: `/Viewing/${init.customerId}/`,
          actionVars: '{estateId}',
          method: 'get',
          ContentType: 'application/json',
          docs: 'https://connect.maklare.vitec.net/Help/Api/GET-Viewing-customerId-estateId'
        },
        postViewings: {
          id: 'api_endpoint_post_viewing_participant',
          action: `/Viewing/${init.customerId}/`,
          actionVars: '{viewingId}/{timeSlotId}',
          actionTrail: '/Participant',
          method: 'post',
          ContentType: 'application/json',
          docs: 'https://connect.maklare.vitec.net/Help/Api/POST-Viewing-customerId-viewingId-timeSlotId-Participant',
          params: {
            allAvailable: {
              updatePerson: {
                contactId: 'sample string 1',
                customerId: init.customerId,
                categoryIds: [
                  'sample string 1',
                  'sample string 2'
                ],
                address: {
                  streetAddress: 'sample string 1',
                  zipCode: 'sample string 2',
                  city: 'sample string 3',
                  countryCode: 'sample string 4'
                },
                email: {
                  emailAddress: 'sample string 1',
                  emailAddress2: 'sample string 2'
                },
                userId: 'sample string 3',
                otherPhone: 'sample string 4',
                wishAdvertising: true,
                note: 'sample string 5',
                coordinate: {
                  longitud: 1.1,
                  latitud: 2.1
                },
                task: {
                  predefinedTaskId: 'sample string 1',
                  note: 'sample string 2',
                  estateId: 'sample string 3',
                  assignedTo: 'sample string 4'
                },
                customField: {
                  name: 'sample string 1',
                  value: 'sample string 2'
                },
                firstName: 'sample string 6',
                lastName: 'sample string 7',
                socialSecurityNumber: 'sample string 8',
                telePhone: 'sample string 9',
                workPhone: 'sample string 10',
                cellPhone: 'sample string 11',
                approval: true,
                approvalDate: '2022-09-13T05:51:45.4751166+02:00',
                gdprApprovalDate: '2022-09-13T05:51:45.4751166+02:00',
                obtainThrough: 'Interest',
                leadScore: 1
              },
              participated: true,
              reminderTime: 2,
              smsReminder: true,
              mailConfirmation: true,
              smsConfirmation: true,
              returnBookingId: true,
              contactMessage: 'sample string 7',
              leadSourceId: 'sample string 8',
              options: {
                isDeadlineValidationEnabled: true,
                enableBookingLimitValidation: true
              }
            },
            default: {
              updatePerson: {
                firstName: 'Amadeus',
                lastName: 'Hritani',
                cellPhone: '0769696969',
                customerId: init.customerId,
                obtainThrough: 'Interest',
                GDPRApprovalDate: '2022-09-05T18:30:32',
                email: {
                  emailAddress: 'hritani@gmail.com'
                },
                userId: 'HAN1A29280EBA944CEF8C87E156DE6C7BBB',
                wishAdvertising: true,
                note: 'Person was added or updated through Sthlm-Estate-App.'
              },
              participated: false,
              reminderTime: 30,
              smsReminder: true,
              mailConfirmation: true,
              smsConfirmation: true,
              returnBookingId: true,
              contactMessage: 'sample string 7',
              leadSourceId: 'sample string 8',
              options: {
                isDeadlineValidationEnabled: true,
                enableBookingLimitValidation: true
              }
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
        interest: {
          id: 'api_endpoint_interest_post',
          action: '/Interest/SendInterestAndContactOnEstate',
          method: 'post',
          ContentType: 'application/json',
          docs: 'https://connect.maklare.vitec.net/Help/Api/POST-Interest-SendInterestAndContactOnEstate',
          params: {
            allAvailable: {
              updatePerson: {
                firstName: 'sample string 1',
                lastName: 'sample string 2',
                socialSecurityNumber: 'sample string 3',
                telePhone: 'sample string 4',
                workPhone: 'sample string 5',
                cellPhone: 'sample string 6',
                approval: true,
                approvalDate: '2022-09-04T20:31:49.8296897+02:00',
                gdprApprovalDate: '2022-09-04T20:31:49.8296897+02:00',
                obtainThrough: 'Interest',
                contactId: 'sample string 7',
                customerId: 'sample string 8',
                categoryIds: [
                  'sample string 1',
                  'sample string 2'
                ],
                address: {
                  streetAddress: 'sample string 1',
                  zipCode: 'sample string 2',
                  city: 'sample string 3',
                  countryCode: 'sample string 4'
                },
                email: {
                  emailAddress: 'sample string 1',
                  emailAddress2: 'sample string 2'
                },
                userId: 'sample string 9',
                otherPhone: 'sample string 10',
                wishAdvertising: true,
                note: 'sample string 11',
                coordinate: {
                  longitud: 1.1,
                  latitud: 2.1
                },
                task: {
                  predefinedTaskId: 'sample string 1',
                  note: 'sample string 2',
                  estateId: 'sample string 3',
                  assignedTo: 'sample string 4'
                },
                customField: {
                  name: 'sample string 1',
                  value: 'sample string 2'
                },
                leadScore: 1
              },
              estateId: 'sample string 1',
              presentAccommodation: {
                estateType: 'House',
                livingSpace: 1.1,
                numberOfRooms: 1.1,
                price: 1.1,
                other: 'sample string 1',
                coordinate: {
                  longitud: 1.1,
                  latitud: 2.1
                }
              },
              interestNote: 'sample string 2',
              notifyUser: true,
              customerId: init.customerId,
              UserId: null
            },
            default: {
              updatePerson: {
                firstName: 'Amadeus',
                lastName: 'Hritani',
                cellPhone: '0769696969',
                customerId: init.customerId,
                obtainThrough: 'Interest',
                email: {
                  emailAddress: 'hritani@gmail.com'
                },
                userId: 'HAN1A29280EBA944CEF8C87E156DE6C7BBB',
                wishAdvertising: true,
                note: 'Person was added or updated through Sthlm-Estate-App.'
              },
              estateId: 'OBJ19854_1939594037',
              interestNote: 'Interest was initiated from Sthlm-Estate-App.',
              notifyUser: true
            }
          }
        },
        objects: [
          {
            id: 'api_endpoint_house',
            type: 'house',
            group: 'houses',
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
            type: 'housingCooperativese',
            group: 'housingCooperativeses',
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
          },
          {
            id: 'api_endpoint_premises',
            type: 'premises',
            group: 'premises',
            action: '/Estate/GetPremises',
            method: 'get',
            docs: 'https://connect.maklare.vitec.net/Help/Api/GET-Estate-GetPremises',
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
            id: 'api_endpoint_commercialProperty',
            type: 'commercialProperty',
            group: 'commercialPropertys',
            action: '/Estate/GetCommercialProperty',
            method: 'get',
            docs: 'https://connect.maklare.vitec.net/Help/Api/GET-Estate-GetCommercialProperty',
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
            id: 'api_endpoint_farm',
            type: 'farm',
            group: 'farms',
            action: '/Estate/GetFarm',
            method: 'get',
            docs: 'https://connect.maklare.vitec.net/Help/Api/GET-Estate-GetFarm',
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
            id: 'api_endpoint_project',
            type: 'project',
            group: 'projects',
            action: '/Estate/GetProject',
            method: 'get',
            docs: 'https://connect.maklare.vitec.net/Help/Api/GET-Estate-GetProject',
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
            id: 'api_endpoint_plot',
            type: 'plot',
            group: 'plots',
            action: '/Estate/GetPlot',
            method: 'get',
            docs: 'https://connect.maklare.vitec.net/Help/Api/GET-Estate-GetPlot',
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
            id: 'api_endpoint_cottage',
            type: 'cottage',
            group: 'cottages',
            action: '/Estate/GetCottage',
            method: 'get',
            docs: 'https://connect.maklare.vitec.net/Help/Api/GET-Estate-GetCottage',
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
            id: 'api_endpoint_condominium',
            type: 'condominium',
            group: 'condominiums',
            action: '/Estate/GetCondominium',
            method: 'get',
            docs: 'https://connect.maklare.vitec.net/Help/Api/GET-Estate-GetCondominium',
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
            id: 'api_endpoint_condominium',
            type: 'foreignProperty',
            group: 'foreignProperties',
            action: '/Estate/GetForeignProperty',
            method: 'get',
            docs: 'https://connect.maklare.vitec.net/Help/Api/GET-Estate-GetForeignProperty',
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
    active: 'mailtrap',
    accounts: [
      { name: 'Contact', to: 'info@sthlmestate.se' },
      { name: 'Sell', to: 'info@sthlmestate.se' },
      { name: 'Buy', to: 'info@sthlmestate.se' }
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
      },
      mailtrap: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        secure: true,
        auth: {
          user: 'd5d1ca609d5668',
          pass: 'cf9823764bd3e0'
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
