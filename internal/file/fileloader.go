package file

import (
	"fmt"
	"io/ioutil"
	"os"
	"path"
)

type PathFile struct {
	FilePath string
	Uri      string
}

func createFolder(path string) error {
	exists, err := PathExists(path)
	if err != nil {
		return err
	}
	if exists {
		return nil
	}
	return os.MkdirAll(path, 0660)
}

func PathExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}

func ReadStatic() ([]*PathFile, error) {
	root, err := os.Getwd()
	if err != nil {
		return nil, err
	}
	staticFileRoot := path.Join(root, "static")
	exist, err := PathExists(staticFileRoot)
	if err != nil {
		return nil, err
	}
	if exist {
		return ReadDir("", staticFileRoot)
	} else {
		return nil, nil
	}

}

func ReadDir(uri string, folder string) ([]*PathFile, error) {
	dir, err := ioutil.ReadDir(folder)
	if err != nil {
		return nil, err
	}
	result := make([]*PathFile, 0)

	for _, file := range dir {
		newUri := fmt.Sprintf("%s/%s", uri, file.Name())
		newFolder := path.Join(folder, file.Name())

		if file.IsDir() {

			inner, err := ReadDir(newUri, newFolder)
			if err == nil {
				result = append(result, inner...)
			}
		} else {
			result = append(result, &PathFile{
				FilePath: newFolder,
				Uri:      newUri,
			})
		}
	}
	return result, nil
}
