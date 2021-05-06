export default function ({ $axios, redirect, $cookies }) {
  $axios.defaults.validateStatus = function () {
    return true;
  };

  $axios.setHeader("Content-Type", "application/json");

  $axios.onRequest(config => {
    //Qconsole.log('Making request to ' + config.url)
  })
  $axios.onError(error => {
    console.log(error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      ///redirect('/400')
      console.log(400)
    }
  })
}
