// import { setShare as appShare } from './jsbridge.js';
import { wxSignature,getJsTicketSign } from '@/api';

import wx from 'weixin-js-sdk';

// 要隐藏的菜单项，所有menu项见附录3
const menuList = ['menuItem:share:qq','menuItem:share:weiboApp','menuItem:copyUrl','menuItem:share:email','menuItem:openWithQQBrowser',
'menuItem:readMode','menuItem:openWithSafari','menuItem:share:QZone','menuItem:refresh'];
export async function getSign(par = {},shareParam) {
  try {
    const curLocation = window.location.href.split('#')[0];
    const params = {
      url: curLocation,
    };
    const data = await getJsTicketSign(params, {
      callback: par.callback,
      errHandler: par.errHandler,
    });
    const signData = data.data.data;
    console.log('appid',signData.appId)
    if (signData) {
      const jsApiList = [
        'checkJsApi',
        'closeWindow',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'updateAppMessageShareData',
        'updateTimelineShareData',
        'hideMenuItems'

      ];
      console.log('appid',signData.appId);
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: signData.appId, // 必填，公众号的唯一标识
        timestamp: signData.timestamp, // 必填，生成签名的时间戳
        nonceStr: signData.nonceStr, // 必填，生成签名的随机串
        signature: signData.signature, // 必填，签名，见附录1
        jsApiList, // 必填，需要使用的JS接口列表，
      });  
      wx.error(res => {
        console.log('签名失败=============')
        console.log(JSON.stringify(res));
        console.log('签名失败=============')
        if (par.errHandler) {
          par.errHandler();
        }
      });
      wx.ready(() => {
        try{
          const media = document.getElementById('audio');
          media.src = process.env.VUE_APP_AUDIO;
          media.play();
          console.log('el dio',media.src,document.getElementById('audio'))
        }catch(e){

          console.log('2',e)
        }
       
        wx.checkJsApi({
          jsApiList: [
            'closeWindow',
            'hideOptionMenu',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'hideMenuItems'
          ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success(res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            console.log(res);
          },
        });
        // wx.hideOptionMenu();
        wx.hideMenuItems({ menuList });
        //分享到朋友圈
        wx.onMenuShareTimeline({
          title: shareParam.shareTitle, // 分享标题
          desc: shareParam.shareContent, // 分享描述
          link: shareParam.shareUrl, // 分享链接
          imgUrl: shareParam.imageArray[0], // 分享图标
          success: r => {
            // 用户确认分享后执行的回调函数
            // setTimeout(() => {
            //   sensors.trackAsAutoTrack('$WebClick', {
            //     $element_id: 'share_wxfriendgroup_click',
            //     $element_content: '微信朋友圈',
            //   });
            // }, 300);
            
            if (successCallback && typeof successCallback === 'function') {
              successCallback(r)
            }
          },
          cancel: r => {
            // 用户取消分享后执行的回调函数
            console.log('------share error---------')
            console.log(r);
            console.log('------share error---------')
          },
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
          title: shareParam.shareTitle, // 分享标题
          desc: shareParam.shareContent, // 分享描述
          link: shareParam.shareUrl, // 分享链接
          imgUrl: shareParam.imageArray[0], // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: r => {   
            if (successCallback && typeof successCallback === 'function') {
              successCallback(r)
            }
          },
          cancel: r => {
            // 用户取消分享后执行的回调函数
            console.log('------share error---------')
            console.log(r);
            console.log('------share error---------')
          },
        });
      });
    } 
    
  } catch (e) {
    console.log(e)
  }
}
// // 要隐藏的菜单项，所有menu项见附录3
// const menuList = ['menuItem:share:qq','menuItem:share:weiboApp','menuItem:copyUrl','menuItem:share:email','menuItem:openWithQQBrowser',
// 'menuItem:readMode','menuItem:openWithSafari','menuItem:share:QZone','menuItem:refresh'];

async function wxShare(shareParam, successCallback) {
  try {
    const url = location.href.split('#')[0];
    let config = {};
    const result = await wxSignature({ url });
    if (result.data) {
      config = result.data;
      wx.config({
        debug: false,
        appId: config.appid,
        timestamp: config.timestamp,
        nonceStr: config.nonceStr,
        signature: config.signature,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'hideMenuItems'
        ],
      });
      wx.error(res =>{
        console.log(res)
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
      wx.ready(() => {
        wx.hideMenuItems({ menuList });
        wx.onMenuShareTimeline({
          title: shareParam.shareTitle, // 分享标题
          desc: shareParam.shareContent, // 分享描述
          link: shareParam.shareUrl, // 分享链接
          imgUrl: shareParam.imageArray[0], // 分享图标
          success: r => {
            // 用户确认分享后执行的回调函数
            // setTimeout(() => {
            //   sensors.trackAsAutoTrack('$WebClick', {
            //     $element_id: 'share_wxfriendgroup_click',
            //     $element_content: '微信朋友圈',
            //   });
            // }, 300);
            
            if (successCallback && typeof successCallback === 'function') {
              successCallback(r)
            }
          },
          cancel: r => {
            // 用户取消分享后执行的回调函数
            console.log('------share error---------')
            console.log(r);
            console.log('------share error---------')
          },
        });
        wx.onMenuShareAppMessage({
          title: shareParam.shareTitle, // 分享标题
          desc: shareParam.shareContent, // 分享描述
          link: shareParam.shareUrl, // 分享链接
          imgUrl: shareParam.imageArray[0], // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: r => {
            // 用户确认分享后执行的回调函数
            setTimeout(() => {
              sensors.trackAsAutoTrack('$WebClick', {
                $element_id: 'share_wxfriend_click',
                $element_content: '微信好友',
              });
            }, 300)
            
            if (successCallback && typeof successCallback === 'function') {
              successCallback(r)
            }
          },
          cancel: r => {
            // 用户取消分享后执行的回调函数
            console.log('------share error---------')
            console.log(r);
            console.log('------share error---------')
          },
        });
      });
    }
  } catch (e) {
    console.log(e)
  }
  
}