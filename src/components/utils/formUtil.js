// 默认需要脱敏的字段
const needTm = ['name', 'identityNo', 'mobile', 'callNum'];
// 脱敏
function handShortStr (val) {
  return (new Array(val.length)).join("*") + val.slice(-1);
}
function handleMiddleStr (val) {
  return val.slice(0, 1) + (new Array(val.length - 3)).join("*") + val.slice(-3);
}
function handleLongStr (val) {
  return val.slice(0, 3) + (new Array(val.length - 6)).join("*") + val.slice(-4);
}
var getTmValue = function (k, v, tmArr) {
  if (!v) {
    return '';
  }
  !tmArr && (tmArr = needTm);
  if (!k || (tmArr.includes(k) && !v.includes('*'))) {
    // 需要脱敏
    // 朱晓辉 -> **辉
    // 18795905631 -> 187****5631
    // 622281199606286774 -> 320***********6774
    if (v.length <= 4) {
      return handShortStr(v);
    } else if (v.length <= 10) {
      return handleMiddleStr(v);
    } else {
      return handleLongStr(v);
    }
  }
  return v;
};
export default {
  // 下面是 结果转表单
  objectInfo2Html: function (basicInfo, kvs) {
    var html = "";
    let index = 0;
    var keys = Object.keys(basicInfo);
    for (let i in kvs) {
      if (index % 2) {
        html += `
              <td width="20%">${kvs[i]}</td>
              <td width="30%">${basicInfo[i]}</td>
              </tr>
            `;
      } else {
        html += `
          <tr class="text-left">
            <td width="20%">${kvs[i]}</td>
            <td width="30%">${basicInfo[i]}</td>
        `;
        if (index == keys.length - 1) {
          html += '<td></td><td></td></tr>';
        }
      }
      index++;
    }
    return html;
  },
  arrayInfo2Html: function (arrayInfo, kvs) {
    var html = "";
    arrayInfo.forEach(element => {
      html += this.objectInfo2Html(element, kvs);
    });
    return html;
  },
  kvsToTableHead: function (kvs) {
    var html = "<tr>";
    for (let k in kvs) {
      html += `<th>${kvs[k]}</th>`;
    }
    html += '</tr>';
    return html;
  },
  arrayInfo2HtmlV2: function (arrayInfo, kvs) {
    // 表格形状，适合head比较少，条数比较多的情况
    var html = "";
    if (!arrayInfo || !(arrayInfo.constructor == Array)) {
      return "";
    }
    html += this.kvsToTableHead(kvs);
    arrayInfo.forEach(element => {
      html += '<tr>';
      for (let k in kvs) {
        html += `<td>${element[k] == undefined ? '' : element[k]}</td>`;
      }
      html += '</tr>';
    });
    if (arrayInfo.length == 0) {
      html += `</tr><td colspan=${Object.keys(kvs).length} class="centerAlign">无数据</td></tr>`;
    }
    return html;
  },
  arrayInfo2HtmlV3: function (arrayInfo, kvs, tmArr, format) {
    // 表格形状，适合head比较少，条数比较多的情况（带脱敏功能）, 数据fomat功能
    if (!tmArr) {
      tmArr = needTm;
    }
    var html = "";
    if (!arrayInfo || !(arrayInfo.constructor == Array)) {
      return "";
    }
    html += this.kvsToTableHead(kvs);
    arrayInfo.forEach(element => {
      html += '<tr>';
      for (let k in kvs) {
        let value = getTmValue(k, element[k], tmArr);
        if (format && format[k]) {
          value = format[k](value);
        }
        html += `<td>${value}</td>`;
      }
      html += '</tr>';
    });
    if (arrayInfo.length == 0) {
      html += `</tr><td colspan=${Object.keys(kvs).length} class="centerAlign">无数据</td></tr>`;
    }
    return html;
  },
  getHtmlByKvsFromObj: function (kvs, obj) {
    var html = '';
    var keys = Object.keys(kvs);
    for (let i = 0; i < keys.length; i += 2) {
      let k1 = kvs[keys[i]];
      let v1 = obj[keys[i]] == undefined ? '' : obj[keys[i]];
      let k2, v2;
      if (i + 1 == keys.length) {
        k2 = v2 = '';
      } else {
        k2 = kvs[keys[i + 1]];
        v2 = obj[keys[i + 1]] == undefined ? '' : obj[keys[i + 1]];
      }
      html += `<tr>
                <td width="20%">${k1}</td>
                <td width="30%">${v1}</td>
                <td width="20%">${k2}</td>
                <td width="30%">${v2}</td>
              </tr>`;
    }
    return html;
  },
  getHtmlByKvsFromObjTm: function (kvs, obj, tmArr, format) {
    // 能脱敏 还能格式化
    if (!tmArr) {
      tmArr = needTm;
    }
    var html = '';
    var keys = Object.keys(kvs);
    for (let i = 0; i < keys.length; i += 2) {
      let k1 = kvs[keys[i]];
      let v1 = getTmValue(keys[i], obj[keys[i]], tmArr);
      format && format[keys[i]] && (v1 = format[keys[i]](v1));
      let k2, v2;
      if (i + 1 == keys.length) {
        k2 = v2 = '';
      } else {
        k2 = kvs[keys[i + 1]];
        v2 = getTmValue(keys[i + 1], obj[keys[i + 1]], tmArr);
        format && format[keys[i + 1]] && (v2 = format[keys[i + 1]](v2));
      }
      html += `<tr>
                <td width="20%">${k1}</td>
                <td width="30%">${v1}</td>
                <td width="20%">${k2}</td>
                <td width="30%">${v2}</td>
              </tr>`;
    }
    return html;
  },
  getTmValue,
  arrayJoin: function (arr, needTm) {
    if (!arr || arr.length == 0) {
      return '无';
    } else if (needTm) {
      var newArr = [];
      arr.map((n) => {
        newArr.push(getTmValue(null, n));
      });
      return newArr.join(', ');
    } else {
      return arr.join(",");
    }
  }
};
