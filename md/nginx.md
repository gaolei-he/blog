# nginx

## 背景介绍

[nginx-wikipedia](https://zh.wikipedia.org/zh-cn/Nginx)
[nginx-website](https://www.nginx.com/)

Nginx是一个网页服务器，简单来说，就是你服务器上写好了网页，但是你想让别人访问你的网页，那么你就需要一个网页服务器，Nginx就是这样一个网页服务器。

## 安装

这里以Ubuntu为例，其他系统请自行搜索。

```bash
sudo apt update
sudo apt install nginx
```

## 基本配置

一般情况下，Nginx的配置文件在`/etc/nginx/nginx.conf`，这里我们仅仅介绍一些基本的配置。

```conf
user www-data; # nginx运行的用户
...
http {
    ...
    access_log /var/log/nginx/access.log; # 访问日志
    error_log /var/log/nginx/error.log; # 错误日志
    ...
}
```

对于网站的基本配置，我们可以在`/etc/nginx/sites-available/default`中进行配置，同样这里我们仅仅介绍一些基本的配置。

```conf
server {
    listen 80 default_server; # 监听80端口
    listen [::]:80 default_server; # 监听ipv6的80端口
    ...
    root /var/www/html; # 网站的根目录，如需修改网站根目录，只需修改后半部分的路径即可
    index index.html index.htm index.nginx-debian.html; # 默认的网页文件
    ...
}
```

配置完成后，使用`sudo nginx -t`检查配置文件是否正确

## 启动

启动Nginx

```bash
sudo service nginx start
```

重启Nginx

```bash
sudo service nginx restart
```

查看Nginx状态

```bash
sudo service nginx status
```

停止Nginx

```bash
sudo service nginx stop
```

## 错误

网站无法访问的情况下，可以查看`/var/log/nginx/error.log`，查看错误日志。
对于部分`Permission denied`的错误，有可能是`nginx`运行的用户`www-data`没有权限访问网站根目录或其中的文件，这里提供两种解决方案。

1. 修改`nginx`运行的用户为`root`，即修改`/etc/nginx/nginx.conf`文件的`user www-data;`为`user root`，这种方法不推荐，因为`root`用户权限太高，不安全。
2. 当网站目录属于某个非`root`用户时，可以将`nginx`运行的用户修改为该用户，即修改`/etc/nginx/nginx.conf`文件的`user www-data;`为`user username`，或者也可以将`www-data`用户加入到该用户组中，即`gpasswd -a www-data username`。
[references](https://stackoverflow.com/questions/25774999/nginx-stat-failed-13-permission-denied)
