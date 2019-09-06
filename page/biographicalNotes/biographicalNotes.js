// page/biographicalNotes/biographicalNotes.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexItems: [
      { name: '男', value: '1' },
      { name: '女', value: '0', checked: true }
    ],
    // array: ['IT', '制造业', '互联网', '网络设备'],
    bdate: "1999-01-01",
    shi1date: "2017-07-01",
    shi2date: "2018-08-01",
    bydate: "2016-09-01",
    zheng1date: "2019-05-01",
    zheng2date: "2019-06-01",
    jiang1date: "2019-08-01",
    jiang2date: "2019-09-01",
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,
    noteData: "",
    awardData: "",
    zipingData: "",
    userId: 0, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var code = "";
    //首先默认code为空字符串
    //设置长度，这里看需求，我这里设置了10
    var codeLength = 16;
    //设置随机字符
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    //循环codeLength 我设置的10就是循环10次
    for (var i = 0; i < codeLength; i++) {
      //设置随机数范围,这设置为0 ~ 36
      var index = Math.floor(Math.random() * 36);
      //字符串拼接 将每次随机的字符 进行拼接
      code += random[index];
    }
    this.setData({
      userId: app.md5.md5(code)
    })
    console.log(code)
    console.log(app.md5.md5(code))
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
        userId: this.data.userId,
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
        shixi21: infovalue['shi2date'],
        shixi22: infovalue['shixi22'],

        jiang1date: infovalue['jiang1date'],
        jiang12: infovalue['jiang12'],

        jiang2date: infovalue['jiang2date'],
        jiang22: infovalue['jiang22'],

        zheng1date: infovalue['zheng1date'],
        zheng12: infovalue['zheng12'],
        
        zheng2date: infovalue['zheng2date'],
        zheng22: infovalue['zheng22'],
      },

      success (res) {
        console.log("err", res.data["err"])
        if (res.data["err"] != 0) {
          if (res.data["err"] == 2) {
            wx.showToast({
              title: '请上传个人照片',
              icon: "none",
            })
          } else if (res.data["err"] == 1) {
            // 
            console.log(res.data)
            wx.showToast({
              title: res.data['data'][0],
              icon: 'none',
            })
          }
          return
        } else {
          wx.showToast({
            title: 'ok!!!',
          })
          wx.setStorage({
            key: 'docxFileName',
            data: that.data.userId,
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
  note: function (e) {
    this.setData({
      noteData: e.detail.value,
      length: e.detail.value.length
    })
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
  // 学历开始时间
  bindbyDateChange: function (event) {
    this.setData({
      bydate: event.detail.value
    })
  },
  // 奖项1时间
  bindjiang1DateChange: function (event) {
    this.setData({
      jiang1date: event.detail.value
    })
  },
  // 奖项2时间
  bindjiang2DateChange: function (event) {
    this.setData({
      jiang2date: event.detail.value
    })
  },
  // 证书1时间
  bindzheng1DateChange: function (event) {
    this.setData({
      zheng1date: event.detail.value
    })
  },
  // 证书2时间
  bindzheng2DateChange: function (event) {
    this.setData({
      zheng2date: event.detail.value
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
          formData: {
            userId : that.data.userId
          },
          success: function(res) {
            console.log(res)
          }
        })
      }
    })
  },
})
