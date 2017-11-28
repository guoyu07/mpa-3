module.exports = function(roleData, roleType, options) {
  let flag = false
  roleData.map((v) => {
    if (roleType === 'supplier') {
      if (v.roleType === '供应商' && v.status === '启用') {
        flag = true
      }

    } else if (roleType === 'buyers') {

      if (v.roleType === '采购商' && v.status === '启用') {
        flag = true
      }

    } else if (roleType === 'operators') {

      if (v.roleType === '运营商' && v.status === '启用') {
        flag = true
      }

    } else if (roleType === 'common') {
      if ((v.roleType === '供应商' || v.roleType === '采购商') && v.status === '启用') {
        flag = true
      }
    } else {
      flag = true
    }

  })
  if (flag) {
    return options.fn(this)
  }

}
