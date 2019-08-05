// page/biographicalNotes/biographicalNotes.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['IT', '制造业', '互联网', '网络设备'],
    date: "1992-10-12",
    index: '0'
  },
  /**
   * 获取表单数据
   */
  submitData: function (event) {
    console.log(event.detail.value)
    wx.showToast({
      title: '数据修改成功',
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
  }
})
