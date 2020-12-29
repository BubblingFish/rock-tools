const tools = {
  /* 时间戳格式转换 */
  formattingDate(timestamp, pattern) {
    if (!timestamp) {
      return ''
    }
    var oDate = new Date(+timestamp)
    if (pattern === undefined || pattern == 1) {
      pattern = 'yyyy-MM-dd'
    } else if (pattern == 2) {
      pattern = 'yyyy-MM-dd hh:mm:ss'
    }
    pattern = pattern.replace(/yyyy/i, oDate.getFullYear())
    pattern = pattern.replace(
      /yy/gi,
      oDate.getYear() % 100 > 9
        ? (oDate.getYear() % 100).toString()
        : '0' + (oDate.getYear() % 100)
    )
    var month = oDate.getMonth() + 1
    pattern = pattern.replace(/MM/, month > 9 ? month.toString() : '0' + month)
    pattern = pattern.replace(/M/g, month)
    pattern = pattern.replace(/w|W/g, '日一二三四五六'[oDate.getDay()])
    var date = oDate.getDate()
    pattern = pattern.replace(/dd/i, date > 9 ? date.toString() : '0' + date)
    pattern = pattern.replace(/d/gi, date)
    var hour = oDate.getHours()
    pattern = pattern.replace(/hh/i, hour > 9 ? hour.toString() : '0' + hour)
    pattern = pattern.replace(/h/gi, hour)
    var minute = oDate.getMinutes()
    pattern = pattern.replace(
      /mm/,
      minute > 9 ? minute.toString() : '0' + minute
    )
    pattern = pattern.replace(/m/g, minute)
    var second = oDate.getSeconds()
    pattern = pattern.replace(
      /ss/i,
      second > 9 ? second.toString() : '0' + second
    )
    pattern = pattern.replace(/s/gi, second)
    return pattern
  },
  /* 平级数据转树型数据 */
  arrayToTree(dataArr, param) {
    param = param || {}
    const before_idkey = param.id || 'id'
    const before_parentkey = param.parentId || 'parentId'
    const after_childkey = param.children || 'child'
    let tree = dataArr.filter((father) => {
      let branchArr = dataArr.filter((child) => {
        return father[before_idkey] == child[before_parentkey]
      })
      if (branchArr.length > 0) {
        father[after_childkey] = branchArr
        father.hasChildren = true
        father.showChildren = false
      } else {
        father.hasChildren = false
      }
      return !dataArr.some(function (item) {
        return item[before_idkey] === father[before_parentkey]
      })
    })
    return tree
  },
  /* 得到当前时间 */
  getCurrentTimeInfo() {
    var time = new Date()
    return (
      tools.formattingDate(time, 'yyyy年MM月dd日 hh:mm') +
      ' 星期' +
      ['日', '一', '二', '三', '四', '五', '六'][time.getDay()]
    )
  },
  /* 几天前 几分钟前 刚刚 */
  dateAgo(time, nowTime = +new Date()) {
    var diffValue = nowTime - time,
      result = '',
      minute = 1000 * 60,
      hour = minute * 60,
      day = hour * 24,
      // halfamonth = day * 15,
      month = day * 30,
      year = month * 12,
      _year = diffValue / year,
      _month = diffValue / month,
      _week = diffValue / (7 * day),
      _day = diffValue / day,
      _hour = diffValue / hour,
      _min = diffValue / minute

    if (_year >= 1) result = parseInt(_year) + '年前'
    else if (_month >= 1) result = parseInt(_month) + '个月前'
    else if (_week >= 1) result = parseInt(_week) + '周前'
    else if (_day >= 1) result = parseInt(_day) + '天前'
    else if (_hour >= 1) result = parseInt(_hour) + '个小时前'
    else if (_min >= 1) result = parseInt(_min) + '分钟前'
    else result = '刚刚'
    return result
  },
  /* 自动裁剪过长字符串 */
  cutTextLength(str, len = 12) {
    if (!str) {
      return ''
    }
    if (str.length > len) {
      return str.slice(0, len - 2) + '...'
    } else {
      return str
    }
  },
  /* 格式化大小 */
  formattingSize: (size, decimal = 1) => {
    size = parseInt(size)
    if (Number.isNaN(size)) {
      return '-'
    } else if (size == 0) {
      return '0'
    } else if (size < 1024) {
      return '1KB'
    } else if (size < 1024 * 1024) {
      return tools.roundNum(size / 1024, decimal) + 'KB'
    } else if (size < 1024 * 1024 * 1024) {
      return tools.roundNum(size / 1024 / 1024, decimal) + 'MB'
    } else {
      return tools.roundNum(size / 1024 / 1024 / 1024, decimal) + 'GB'
    }
  }
}
export default tools
