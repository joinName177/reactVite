export const  env = {
  // dev 环境变量 
  dev: {
    variables: {
      VERBOSE: '', // 有效取值 'sql'。执行前打印SOL语句，日志量巨大需要时自行打开
      PRODUCT_NAME_CH: '掌控者', //中文名
      PRODUCT_NAME: 'holder-paas-test',
      API_PROTOCOL: 'https://',
      API_HOST: 'goalgo-paas.holderzone.cn',
      API_FILE_HOST: 'https://paas-office-api.holderzone.cn', //附件
      MANAGE_SERVICE: 'https://goalgo-paas-ver.holderzone.cn',
      BOSH_SERVICE: 'http://paasim.holderzone.cn:38855',
      ROOM_SERVICE: '@muc.paasim.holderzone.cn',
      IPSUFFIX: '@paasim.holderzone.cn',
      API_BASE_PATH: '',
      CLOUDDISK_SERVICE: 'cloudisk.goalgo.cn:31010',
      SOCKET_SERVER: 'http://gateway.hp.goalgo.cn:31070',
      ORG_URL: 'http://goalgo-paas-emb.holderzone.cn/',
      ODOO_MY_APP: 'http://hes.dev.goalgo.cn/goalgo_sync/auth/login',
      UPGRADE_URL: 'https://getup.goalgo.cn/oa/',
      WEBSOCKET_URL: 'ws://paasim.holderzone.cn:38855',
      PLAN_WS_URL: 'ws://paas-auth.holderzone.cn/collab',
      PLAN_WS_URL_BETA: 'ws://paas-auth.holderzone.cn/collab',//增量更新服务器地址
      PART_UPDATE_URL: 'https://getup.goalgo.cn/oa/update/',
      CRM_SALES_SERVICE: 'sale-crm.holderzone.cn/ ',
      KEYCLOAK_SERVICE: 'https://paas-auth.holderzone.cn/', //keycloak服务器地址
      KEYCLOAK_REALM: 'paas', //keycloak realm配置
      KEYCLOAK_CLIENT: 'holder-pc', //keycloak clientId配置
      OUTSIDE_EMB_SERVICE: 'https://goalgo-paas-emb.holderzone.cn/', //查看企管后台链接的域名
      ORG_SELECT_SERVICE: 'https://goalgo-paas.holderzone.cn', //查看选人组件链接的域名
      DOC_PLAN_URL: 'https://goalgo-paas-editor-client.holderzone.cn', //清单地址
      TRACK_SERVICE: 'https://goalgo-paas-log.holderzone.cn/operlog/behavior', //埋点服务地址
      CRASH_REPORT_SERVICE: 'https://d-crc.holderzone.com/report', // 崩溃上报
    },
  },
  // prod 环境变量 
  prod: {
    variables: {
      VERBOSE: '', // 有效取值 'sql'。执行前打印SOL语句，日志量巨大需要时自行打开
      PRODUCT_NAME_CH: '掌控者', //中文名
      PRODUCT_NAME: 'holder',
      API_PROTOCOL: 'https://',
      API_HOST: 'goalgo-paas.holderzone.com',
      API_FILE_HOST: 'https://onlyoffice-accessory.holderzone.com', //附件-正式环境
      METABASE_URL: 'https://metabase.goalgo.cn', //matabase地址
      BOSH_SERVICE: 'http://goalgo-paasim.holderzone.com:5290',
      ROOM_SERVICE: '@muc.goalgo-paasim.holderzone.com',
      IPSUFFIX: '@goalgo-paasim.holderzone.com',
      WEBSOCKET_URL: 'ws://goalgo-paasim.holderzone.com:5290',
      PLAN_WS_URL: 'ws://goalgo-paas-auth.holderzone.com/collab',
      PLAN_WS_URL_BETA: 'ws://paas-auth-re.holderzone.com/collabv2',
      API_BASE_PATH: '',
      CLOUDDISK_SERVICE: 'cloudisk.goalgo.cn:31010',
      ORG_URL: 'https://goalgo-paas-emb.holderzone.com/',
      ODOO_MY_APP: 'http://hes.goalgo.cn/goalgo_sync/auth/login',
      UPGRADE_URL: 'https://getup.goalgo.cn/oa/', //上线升级地址
      PART_UPDATE_URL: 'https://getup.goalgo.cn/oa/update/',
      CRM_SALES_SERVICE: 'zkzoa.holderzone.com/',
      MANAGE_SERVICE: 'https://goalgo-paas-ver.holderzone.com',
      KEYCLOAK_SERVICE: 'https://goalgo-paas-auth.holderzone.com/', //keycloak服务器地址
      KEYCLOAK_REALM: 'paas', //keycloak realm配置
      KEYCLOAK_CLIENT: 'holder-pc', //keycloak clientId配置
      OUTSIDE_EMB_SERVICE: 'https://goalgo-paas-emb.holderzone.com/', //查看企管后台链接的域名
      ORG_SELECT_SERVICE: 'https://goalgo-paas.holderzone.com', //查看选人组件链接的域名
      DOC_PLAN_URL: 'https://goalgo-paas-editor-client.holderzone.com', //清单地址
      TRACK_SERVICE: 'https://goalgo-paas-log.holderzone.com/operlog/behavior', //埋点服务地址
      CRASH_REPORT_SERVICE: 'https://d-crc.holderzone.com/report', // 崩溃上报
    },
  },
  // re 环境变量 
  re: {
    variables: {
      VERBOSE: '', // 有效取值 'sql'。执行前打印SOL语句，日志量巨大需要时自行打开
      PRODUCT_NAME_CH: '掌控者', //中文名
      PRODUCT_NAME: 'holder-re',
      API_PROTOCOL: 'https://',
      API_HOST: 'goalgo-paas-re.holderzone.cn',
      API_FILE_HOST: 'https://paas-office-api-re.holderzone.cn', //附件re-v2
      BOSH_SERVICE: 'http://paasimre.holderzone.cn:63470',
      ROOM_SERVICE: '@muc.paasimre.holderzone.cn',
      IPSUFFIX: '@paasimre.holderzone.cn',
      API_BASE_PATH: '',
      CLOUDDISK_SERVICE: 'cloudisk.goalgo.cn:31010',
      ORG_URL: 'https://goalgo-paas-re-emb.holderzone.cn',
      ODOO_MY_APP: 'http://hes.dev.goalgo.cn/goalgo_sync/auth/login',
      UPGRADE_URL: 'https://getup.holderzone.cn/',
      WEBSOCKET_URL: 'ws://paasimre.holderzone.cn:63470',
      PLAN_WS_URL: 'ws://paas-auth-re.holderzone.cn/collab',
      PLAN_WS_URL_BETA: 'ws://paas-auth-re.holderzone.cn/collab',
      PART_UPDATE_URL: 'https://getup.holderzone.cn/update/',
      CRM_SALES_SERVICE: 'sale-crm-re.holderzone.cn/',
      MANAGE_SERVICE: 'https://goalgo-paas-ver-re.holderzone.cn',
      KEYCLOAK_SERVICE: 'https://paas-auth-re.holderzone.cn/', //keycloak服务器地址
      KEYCLOAK_REALM: 'paas', //keycloak realm配置
      KEYCLOAK_CLIENT: 'holder-pc', //keycloak clientId配置
      OUTSIDE_EMB_SERVICE: 'https://goalgo-paas-re-emb.holderzone.cn/', //查看企管后台链接的域名
      ORG_SELECT_SERVICE: 'https://goalgo-paas-re.holderzone.cn', //查看选人组件链接的域名
      DOC_PLAN_URL: 'https://goalgo-paas-editor-client-re.holderzone.cn', //清单地址
      CRASH_REPORT_SERVICE: 'https://d-crc.holderzone.com/report', // 崩溃上报
    },
  },
}