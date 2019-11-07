// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


// 推送服务器地址： http://10.11.112.14:8080/push-logic
export const environment = {
  apiPath: 'http://192.168.106.128:10002',
  production: false,
  pushServer: 'http://192.168.106.128:21314',
  pushScirpt: 'http://192.168.106.128:21314',
  pushOptionPath: '/socket.io/',
  copyRight: '上海xxx信息技术股份有限公司'
};
