此项目视频教程视频地址：
链接: https://pan.baidu.com/s/1qXB5BkS 密码: 6nru
模块：
    商品列表
        按照价格范围筛选
        安装价格高低筛选
    登陆 ：
        第一个阶段使用cookie
        之后会增加jwt权限验证
    购物车
        购物车列表
        加减数量实时计算价格
    结账
        结账页面
    地址:
        选择地址
    提交订单：   
        生成订单号
        订单信息
    上线：
        使用nginx反向代理
        在一台ubuntu上 搭建node服务器 mongodb数据库服务
        vuejs上线
        pm2启动node
        node 是单线程，一旦发生错误，就会崩溃 挂掉
        pm2可以管理线程，自动重启

        web githook ：
            这个是git 钩子
            当我们把代码提交到github 
            需要去服务器把代码拉取下拉
            web githook 可以自动监听这个push 事件
            自动把代码拉取下来
    
    docker ：
        集装箱容器：
            把你的环境都集成在一块
            每次你同事来了，或新配置一个环境
            几条命令就可以搞定
        上线发现不对，可以立即回滚


已经完毕，增加了pm2上线

location /api/ {
proxy_pass http://127.0.0.1:3000/; # 当访问api的时候默认转发到 3
000端口
}