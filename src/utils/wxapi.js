
import wx from 'weixin-js-sdk';
export async function getSign(par = {}){
    try{
        const curLocation = window.location.href.split('#')[0];
        const params = {
            url:curLocation,
        }
        const data = await getJsTicketSign(params,{
            callback:par.callback,
            errHandler:par.errHandler,
        })
        if(data.data){
            const jsApiList = [
                'checkJsApi',
                'hideOptionMenu',
                'closeWindow',
            ];
            wx.config({
                debug:false,
                appId:data.data.appId,
                timestamp:data.data.timestamp,
                nonceStr:data.data.nonceStr,
                signature:data.data.signature,
                jsApiList,
            });
            wx.error(res => {
                console.log(JSON.stringify(res));
                if(par.errHandler){
                    par.errHandler();
                }
            });
            wx.ready(()=> {
                wx.checkJsApi({
                    jsApiList:[
                        'hideOptionMenu',
                        'closeWindow',
                    ],
                    success(res){
                        // 以键值对的形式返回，可用的api值true，不可用为false
                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                        console.log(res)
                    },   
                });
                wx.hideOptionMenu();
                document.getElementById('audio').play();
            })

        }
        
    } catch(e){
        console.log('getSign error:',e);
    }
}

export function closeWebview() {
    wx.closeWindow();
  }
