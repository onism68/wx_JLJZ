// page/biographicalNotes/biographicalNotes.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // array: ['IT', '制造业', '互联网', '网络设备'],
    bdate: "1999-01-01",
    shi1date: "2016-09-01",
    shi2date: "2016-09-01",
    bydate: "2016-09-01",
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,
    awardData: "",
    zipingData: "",
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
    // console.log(event.detail.value.userName)
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
        userName: infovalue['userName'],
        sex: infovalue['sex'],
        local: infovalue['local'],
        age: infovalue["age"],
        hangYe: infovalue['hangye'],
        phone: infovalue['phone'],
        university: infovalue["university"],
        beginYear: infovalue['bydate'],
        email: infovalue['email'],
        speciality: infovalue["speciality"],
        subject: infovalue["subject"],
        mianmao: infovalue['mianMao'],
        shixi11: infovalue['shi1date'],
        shixi12: infovalue['shixi12'],
        shixi13: infovalue['shixi13'],
        shixi14: infovalue['shixi14'],
        shixi21: infovalue['shi2date'],
        shixi22: infovalue['shixi22'],
        shixi23: infovalue['shixi23'],
        shixi24: infovalue['shixi24'],
      },

      success (res) {
        if (res.data['err'] != 0) {
          wx.showToast({
            title: res.data['data'][0],
            icon: 'none',
          })
        } else {
          wx.showToast({
            title: 'ok!!!',
          })
          wx.navigateTo({
            url: '/page/biographicalNotes/down/down',
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
  award: function (e) {
    this.setData({
      awardData: e.detail.value,
      length: e.detail.value.length
    })
  },
  ziping: function (e) {
    this.setData({
      zipingData: e.detail.value,
      length: e.detail.value.length
    })
  },
  /**
 * 获取行业数据
 */
  // bindIndustryChange: function (event) {
  //   this.setData({
  //     index: event.detail.value
  //   })

  // },
  /**
 * 获取日期数据
 */

  // 生日
  bindbDateChange: function (event) {
    this.setData({
      bdate: event.detail.value
    })
  },
  // 实习1时间
  bindshi1DateChange: function (event) {
    this.setData({
      shi1date: event.detail.value
    })
  },
  // 实习2时间
  bindshi2DateChange: function (event) {
    this.setData({
      shi2date: event.detail.value
    })
  },
  // 毕业时间
  bindbyDateChange: function (event) {
    this.setData({
      bydate: event.detail.value
    })
  },

  // 性别
  checkSexChange: function(e) {
    console.log(e.detail.value)
  },

  cccc: function (e) {
    console.log("你好")
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
        wx.uploadFile({
          url: app._server + "/wxResume/uploadImage",
          filePath: res.tempFilePaths[0],
          name: 'upload-file',
          header: {
            "Content-Type": "multipart/form-data"//记得设置
          },
          success: function(res) {
            console.log(res)
          }
        })
      }
    })
  },
})
