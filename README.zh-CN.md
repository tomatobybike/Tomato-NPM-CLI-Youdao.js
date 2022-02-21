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

**<font color="#FF824A">注意，如果网易有道翻译的 api 接口调用过于频繁，会被网易暂时禁用。可以使用如下命令，更改为你自己的 key 和 keyfrom 或者 几小时后再尝试</font>**

```sh
youdaotom set -key 'xxx' -keyfrom 'xxx'
```

## 有道翻译 API 平台已经全面升级，当前平台的key申请已经停止，请前往新平台有道智云申请及后续使用。

> 后续预计开发 2.0版本，使用有道志云api，敬请期待，（可以自行申请key，1.0版本和2.0版本通过命令参数区分，2.0就不能使用公共的key了，需要使用自己申请的）