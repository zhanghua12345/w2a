/* eslint-disable */

/* 前端调用app后。告诉app 调用的方法，与此同时注册（同名）回调函数

* 在app执行完毕后，调用（同名）回调函数达到 get 参数的目的；

* 原理： 利用windows 为载体，发布订阅，结合 promise

*

*

*/

let CALLBACK_NAME = "myApp2jsBridge.callback";

let TRIGGER_NAME = "myApp2jsBridge.trigger";

const ua = navigator.userAgent.toLowerCase();

let isIOS = /iphone|ipad|ipod/.test(ua);

let isAndroid = /android/.test(ua);

let send = function (name, params) {
  let data = JSON.stringify(params);

  switch (true) {
    case isIOS:
      sendIOS(name, data);

      break;

    case isAndroid:
      sendAndroid(name, data);

      break;

    default:
      console.log("不是移动端", name, params);
  }
};

let getToken = (function () {
  let num = 0;

  return function () {
    num++;

    return `${num}`;
  };
})();

function clone(base, obj) {
  if (arguments.length === 1) {
    obj = base;

    base = {};
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      base[key] = obj[key];
    }
  }

  return base;
}

window[CALLBACK_NAME] = function (args) {
  let name = args.__name;

  let token = args.__token;

  if (!name || !token) return;

  if (window[CALLBACK_NAME][name] && window[CALLBACK_NAME][name][token]) {
    window[CALLBACK_NAME][name][token](args);

    delete window[CALLBACK_NAME][name][token];
  }
};

// app主动触发js，把方法放到数组中

window[TRIGGER_NAME] = function (args) {
  let name = args.__name;

  let token = args.__token;

  if (!name || !token) return;

  if (window[TRIGGER_NAME][name]) {
    window[TRIGGER_NAME][name].forEach((fn) => {
      fn && fn(args);
    });
  }
};

function sendIOS(name, params) {
  try {
    window.webkit.messageHandlers[name].postMessage(params);
  } catch (e) {
    console.log("ios消息发送失败", e.message);
  }
}

function sendAndroid(name, params) {
  console.log(name, params);
  try {
    params
      ? window.AndroidInterface[name](params)
      : window.AndroidInterface[name]();
  } catch (e) {
    console.log("android消息发送失败", e.message);
  }
}

/**

* js向app发送详细

* @name<String>: 接口名

* @params<Object>：参数对象，不需要传空对象

* @needCallback<Boolean>: 是否需要Promise回调

* */

export function js2app(name, params, needCallback) {
  if (!!needCallback === false) {
    return send(name, params);
  }
  let token = getToken();

  return new Promise((resolve, reject) => {
    window[CALLBACK_NAME][name] = window[CALLBACK_NAME][name] || {};

    window[CALLBACK_NAME][name][token] = function (args) {
      args = args || {};

      if (args.__status === 0) {
        delete args.__name;

        delete args.__token;

        delete args.__status;

        delete args.__message;

        resolve(args);
      } else {
        reject(args.__message);

        console.error(name + "\n" + args.__message);
      }
    };

    send(name, clone({ __token: token }, params));
  });
}

/**

* app调用js中的方法

* @name<String>: js中的方法名给app标识用

* @callback<Function>: js使用的回调方法，如果回调方法返回一个Primose，会自动通知app端

* */

export function app2js(name, callback) {
  window[TRIGGER_NAME][name] = window[TRIGGER_NAME][name] || [];
  window[TRIGGER_NAME][name].push((args) => {
    let token = args.__token;

    // var data = clone({}, args);

    let promise;

    delete args.__name;

    delete args.__token;

    promise = callback(clone({}, args));
    promise &&
      promise.then &&
      promise.then(
        (data) => {
          let result = clone(
            {
              __token: token,

              __status: 0,
            },
            data
          );

          send(name, result);
        },

        (message) => {
          let sendData = {};

          let status = 1;

          let result;

          if (typeof message === "object") {
            sendData = message;

            status = sendData.status || status;

            message = sendData.message;

            sendData = sendData.data || {};
          }

          result = clone(
            {
              __token: token,

              __status: status,

              __message: message,
            },
            sendData
          );

          send(name, result);
        }
      );
  });
}
