/face_demo -> 人脸搜索(root)
/ocr_demo  -> 手写识别(root)

给每个demo各开一个bash terminal，cd到各demo的root，然后：
1. 首次运行先构建镜像 ./docker_build.sh
2. 运行镜像          ./docker_run.sh

看到Compiled信息(忽略warning)代表网页开启完成
此时人脸搜索demo运行在localhost:3001，手写识别demo运行在localhost:3002

强制结束掉运行中的脚本(Ctrl+C)会把容器一起关掉，可以用`docker ps`确认正在运行的容器
如果镜像还在运行，复制正在运行的容器的id，然后`docker stop <container-id>`即可
