// page/compusRecruitment/jobContents/jobsContents.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobsId: 0, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getJobsCon()
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
  getJobsCon: function () {
    var _that = this
    wx.getStorage({
      key: 'jobsId',
      success: function(res) {
        // console.log(app.jobsIdMap)
        _that.setData({
          jobsId: res['data'],
        })
        console.log(app.jobsIdMap)
        var content = app.jobsIdMap.get(_that.data.jobsId)
        // console.log(content)
        _that.setData({
          'CompanyName': content['CompanyName'],
          'CompanyType': content['CompanyType'],
          'Specialty': content['Specialty'],
          'PostDemand': content['PostDemand'],
          'MeetTime': content['MeetTime'],
          'SitusName': content['SitusName'],
          'CompanyLinkmen': content['CompanyLinkmen'],
          'CompanyTel': content['CompanyTel'],
          'CompanyEmail': content['CompanyEmail'],
          // 'CompanyType': content['CompanyLinkmen'],
        })
        console.log(content['CompanyName'])




        // wx.getStorage({
        //   key: 'jobs',
        //   success: function (res) {
        //     console.log(res)
        //     var _data = res
        //     console.log(_data)
        //     if (_that.data.jobsId == content['JobsId']) {
        //       _that.setData({
        //         'CompanyName': content['CompanyName'],
        //         'CompanyType': content['CompanyType'],
        //         'Specialty': content['Specialty'],
        //         'PostDemand': content['PostDemand'],
        //         'MeetTime': content['MeetTime'],
        //         'SitusName': content['SitusName'],
        //         'CompanyLinkmen': content['CompanyLinkmen'],
        //         'CompanyTel': content['CompanyTel'],
        //         'CompanyEmail': content['CompanyEmail'],
        //         // 'CompanyType': content['CompanyLinkmen'],
        //         })
        //       console.log(content['CompanyName'])
        //     }
        //     console.log(res)
        //   },
        // })
        
      },
      fail: function(res) {
        console.log(res)
      },
    })
  }
})