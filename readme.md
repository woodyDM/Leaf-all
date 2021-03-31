## introduction 
static : 编译后的前端静态文件   
cmd : golang 主程序  
internal: golang 程序包  
ui:  前端文件
build:  打包后的文件  

## 约定  
1. 后端Restful 接口都已 /api/ 开头；
1. 前端打包好的文件，放在需要放在后端程序相同 目录的static文件夹下；   
1. build.sh 将在根目录建立 build文件夹，包含前端和后端所有内容；
