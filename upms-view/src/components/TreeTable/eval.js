/**权限树
* @Author: jianglei
* @Date:   2017-10-12 12:06:49
*/
'use strict';
import Vue from 'vue'
export default function treeToArray(data, expandedAll, parent, level) {
  let tmp = [];
  Array.from(data).forEach(function(record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandedAll)
    }
    let _level = 1;
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level);
    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
    }
    tmp.push(record);
    if (record.nodes && record.nodes.length > 0) {
      const nodes = treeToArray(record.nodes, expandedAll, record, _level);
      tmp = tmp.concat(nodes)
    }
  });
  return tmp
}
