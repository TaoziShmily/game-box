const app = getApp();

const API_PATH = app.globalData.API_PATH;

const apiRequest = function (url, method='GET', data={}, header = {'content-type':'application/json'}) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: API_PATH+url,
            data: data,
            method: method,
            header: header,
            success: resolve,
            fail: reject
        })
    });
};

export {apiRequest}