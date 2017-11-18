// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    wpSort:[],
    wpDetail:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      id: options.id
    }),
    console.log(this.data.id)
    //根据物品id再次查询物品详细信息
    wx.request({
      url: 'http://192.168.3.9:4002/Test/getGoodById', //仅为示例，并非真实的接口地址
      data: {
        // x: '',
        // y: '',
        id:this.data.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        
        that.setData({
          wpDetail:res.data,
          
        })
      }
    });
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
  
  }
})