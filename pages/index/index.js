//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputValue:"",
    wpSort:[],  //物品分类
    wpAddress:[],  //物品地点
    wpDate:[],
    idSort:'',  
    idAddress:'',
    idDate:'',
    
    newsList: [],
    showView: false
    // wpPlace: [['航海楼', '主楼'], ['1楼', '2楼', '3楼', '4楼', '5楼'], ['101', '103', '105', '107', '111']],
    // multiIndex: ['', '', ''],
    // newsList: [
    //   { id: 7, img: "../../images/1.jpg", name: "校园卡", place: "航海楼", date: "2017-10-11" },
    //   { id: 8, img: "../../images/2.jpg", name: "钱包", place: "主楼", date: "2017-10-11" },
    //   { id: 9, img: "../../images/3.jpg", name: "笔记本", place: "航海楼", date: "2017-10-11" },
    //   { id: 10, img: "../../images/4.jpg", name: "伞", place: "图书馆", date: "2017-10-11" },
    //   { id: 4, img: "../../images/5.jpg", name: "U盘", place: "航海楼", date: "2017-10-11" },
    // ],
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(){
    var that = this;
    
    //第一次网络请求，请求查询物品类别
    wx.request({
      url: 'http://192.168.3.9:4002/Test/getType', //仅为示例，并非真实的接口地址
      data: {
        // x: '',
        // y: '',
        // id: this.data.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          wpSort: res.data,
        })
      }
    });
  },
 
  //物品分类选择
  bindSortChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that=this;
    that.setData({
      idSort: e.detail.value
    })
    
    console.log(this.data.wpSort[this.data.idSort])
    // //第二次网络请求，根据物品类别查询相关物品信息
    // wx.request({
    //   url: 'http://192.168.3.9:4002/Test/getSortGoods', 
    //   data: {
    //     // x: '',
    //     // y: '',
    //     sort: this.data.wpSort[this.data.idSort]
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       newsList: res.data,
    //       //showView: true
    //     })
    //   }
    // });

    //第二次网络请求，根据物品类别查询物品地点
    wx.request({
      url: 'http://192.168.3.9:4002/Test/getLostAddressBySort',
      data: {
        // x: '',
        // y: '',
        sort: this.data.wpSort[this.data.idSort]
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          wpAddress: res.data,
          showView: false,   //重新选择类别时，物品信息清空
          wpDate:'',   //物品地点也改为空
        })
      }
    });
  },

  //物品地点选择
  bindAddressChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    that.setData({
      idAddress: e.detail.value
    })
    console.log(this.data.wpSort[this.data.idAddress])
    
    //第三次网络请求，根据物品类别、地点查询物品日期
    wx.request({
      url: 'http://192.168.3.9:4002/Test/getDateBySortAddress',
      data: {
        // x: '',
        // y: '',
        sort: this.data.wpSort[this.data.idSort],
        address:this.data.wpAddress[this.data.idAddress]
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          wpDate: res.data,
          showView: false   //重新选择地点时，物品信息先清空
        })
      }
    });
  },
  //日期选择
  bindDateChange: function (e) {
    var that=this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      idDate: e.detail.value
    }),
    //第四次网络请求，根据物品类别、地点、日期，查询物品信息
    wx.request({
      url: 'http://192.168.3.9:4002/Test/getGoodsBySAD',
      data: {
        // x: '',
        // y: '',
        sort: this.data.wpSort[this.data.idSort],  //类别
        address: this.data.wpAddress[this.data.idAddress],  //地点
        date: this.data.wpDate[this.data.idDate]  //日期
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          newsList: res.data,
          showView: true
        })
      }
    });
  },

  // //物品地点选择
  // bindMultiPickerChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     multiIndex: e.detail.value
  //   })
  // },

  // bindMultiPickerColumnChange: function (e) {
  //   console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
  //   var data = {
  //     wpPlace: this.data.wpPlace,
  //     multiIndex: this.data.multiIndex
  //   };
  //   data.multiIndex[e.detail.column] = e.detail.value;
  //   switch (e.detail.column) {
  //     //选择第0列
  //     case 0:
  //       switch (data.multiIndex[0]) {
  //         //第0列第0个 航海楼
  //         case 0:
  //           data.wpPlace[1] = ['1楼', '2楼', '3楼', '4楼', '5楼', '6楼', '7楼'];//航海楼楼层
  //           data.wpPlace[2] = ['101', '103', '105', '107', '111'];//每一楼层教室
  //           break;
  //         //第0列第1个  主楼
  //         case 1:
  //           data.wpPlace[1] = ['1楼', '2楼', '3楼', '4楼'];
  //           data.wpPlace[2] = ['101', '103', '105', '107'];
  //           break;
  //       }
  //       data.multiIndex[1] = 0;
  //       data.multiIndex[2] = 0;
  //       break;

  //     //选择第1列
  //     case 1:
  //       switch (data.multiIndex[0]) {
  //         //判断第0列  第0列第0个 航海楼
  //         case 0:
  //           switch (data.multiIndex[1]) {
  //             //第1列第0个 航海楼1楼 （0，0）
  //             case 0:
  //               data.wpPlace[2] = ['101', '103', '105', '107', '111'];//第2列
  //               break;
  //             //第1列第1个   （0，1）
  //             case 1:
  //               data.wpPlace[2] = ['201', '203', '205', '207', '211'];
  //               break;
  //             case 2:
  //               data.wpPlace[2] = ['301', '303', '305', '307', '311'];
  //               break;
  //             case 3:
  //               data.wpPlace[2] = ['401', '403', '405', '407', '411'];
  //               break;
  //             case 4:
  //               data.wpPlace[2] = ['501', '503', '505', '507', '511'];
  //               break;
  //           }
  //           break;

  //         //第0列第1个  主楼
  //         case 1:
  //           switch (data.multiIndex[1]) {
  //             //第0列第1个 第1列第0个（1，0）
  //             case 0:
  //               data.wpPlace[2] = ['101', '103', '105', '107', '109'];
  //               break;
  //             case 1:
  //               data.wpPlace[2] = ['201', '202', '205', '207', '211'];
  //               break;
  //             case 2:
  //               data.wpPlace[2] = ['301', '307', '309', '311'];
  //               break;
  //             case 3:
  //               data.wpPlace[2] = ['401', '407', '409', '411'];
  //               break;
  //           }
  //           break;
  //       }
  //       data.multiIndex[2] = 0;
  //       console.log(data.multiIndex);
  //       break;
  //   }
  //   this.setData(data);
  // },

  bindKeyInput:function(e){
    this.setData({
      inputValue:e.detail.value
    })
  },
  wxSearch:function(){
    console.log(this.data.inputValue);
     var that = this;
      that.setData({
        showView: (!that.data.showView)
      })
    console.log(this.data.showView)
  }
})
