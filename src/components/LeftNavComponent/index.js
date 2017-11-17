const http = require('../../common/http.js');
const leftNavTemplate = require('./LeftNav.template');
const leftNavData = require("./LeftNavData.js");

import './style.less';

$(function () {
  http.ajax({
    url: '/treasureWeb/main/getEnterpriseRole.do',
  }).then(function (data) {
    let roledata = data[0];
    if (roledata.code === 0) {
      let roleType = roledata.data ? roledata.data : [];
      $(".m-leftnav").html(leftNavTemplate({
        data: leftNavData,
        roleData: roleType
      }));
      //下拉列表
      var flag = 0;
      $("#supplier").on("click", ".btn", function () {
        $(".subnav").slideToggle();

        if (flag == 0) {
          $(".btn").find("span").addClass("trans");
          flag = 1;
        } else {
          $(".btn").find("span").removeClass("trans");
          flag = 0;
        }
      })
    }
  }, function (data) { });
})