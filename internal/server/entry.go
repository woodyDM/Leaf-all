package server

import (
	"github.com/gin-gonic/gin"
	"log"
	"server-arche/internal/file"
	"strings"
)

/**
返回router给外部使用，router已经处理了static目录下的静态资源，自带/api/health 探活接口
*/
func CreateMyServer() (*gin.Engine, error) {
	// logger and recovery (crash-free) middleware
	router := gin.Default()
	router.NoMethod(redirect)
	router.NoRoute(redirect)

	router.GET("/api/health", health)

	static, err := file.ReadStatic()
	if err != nil {
		return nil, err
	}
	hasIndex := false
	for _, f := range static {
		router.StaticFile(f.Uri, f.FilePath)
		if f.Uri == "/index.html" {
			router.StaticFile("/", f.FilePath)
			hasIndex = true
		}
	}
	totalStaticFiles := len(static)
	if hasIndex {
		log.Printf("Run server with index page,     static file number: %d\n", totalStaticFiles)
	} else {
		log.Printf("Run server with no index page , static file number:%d\n", totalStaticFiles)
	}
	return router, nil
}

func redirect(ctx *gin.Context) {
	path := ctx.Request.RequestURI
	isApi := strings.HasPrefix(path, "/api/")
	if isApi {
		ctx.Status(404)
	} else {
		ctx.Redirect(302, "/index.html")
	}
}

func health(ctx *gin.Context) {
	ctx.String(200, "service on")
}
