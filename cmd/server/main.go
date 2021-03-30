package main

import (
	"fmt"
	"server-arche/internal/server"
)

func main() {

	r,err := server.CreateMyServer( )
	if err != nil {
		panic(err)
	}

	err = r.Run(fmt.Sprintf(":%d",8080))

	//static, _ := file.ReadStatic()
	//for _,f:=range static {
	//	fmt.Println(f)
	//}
}


