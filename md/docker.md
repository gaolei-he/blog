# Docker

一个轻量级的虚拟机

## 为什么要用Docker
Docker提供了更轻量级的虚拟化环境，通过占用更少的资源来实现一个独立的运行环境  
例如你本地有一个web项目，你可以将其打包成一个docker镜像（类似于虚拟机的ISO文件），然后该镜像可以在任何配有docker的环境中直接运行，其效果就和你在本地运行一样

## 如何使用Docker

### 编写Dockerfile
>取决于项目本身

### 创建镜像
>docker build -t your-image-name:latest .

### 标记镜像
>docker tag your-image-name:latest your-dockerhub-username/your-image-name:latest

### 登录到Docker Hub
>docker login --username=your-dockerhub-username --password=your-dockerhub-password

### 推送镜像
>docker push your-dockerhub-username/your-image-name:latest

### 下载镜像
>docker pull your-dockerhub-username/your-image-name:latest

### 运行镜像
>docker run -p 8080:8080 -d your-dockerhub-username/your-image-name:latest