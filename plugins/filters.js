import Vue from 'vue'

Date.prototype.format = function (fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Vue.filter('dateString', function (seconds) {
  var def = Date.parse(1970)
  var miliseconds = (def + seconds * 1000)
  var date = new Date(miliseconds)
  var today = new Date()
  today.setHours(0,0,0,0)
  var distance = today - date

  if (distance <= 0 && distance >= -86400000) {
    return "今天 " + date.format("hh:mm")
  } else if (distance > 0 && distance <= 86400000) {
    return "昨天 " + date.format("hh:mm")
  } else if (distance > 86400000 && distance <= 2 * 86400000) {
    return "前天 " + date.format("hh:mm")
  } else if (distance > 2 * 86400000 && distance <= 100 * 86400000) {
    return date.format("M月d日 hh:mm")
  } else {
    return date.format("yyyy年M月d日 hh:mm")
  }
})