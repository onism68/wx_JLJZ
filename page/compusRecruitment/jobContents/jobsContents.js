// page/compusRecruitment/jobContents/jobsContents.js
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
        console.log(res)
        _that.setData({
          jobsId: res['data'],
        })
        wx.getStorage({
          key: 'jobs',
          success: function (res) {
            var _data = res['data']
            for (var i = 0; i < _data.length; i++) {
              if (_that.data.jobsId == _data[i]['JobsId']) {
                _that.setData({
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
      },
      fail: function(res) {
        console.log(res)
      },
    })
  }
})