// page/compusRecruitment/compusRecruitment.js
// var util = require("../../utils/util.js")
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // prompt: false,
    // jobsCon: "0"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  _this = this
    // console.log(this.data.jobsCon)
    this.getJobs()
    // console.log(this.data.jobsCon)
    // console.log()
    // this.prompt()
    this.toJobCon()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getJobs: function () {
    // 用创建ID map存取招聘信息，提高读取效率
    let jobsIdMap = new Map()
    app.jobsIdMap = jobsIdMap

    var today = app.util.formatTime(new Date()).substr(0, 10)
    console.log(app.util.formatTime(new Date()))
    var nextDayTimeStamp = Date.now() + 24 * 60 * 60 * 1000
    var nextDay0 = new Date(nextDayTimeStamp)
    var nextDay = app.util.formatTime(nextDay0).substr(0, 10)
    console.log(today)
    console.log(nextDay)
    // jobsDate = "2019-05-14"
    var that = this
    var jsonserver = app._server +"/xpuJobs/getJobs?startDate="+today
    console.log(jsonserver)
    wx.request({
      url: jsonserver,
      method: "GET",
      // dataType: "",
      success: function (res) {
        if (res.data && res.statusCode === 200) {
          var _data = res.data
          if (_data["err"] != 0) {
            that.setData({
              jobs: "err"
            })
          }
          var rows = _data['data']
          // console.log(rows)
          for (var i = 0; i < rows.length; i++) {
            var jobsId = rows[i]['JobsId']
            jobsIdMap.set(jobsId, rows[i])
            //var CompanyName = rows[i]['CompanyName'];
            // console.log(rows[i]['CompanyName']);
            // data: {
            //   jobs: CompanyName};
          }
          // test
          console.log(jobsIdMap)

          that.setData({
            jobsName: rows
          })
          console.log(rows)
          // return rows
          // wx.setStorage({
          //   key: 'jobs',
          //   data: jobsIdMap,
          //   success: function (res) {
          //     console.log(res)
          //   },
          //   fail: function (res) {
          //     console.log(res)
          //   }
          // })
        }
      }
    })
  },

  toJobCon: function (e) {
    var _that = this
    if (e == undefined) {
      wx.setStorage({
        key: 'jobsId',
        data: '',
      })
      console.log("用户初次打开本页面")
    } else if (e['target']['id'] === '') {
      // todo 以后完善，当此id为空时，将不显示内容，页面友好处理
      console.log("jobsId为空")
    } else {
      var _jobsId = e['target']['id']
      console.log(_jobsId)
      wx.setStorage({
        key: 'jobsId',
        data: _jobsId,
      })
      wx.navigateTo({
        url: '/page/compusRecruitment/jobContents/jobsContents',
      })
    }
  },








  prompt: function (e) {
    var _this = this
    if (e == undefined) {
      this.setData({
        // prompt: !this.data.prompt
      })
      console.log('页面初次渲染')
    } else if (e['target']['id']==="") {
      this.setData({
        prompt: !this.data.prompt
      })
      console.log("0000")
    } else {
      var _id = e['target']['id']
      wx.getStorage({
        key: 'jobs',
        success: function(res) {
          var _data = res['data']
          for (var i =0; i< _data.length; i++) {
            if (_id == _data[i]['JobsId']) {
              _this.setData({
                'CompanyName': _data[i]['CompanyName'],
                'CompanyType': _data[i]['CompanyType'],
                'Specialty': _data[i]['Specialty'],
                'PostDemand': _data[i]['PostDemand'],
                'MeetTime': _data[i]['MeetTime'],
                'SitusName': _data[i]['SitusName'],
                'CompanyLinkmen': _data[i]['CompanyLinkmen'],
                'CompanyTel': _data[i]['CompanyTel'],
                'CompanyEmail': _data[i]['CompanyEmail'],
                // 'CompanyType': _data[i]['CompanyLinkmen'],
              })
              console.log(_data[i]['CompanyName'])
            }
          }
          console.log(res)
        },
      })
      this.setData({
        // prompt: !this.data.prompt
        "jobsId": e['target']['id']
      })
      console.log("？？？？？")
      console.log(e['target']['id'])
    }
  }
})
