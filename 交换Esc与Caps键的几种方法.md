# 交换Esc与Caps键的几种方法

## Windows

### PowerToys

在Microsoft Store 中下载PowerToys，其中有一个`Keyboard Manager`的工具，可以用来交换键位

## Linux(Ubuntu)

### GUI

无论是`Xorg`还是`Wayland`，该方法都适用
修改以下文件
> /usr/share/X11/xkb/symbols/pc

格式类似如下风格

```txt
key  <ESC> {    [ Escape        ]   };
key <CAPS> {    [ Caps_Lock     ]   };
```

若要交换`Caps_Lock`和`Esc`，则修改为

```txt
key  <ESC> {    [ Caps_Lock     ]   };
key <CAPS> {    [ Escape        ]   };
```

### CLI

1. 运行以下命令，备份当前键盘映射

    ```bash
    dumpkeys > back.kmap
    cp back.kmap new.kmap
    ```

2. 修改`new.kmap`文件，将`Caps_Lock`和`Esc`的映射交换

    ```txt
    keycode 1 = Escape
        ...
    keycode 58 = CtrlL_Lock
        ...
    ```

    ```txt
    keycode 1 = CtrlL_Lock
        ...
    keycode 58 = Escape
        ...
    ```

3. 运行以下命令，使新的键盘映射生效

    ```bash
    loadkeys new.kmap
    ```

#### 备注

1. 若要恢复默认键盘映射，运行以下命令

    ```bash
    loadkeys back.kmap
    ```

2. 若要每次开机自动生效，将以下命令添加到`/etc/rc.local`中即可，注意`/etc/rc.local`文件需要有可执行权限，可运行`sudo chmod u+x /etc/rc.local`赋予其可执行权限

    ```bash
    #!/bin/bash
    /usr/bin/loadkeys /path/to/new.kmap
    ```
