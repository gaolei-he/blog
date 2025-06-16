# 在服务器上使用clash代理

一种方案：

1. 下载linux版本clash [cfw](../data/cfw)
    - 下载后为`cfw`添加可执行权限：`chmod u+x cfw`

2. 配置启动脚本[start_clash.sh](../data/start_clash.sh)
    - 脚本中的`13986`是端口号，默认无需修改；如需修改，请修改所有`13986`为新的端口号，并确保端口号未被占用。
    - 脚本第七行`~/software/clash/cfw`是clash的路径，请修改为`1`中下载的clash路径。
    - 为`start_clash.sh`添加可执行权限：`chmod u+x start_clash.sh`
3. 添加机场配置文件
    - 将配置文件[Country.mmdb](../data/Country.mmdb), [cache.db](../data/cache.db)上传至服务器的`~/.config/clash/`目录下。
    - 将本机clash的订阅链接文件上传至服务器的`~/.config/clash/`目录下，并重命名为`config.yaml`。
    - 修改`config.yaml`中的端口号为`13986`，如果修改了脚本中的端口号，也需要在这里修改。
4. 启动clash
    - 建议开一个`screen`或`tmux`会话
    - 执行`source start_clash.sh`启动clash
    - 如需退出clash，按`Ctrl+D`，退出当前`screen`或`tmux`会话，启动脚本会自动终结clash进程。