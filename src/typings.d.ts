/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface Window {
  LazyLoad: any;
  echarts: any;
}

interface String {
  padStart: any;
}
