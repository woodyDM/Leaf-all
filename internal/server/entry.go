package server

import (
	"github.com/gin-gonic/gin"
	"log"
	"server-arche/internal/file"
	"strings"
)

const index = "index.html"
const indexPath = "/index.html"

/**
返回router给外部使用，router已经处理了static目录下的静态资源，自带/api/health 探活接口
*/
func CreateMyServer() (*gin.Engine, error) {
	// logger and recovery (crash-free) middleware
	router := gin.Default()
	router.GET("/api/health", health)

	static, err := file.ReadStatic()
	if err != nil {
		return nil, err
	}
	hasIndex := false
	for _, f := range static {
		router.StaticFile(f.Uri, f.FilePath)
		if f.Uri == indexPath {
			router.StaticFile("/", f.FilePath)
			router.LoadHTMLFiles(f.FilePath)
			hasIndex = true
		}
	}
	redirectIndex := func(context *gin.Context) {
		redirect(context, hasIndex)
	}
	router.NoMethod(redirectIndex)
	router.NoRoute(redirectIndex)

	totalStaticFiles := len(static)
	if hasIndex {
		log.Printf("Run server with index page, static file number: %d\n", totalStaticFiles)
	} else {
		log.Printf("Run server with no index page, static file number:%d\n", totalStaticFiles)
	}
	return router, nil
}

func redirect(ctx *gin.Context, hasIndex bool) {
	path := ctx.Request.RequestURI
	isApi := strings.HasPrefix(path, "/api/")
	if !isApi && hasIndex {
		ctx.HTML(200, index, "dummy")
	} else {
		ctx.Status(404)
	}
}

func health(ctx *gin.Context) {
	ctx.String(200, "service on")
}
