简体中文 | [English](./README.md)

# 配置 node 命令行有道翻译

## Install global

```
$ yarn gloabl add youdaotom

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

本身已经配置了默认key和keyfrom，已经足够用了

```sh
youdaotom set -key 'xxx' -keyfrom 'xxx'
```
