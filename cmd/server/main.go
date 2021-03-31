package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"server-arche/internal/server"
	"time"
)

func main() {

	r,err := server.CreateMyServer( )
	if err != nil {
		panic(err)
	}
	r.GET("/api/example", func(context *gin.Context) {
		context.String(200,"Now : %s",time.Now())
	})
	err = r.Run(fmt.Sprintf(":%d",8080))

	if err != nil {
		panic(err)
	}
	//static, _ := file.ReadStatic()
	//for _,f:=range static {
	//	fmt.Println(f)
	//}
}


