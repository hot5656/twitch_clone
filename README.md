# twitch clone

## 安裝環境

```
npm install gulp -g
```

## 執行

[demo site](https://hot5656.github.io/twitch_clone/)
```
npm install
// develop 
gulp
// rebuild
gulp build
// minify and inject
	// _index.sass need modify
		background-image: url("../img/bg-default.jpg")
		--> 
		background-image: url("img/bg-default.jpg")
	// build and css/js minify
	gulp --env production build
	// css/js inject and html minify
	gulp inline
// release
// gulp --env production
//publish contents to Github pages
gulp ghpage
```



