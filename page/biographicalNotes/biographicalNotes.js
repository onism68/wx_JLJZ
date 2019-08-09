// page/biographicalNotes/biographicalNotes.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['IT', '制造业', '互联网', '网络设备'],
    date: "1992-10-12",
    index: '0',
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  /**
   * 获取表单数据
   */
  submitData: function (event) {
    var that = this
    console.log(event.detail.value)
    console.log(event.detail.value.userName)
    var infovalue = event.detail.value
    // wx.setStorage({
    //   key: 'resumeInfo',
    //   data: event.detail.value,
    // })
    // var u = {
    //   a: 'a',
    //   b: 'b'
    // }
    wx.request({
      url: app._server +'/wxResume/tplToResume',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      // data: event.detail.value,
      data: {
        userName: u
      },

      success (res) {
        if (res.data['err'] != 0) {
          wx.showToast({
            title: 'err',
            icon: 'none',
          })
        }
        console.log(res.data)
      }
    })

    // wx.showToast({
    //   title: '数据提交成功',
    // })
    // wx.navigateTo({
    //   url: '/page/biographicalNotes/down/down',
    // })
  },
  note: function (e) {
    this.setData({
      note: e.detail.value,
      length: e.detail.value.length
    })
  },
  /**
 * 获取行业数据
 */
  bindIndustryChange: function (event) {
    this.setData({
      index: event.detail.value
    })

  },
  /**
 * 获取日期数据
 */
  bindDateChange: function (event) {
    this.setData({
      date: event.detail.value
    })
  },

  /*

  */
  checkSexChange: function(e) {
    console.log(e.detail.value)
  },
  clearImg: function (e) {
    var nowList = [];//新数据
    var uploaderList = this.data.uploaderList;//原数据

    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },
  //展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1 - that.data.uploaderNum, // 默认1
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length == 1) {
          that.setData({
            showUpload: false
          })
        }
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })
      }
    })
  },
})
