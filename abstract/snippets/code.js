async asyncData ({ $axios }) {
  const results = await $axios({
    method: 'post',
    url: 'https://connect.maklare.vitec.net/Estate/GetEstateList',
    data: {
      customerIs: 'M19854'
    },
    headers: {
      Authorization: 'Basic NTg2OnVpdDJlRmdxVG9kNlAzbVpUNzQ1bjEyS3NHR0xIa2MzdHFPT2NkTDRkNEZlQjBHdWJ1ZEVaVTB0Zlo4TXhKWWg=',
      'Content-Type': 'application/json'
    }
  })
  // eslint-disable-next-line no-console
  console.log(results ? results.data.housingCooperativeses : 'No Data')
  return { results: results && results.data ? results.data : 'No Data' }
}