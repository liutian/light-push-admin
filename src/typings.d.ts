//用于热加载模块用到的module
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface Window {
  LazyLoad: any;
  echarts: any;
  io: any;
  ClipboardL: any;
  particlesJS: any;
}
