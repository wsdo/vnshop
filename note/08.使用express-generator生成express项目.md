#【express项目脚手架】使用express-generator生成express项目
## 用法

### 安装全局express命令行
```
npm install express-generator -D
```

### 生成项目，并且安装项目依赖的包
```
express server
cd server
npm i
```

### 启动方式

```
node bin/www
```

### 访问 localhost:3000

### 添加git忽略文件 .gitignore
```
.DS_Store
node_modules/
dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
test/unit/coverage
test/e2e/reports
selenium-debug.log

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln

```

## 优化启动方式，让每次修改代码后不需要重启
### 使用nodemon方式：
[nodemon](https://www.npmjs.com/package/nodemon)
#### 安装
```
全局安装：
npm install -g nodemon

or
本地安装：
npm install --save-dev nodemon
```
#### 在package.json里面配置快捷启动方式
> 在package.json 的scripts选项里面添加 

```
    "scripts": {
        "start": "node ./bin/www",
        "dev": "nodemon ./bin/www" 
    },
```

> 此时启动方式是：
```
npm run dev
```

### 使用supervisor方式   

#### 使用方式说明
```
安装
npm install supervisor -g

使用
supervisor bin/www
```
#### 把supervisor bin/www 的启动的方式添加到package.json
> 在package.json 的scripts选项里面添加 

```
    "scripts": {
        "start": "node ./bin/www",
        "sup": "supervisor ./bin/www"  
    },
```

> 此时启动方式是：
```
npm run sup
```

### 使用pm2的方式
>详细使用方式请去官网
[pm2](http://pm2.keymetrics.io/)

#### 全局安装

```
npm install pm2 -g 

启动方式
pm2 start ./bin/www

```

####

> 在package.json 的scripts选项里面添加 

```
    "scripts": {
        "start": "node ./bin/www",
        "pm2": "pm2 start ./bin/www"  
    },
```

> 此时启动方式是：
```
npm run pm2
```
