简体中文 | [English](./README.md)

# 配置 node 命令行有道翻译

![](https://github.com/tomatobybike/Tomato-Drawing/blob/main/youdaotom.jpg?raw=true)

## Install global

```
$ yarn global add youdaotom

```

## 使用

```sh
youdaotom query hello
```

## 简写

```sh
youdaotom  hello
```

## 命令行配置 youdao api key 和 keyfrom

具体的 api key 和 keyfrom 申请 参考

http://fanyi.youdao.com/openapi?path=data-mode

本身已经配置了默认 key 和 keyfrom，已经足够用了

**<font color="#FF0000">注意，如果网易有道翻译的 api 接口调用过于频繁，会被网易禁用。可以使用如下命令，更改为你自己的 key 和 keyfrom</font>**

```sh
youdaotom set -key 'xxx' -keyfrom 'xxx'
```
