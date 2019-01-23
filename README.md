# twitch clone

## 安裝環境

```
npm install gulp -g
```

## 執行

[demo site](https://hot5656.github.io/twitch_clone/final/index.html)
```
npm install
// develop 
gulp
// rebuild
gulp build
// inject css and js(html at public\final\index.html)
gulp build
gulp inject
// html minify test - just test html minify(can not run well)
gulp minifyhtml
// minify css test
gulp minify-css
// minify js test
gulp minify-js
// release
// gulp --env production
//publish contents to Github pages
gulp ghpage
```



