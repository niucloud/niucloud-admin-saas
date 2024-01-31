# docker-compose 快速运行项目
## 1、安装docker
docker 官网下载
https://www.docker.com/products/docker-desktop

或命令安装 
```
curl -sSL https://get.daocloud.io/docker | sh
```
## 2、安装docker-compose
https://www.runoob.com/docker/docker-compose.html
## 3、下载NIUCLOUD程序
建议去下载最新开源代码 https://gitee.com/niucloud-team/niucloud.git
下载完成后，解压niucloud-master.zip
## 4、启动项目
```
进入docker-compose目录 cd /docker-compose

运行命令：docker-compose up -d
```
进入PHP容器启动队列、定时任务、长连接命令
```
进入容器：docker exec -it niucloud_php /bin/bash
进入到项目目录：cd /var/www
队列命令：php think queue:listen --queue
```
## 5、访问NIUCLOUD 系统
http://ip:8011/
## 6、安装NIUCLOUD
### Mysql数据库信息：
```
Host:192.168.10.11
Post:3306 
user:root 
pwd:123456 

user2:niucloud
pwd:123456
```
### Redis信息：
```
Host:192.168.10.10
Post:6379
db:0
pwd:123456
```
## 7、常见问题
1. 端口被占用进入docker-compose.yml 里面修改端口

2. 如果运行docker-compose up -d 启动失败，请查看docker-compose.yml 修改里面镜像地址或其它配置

3. Error response from daemon: Address already in use 报错
  一般情况下是设置的ip被占用，修改下某个容器下的ipv4_address地址

4. MYSQL容器无法启动，没有任何日志
  注意m1芯片下需要使用mysql镜像daocloud.io/library/mysql:5.7.5-m15；其他任何情况下都
   使用mysql:5.7的镜像

5. 如果启动成功后访问ip:8011报错，请给执行chmod -R 777 runtime

6. 如果连接数据库失败，则将host地址修改成192.168.10.11

7. 如果需要域名访问，请将docker-compose文件夹下的test.niucloud.com.conf文件拷贝到服务器的nginx配置文件夹下，将域名修改成自己的域名，如果需要https访问，请按照文件内容提示配置

8. 如果修改了docker-compose.yml中的内容，请使用docker-compose down进行容器清理，再次执行docker-compose up -d运行

9. 安装时候，填写数据库信息，请填写192.168.10.11（如有修改，请按照修改后的填写，建议勿动！），创建出的两个默认用户信息在第6条mysql数据库信息处

10. 如遇niucloud_mysql容器无法启动，请检查docker-compose/mysql/log文件夹的权限是否为777，如果不是，请使用chmod 777  /docker-compose/mysql/log
