export default {
  customerId: 'M19854',
  typeOfDate: '1', // DateChanged -> https://connect.maklare.vitec.net/Help/ResourceModel?modelName=Enum_DateType
  vitec: 'https://connect.maklare.vitec.net',
  apiUrl: 'https://api.sthlmestate.se',
  apiAltUrl: 'https://bostader-maklare-live.azurewebsites.net/api',
  hasProxy: process.env.NODE_ENV !== 'production',
  auth: {
    uname: '586',
    upass: 'uit2eFgqTod6P3mZT745n12KsGGLHkc3tqOOcdL4d4FeB0GubudEZU0tfZ8MxJYh',
    token: 'Basic NTg2OnVpdDJlRmdxVG9kNlAzbVpUNzQ1bjEyS3NHR0xIa2MzdHFPT2NkTDRkNEZlQjBHdWJ1ZEVaVTB0Zlo4TXhKWWg='
  }
}
