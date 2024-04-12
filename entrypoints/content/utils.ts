import { ElMessage } from "element-plus";

const textHead = [
  '感谢您反馈',
  '谢谢您的反馈',
  '多谢您的反馈',
  '非常感谢反馈',
  '你好',
  '感谢您提交的反馈',
  '感谢反馈',
  '谢谢反馈',
  '多谢反馈'
]
const textFoot = [
  '谢谢',
  '多谢',
  '感谢',
  '3q',
  '感谢提交'
]

const querySelectorAll = (className: string) => {
  return document.querySelectorAll(`[class*="${className}"]`);
}

export const getSearchBtnDom = ():HTMLDivElement => {
  const BtnList = querySelectorAll("index-module__filter-btn--");
  return BtnList[0] as HTMLDivElement;
}

const checkLoading = () => {
  let timer: any = null;

  const promise = new Promise((resolve, reject) => {
    timer = setInterval(() => {
      const loadingDom =  document.querySelector('[class*="semi-dy-open-spin-wrapper"]');
      if (!loadingDom) {
        clearInterval(timer);
        resolve(true);
      }
    },50);
  });
  return promise;
}

export const searchClick = () => {
  getSearchBtnDom().click();
  return checkLoading();
}

const getReplyBtn = () => {
  const operateDom = querySelectorAll('index-module__operate--')?.[0];
  if (operateDom) {
    const operateBtnList = operateDom.querySelectorAll('.semi-dy-open-button-borderless');
    return operateBtnList;
  }
  return null;
}

const checkReplyContextDom = () => {
  let timer: any = null;

  const promise = new Promise<HTMLDivElement>((resolve, reject) => {
    timer = setInterval(() => {
      const replyContextDom =  document.querySelector('[class*="semi-dy-open-input-textarea-showClear"]');
      if (replyContextDom) {
        clearInterval(timer);
        resolve(replyContextDom as HTMLDivElement);
      }
    },50);
  });
  return promise;
}

const checkDom = (searchStr: string) => {
  let timer: any = null;

  const promise = new Promise<HTMLDivElement>((resolve, reject) => {
    timer = setInterval(() => {
      const replyContextDom =  document.querySelector(searchStr);
      if (replyContextDom) {
        clearInterval(timer);
        resolve(replyContextDom as HTMLDivElement);
      }
    },50);
  });
  return promise;
}

const replyContext = (sendContext: string, isFirst = false) => {
  const replyBtn = getReplyBtn()?.[0] as HTMLDivElement;
  if (replyBtn) {
    replyBtn.click();
    return checkReplyContextDom().then((replyContextDom) => {
      setText(replyContextDom, sendContext)
      let __resolve: any = null;
      let promise:any = new Promise((resolve) => {
        __resolve = resolve;
      });
      setTimeout(() => {
        (querySelectorAll('index-module__drawer-footer')[0]?.querySelector('.semi-dy-open-button-primary') as HTMLDivElement)?.click();
        setTimeout(() => {
          if (isFirst) {
            ElMessage.info('进入页面第一次，需要等我6秒，谢谢');
            const openDom = document.querySelector('.semi-dy-open-modal-content');
            setTimeout(() => {
              (openDom?.querySelector('.semi-dy-open-button-primary') as HTMLDivElement)?.click();
              __resolve();
            }, 6000);
          } else {
            __resolve();
          }
        }, 250)
      }, 250);
      return promise;
    })
  } else {
    return Promise.reject();
  }
}

const managementReply = (sendContext: string) => {
  const managementBtn = getReplyBtn()?.[1] as HTMLDivElement;
  if (managementBtn) {
    managementBtn.click();
    return checkDom('.semi-dy-open-input-textarea').then((replyContextDom) => {
      if (((replyContextDom as unknown) as HTMLTextAreaElement).disabled) {
        return Promise.reject('管理回复已关闭');
      } else {
        setText(replyContextDom, sendContext);
        (document.querySelectorAll('.semi-dy-open-modal-footer')[0]?.querySelector('.semi-dy-open-button-primary') as HTMLDivElement)?.click();
        return Promise.resolve(true);
      }
    })
  } else {
    return Promise.reject();
  }
}

const executeTaskItem = (cb: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      searchClick().then(() => {
        setTimeout(() => {
          cb(resolve);
        }, 300)
      })
    }, 500)
  })
}

let isEnd = false;
let count = 0;
let contextMessage: any = {};
const defaultMessage = '根据退款规则，若您符合退款条件，可在相关订单详情页申请退款。其他的问题，您可通过老师的抖音主页咨询老师相关课程问题.';

function getSendContent(sendContext: string) {
  sendContext = textHead[count % textHead.length] + ',' + (sendContext || defaultMessage) + textFoot[count % textFoot.length];
  return sendContext;
}

export const startTask = (sendContext: string, isFirst: boolean) => {
  if (isEnd) {
    return;
  }
  // const typeDom = (document.querySelector('.semi-dy-open-table-tbody')?.querySelector('.semi-dy-open-table-row')?.querySelectorAll('.semi-dy-open-table-row-cell')[2] as HTMLDivElement);
  // console.log(getSendContent(contextMessage[typeDom.innerText]));
  

  // 需要执行刷新、回复、进度管理三个操作
  // replyContext(getSendContent(contextMessage[typeDom.innerText]), isFirst).then(() => {
  //   console.log('触发')
  // })
  executeTaskItem((__resolve: any) => {
    const typeDom = (document.querySelector('.semi-dy-open-table-tbody')?.querySelector('.semi-dy-open-table-row')?.querySelectorAll('.semi-dy-open-table-row-cell')[2] as HTMLDivElement);
    return replyContext(getSendContent(contextMessage[typeDom.innerText]), isFirst).then(__resolve);
  }).then(() => {
    return executeTaskItem((__resolve: any) => {
      const typeDom = (document.querySelector('.semi-dy-open-table-tbody')?.querySelector('.semi-dy-open-table-row')?.querySelectorAll('.semi-dy-open-table-row-cell')[2] as HTMLDivElement);
      return managementReply(getSendContent(contextMessage[typeDom.innerText])).then(__resolve);
    })
  }).then(() => {
    setTimeout(() => {
      count++;
      startTask(contextMessage, false)
    }, 1000)
  });
}


export const start = (sendContext: any) => {
  isEnd = false;
  contextMessage = sendContext;
  count = Math.floor(Math.random()*1000);
  startTask(contextMessage, true)
}

export const end = () => {
  isEnd = true;
}


const setText = (textarea, sendContext: string) => {
  textarea.innerHTML = sendContext
  textarea.value = sendContext

  let event = new Event("input", { bubbles: true });
  //  React15
  event.simulated = true;
  //  React16 内部定义了descriptor拦截value，此处重置状态
  let tracker = textarea._valueTracker;
  if (tracker) {
    tracker.setValue(sendContext);
  }
  textarea.dispatchEvent(event);
}