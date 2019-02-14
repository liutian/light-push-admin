// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  apiPath: 'http://127.0.0.1:10003',
  production: false,
  pushServer: 'http://127.0.0.1:21315',
  pushScirpt: 'http://127.0.0.1:21315',
  pushOptionPath: '/socket.io/',
  copyRight: '上海xxx信息技术股份有限公司'
};
