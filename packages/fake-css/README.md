<div align="center">
  <h2>FAKECSS</h2>
  <p>基于Vue3的运行时css框架</p>
  <p>
    文档撰写中
  </p>
  <p>
    <img src="https://img.shields.io/badge/vue-v3.2.0%2B-%23407fbc" alt="vue">
  </p>
</div>

---

### 介绍
Fake-css是一个基于`Vue3`开发的运行时`css`库,开箱即用,零预先配置。


### 下载

```shell
# 通过npm或yarn安装

# npm
npm i fake-css

# yarn
yarn add fake-css
```


### 特性
1. 提供class和style解析方式
2. 搭配vue3响应式
3. 轻量
4. 模块化定义,变相scoped
5. 高度自定义解析方式
6. 支持Typescript

### 阶段
1. 目前任处于构思阶段,基本情况已经固定。
2. 流程固定化之后,将会重新重构,提供完整的测试用例。



### 示例

1. 更多使用方式可以在项目中playground查看

``` html

<template>
    <!--
       1. 你在在pt_xx 这里输入你任何的数值,都将会动态解析
       2. pt (padding_top), ml (margint_left) 等等。
    -->
    <div :class="[css.pt_30]">

    </div>
</template>

```





