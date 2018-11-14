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
  getHtmlByKvsFromObj: function (kvs, obj) {
    var html = '';
    var keys = Object.keys(kvs);
    // 0 1 2 3
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
  }
};
