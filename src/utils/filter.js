export function formatString(value, type) {
    let str;
    if (!value && type === 'currency') {
      return '0';
    } else if (!value) {
      return '--';
    }
    // console.log(typeof value);
    if (typeof value !== 'string') {
      str = value.toString();
    } else {
      str = value;
    }
    switch (type) {
      case 'currency':
        {
          // 添加千分位
          const DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
          const MILLI_PATTERN = /(?=(?!\b)(\d{3})+$)/g;
          // 目前返回的数据本来就是有几位显示几位，暂时不处理
          str = parseFloat(str)
          .toFixed(3)
          .toString();
          str = str.replace(/0+?$/, ''); // 去掉多余的0
          str = str.replace(/[.]$/, ''); // 如最后一位是.则去掉
          return str.replace(DIGIT_PATTERN, m => m.replace(MILLI_PATTERN, ','));
        }
      case 'date':
        {
          // YYYY-MM-DD 日期转换成 xx月xx日
          const dates = _.split(str, '-');
          return `${dates[1]}月${dates[2]}日`;
        }
      case 'billDate':
        // 账单日转换成 xx月xx日
        return `每月${str}`;
      case 'bankCard':
        // 银行卡 4 4 4 4
        return str.replace(/(\d{4})(?=\d)/g, '$1 ');
      case 'caseNo':
        return str.replace(/(\d{4})(?=\d{5})/g, '$1 ');
      case 'telephone':
        // 手机号 3 4 3
        return str.replace(/\B(?=(?:\d{4})+$)/g, ' ');
      case 'getBillDate':
        // 日期转换成账单日
        return str.substring(6, 8);
      case 'dateFormat':
        // 日期转换成yyyy-mm-dd || yy-mm-dd
        if (str.length === 8) {
          return `${str.substring(0, 4)}-${str.substring(4, 6)}-${str.substring(6, 8)}`;
        } else if (str.length === 6) {
          return `${str.substring(0, 2)}-${str.substring(2, 4)}-${str.substring(4, 6)}`;
        }
        break;
      default:
        return str;
    }
    return str;
  }