<!--
 * @Author: zhangmaokai zmkfml@163.com
 * @Date: 2023-08-10 15:48:12
 * @LastEditors: zhangmaokai zmkfml@163.com
 * @LastEditTime: 2023-08-30 23:54:37
 * @FilePath: /vite-boot/README.md
 * @Description: README
-->

# Vue 3 + TypeScript + Vite

说明：这个模板可以帮助你开始在Vite中使用Vue 3和TypeScript进行开发。

1. 使用eslint+prettier作为语法校验和格式化工具

2. 使用husky+commitlint配置了commmit的规则

```bash
# git commit规则，例如（feat: 新增）
'feat', // 新功能 feature
'fix', // 修复 bug
'docs', // 文档注释
'style', // 代码格式(不影响代码运行的变动)
'refactor', // 重构(既不增加新功能，也不是修复bug)
'perf', // 性能优化
'test', // 增加测试
'chore', // 构建过程或辅助工具的变动
'revert', // 回退
'build', // 打包
```

3. 集成了element-plus和sass等常用组件库，配置全局的样式

4. 封装了表单、分页、svg图片组件全局组件，直接使用即可

5. 对axios进行了二次封装，api接口统一管理

6. 使用vue-router 4.x作为路由配置以及pinia作为仓库

下载

```bash
git clone https://github.com/zmk-c/vite-boot
```

安装依赖

```bash
npm install
```

运行

```bash
npm run dev
```
