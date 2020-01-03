# LightPushAdmin

基于Angular8和material8推送服务控制台界面

<img src="https://raw.githubusercontent.com/liutian/light-push-admin/master/doc/manual-1.gif" />

### 快速体验
- `sudo docker run -id -p 443:443 -p 80:80 --name light-push-demo liuss/light-push:1.2.0 /mnt/data/start.sh` 
- 访问管理页面: `https://127.0.0.1/push-admin` 登录名 admin 密码 123456 

### 调用方式
```
// demo: 命名空间；uuid: 客户端唯一标示；userid: 客户端所属的用户ID
let socket = io.connect('https://127.0.0.1:55555/demo?uuid=' + uuid + '&userid=' + userid, {
  path: '/push/socket.io/'
});

socket.on('connect', function () {
  // 客户端主动加入房间
  socket.emit('joinRoom', ['room1'], function (result) {
    console.log('joinRoom:' + JSON.stringify(result));
  });
  
  // 接收服务器端的推送消息
  socket.on('push', function (data) {
    console.log('push:' + JSON.stringify(data));
    // 消息确认回执
    socket.emit('ackPush', { id: data.id });
  });
  
  // 客户端主动离开房间
  socket.emit('leaveRoom', ['room2'], function (result) {
    console.log('leaveRoom:' + JSON.stringify(result));
  });
});
```

### 注意事项
独立部署时，需要将packae.json中第9行的域名，替换为你自己的域名，并注意是否有https，否则在build生成的js和css文件还是指向原有的域名，导致启动失败
```
 "build": "ng build -prod --vendor-chunk --sourcemaps --base-href /push-admin/ --deploy-url https://ipush.onesykes.com/push-admin",
```
