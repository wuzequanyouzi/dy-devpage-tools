const firstTypeMap = {
  function: '功能体验与使用',
  order: '支付订单与退款',
  other: '相关咨询与建议',
  goods: '商品内容与服务',
}

const secondTypeMap = {
  function: [
    {
      content: '加载缓慢/失败',
      key: 'loading',
      reply: '请检查网络连接，并尝试重新加载',
    },
    {
      key: 'kale',
      content: '卡死/黑白屏',
      reply: '请尝试重启应用或小程序，并尝试重新加载',
    },
    {
      content: '视频加载异常',
      key: 'loadingError',
      reply: '请尝试重启应用或小程序，并尝试重新加载',
    },
    {
      content: '下载/上传失败',
      key: 'downloadupload',
      reply: '请尝试重启应用或小程序，并尝试重新加载',
    },
    {
      content: '搜索失败',
      key: 'search',
      reply: '请尝试重启应用或小程序，并尝试重新加载',
    },
    {
      content: '无法登录',
      key: 'login',
      reply: '请尝试重启应用或小程序，并尝试重新加载',
    },
    {
      content: '其他',
      key: 'other',
      reply: '请尝试重启应用或小程序，并尝试重新加载',
    }
  ],
  order: [
    {
      content: '退款不成功',
      reply: '根据退款规则，若您符合退款条件，可在相关订单详情页申请退款。',
    },
    {
      content: '无退款入口',
      reply: '根据退款规则，若您符合退款条件，可在相关订单详情页申请退款。',
    },
    {
      content: '支付失败',
      reply: '请检查网络连接，重启应用或小程序，并尝试重新加载！',
    },
    {
      content: '支付成功为显示',
      reply: '请检查网络连接，重启应用或小程序，并尝试重新加载！',
    },
    {
      content: '商家不接待',
      reply: '您可以通过老师的抖音主页咨询老师，或根据退款规则，符合退款条件，可在订单详情页申请退款！',
    },
    {
      content: '无故被扣费',
      reply: '根据退款规则，若您符合退款条件，可在相关订单详情页申请退款。',
    },
    {
      content: '催促退款',
      reply: '请您耐心等待，符合退款条件，商家会在24小时内进行处理。',
    },
    {
      content: '其他',
      reply: '根据退款规则，若您符合退款条件，可在相关订单详情页申请退款。其他的问题，您可通过老师的抖音主页咨询老师相关课程问题。',
    },
  ],
  other: [
    {
      content: '小程序建议',
      reply: '您提的建议非常宝贵，我们产品会进行评估，祝您生活愉快！'
    },
    {
      content: '问题咨询',
      reply: '根据退款规则，若您符合退款条件，可在相关订单详情页申请退款。其他的问题，您可通过老师的抖音主页咨询老师相关课程问题.'
    },
    {
      content: '其他',
      reply: '根据退款规则，若您符合退款条件，可在相关订单详情页申请退款。其他的问题，您可通过老师的抖音主页咨询老师相关课程问题.'
    },
  ],
  goods: [
    {
      content: '描述不符',
      reply: '根据退款规则，若您符合退款条件，可在相关订单详情页申请退款。其他的问题，您可通过老师的抖音主页咨询老师相关课程问题.'
    },
    {
      content: '内容质量差',
      reply: '根据退款规则，若您符合退款条件，可在相关订单详情页申请退款。其他的问题，您可通过老师的抖音主页咨询老师相关课程问题.'
    }
  ]
};

export const typeMap = (() => {
  let allTypes:any = {};
  for (const key in firstTypeMap) {
    const firstType = firstTypeMap[key as keyof typeof firstTypeMap];
    const secondTypeList = secondTypeMap[key as keyof typeof secondTypeMap];
    for (const iterator of secondTypeList) {
      const content = `${firstType} /${iterator.content}`;
      allTypes[content] = iterator.reply || '';
    }
  };
  return allTypes;
})();