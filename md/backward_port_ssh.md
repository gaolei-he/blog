# SSH反向代理

需求场景：

有一台内网服务器A，一台公网服务器B
现在需要从公网访问内网服务器A

方案：
通过ssh反向代理实现

在内网服务器A上执行以下命令：

```bash
ssh -fCNR 0.0.0.0:3000:localhost:22 root@公网服务器B的IP地址
```

备注：针对公网服务器B的sshd配置文件（通常位于`/etc/ssh/sshd_config`），需要确保以下配置项被设置，必要时可重启sshd

```plaintext
GatewayPorts yes
AllowTcpForwarding yes
```

解释：允许远程服务器的3000端口请求转发到内网服务器A的22端口（SSH端口），0.0.0.0前缀表示允许所有IP发起的连接。

建立连接成功后，在其它任意机器，使用以下命令访问内网服务器A：

```bash
ssh -p 3000 user@公网服务器B的IP地址
```

