import Vue from 'vue'

Vue.filter('dateString', function (seconds) {
  var def = Date.parse(1970)
  var miliseconds = (def + seconds * 1000)
  var date = new Date(miliseconds)

  var options = {
    // year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // second: 'numeric',
    hour12: false,
    timeZone: 'Asia/Shanghai'
  }
  let string = new Intl.DateTimeFormat('zh-CN', options).format(date)
  return string
})