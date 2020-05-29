# Firefox Send 链接生成器

本项目提供命令行的方式获取 Firefox Send 文件下载链接。 提供文件的下载地址即可生成 Firefox Send 文件下载链接。

## 使用

请求 Node.js 版本 >= 10

使用 npx:

```
$ FSLG_FILE_URI=your_file_original_uri FSLG_DOWNLOAD_PASSWORD=your_download_password npx firefox-send-link-generator
```

`FSLG_FILE_URI` 是原文件下载地址的环境变量
`FSLG_DOWNLOAD_PASSWORD` 是最终使用 Firefox Send 下载地址时需要提供的密码，可不提供。

## 使用 CI

基于 CI, 我们可以把原本在本地电脑无法顺利下载的文件地址通过 CI 的网络环境转成 Firefox Send 下载链接

### Travis CI

1. Fork 这个项目到自己的 Github 账户下, 为新 Fork 的项目启用 [Travis CI](https://travis-ci.org/account/repositories)

2. 在 [Travis 项目设置](https://docs.travis-ci.com/user/environment-variables/#defining-variables-in-repository-settings)中，添加环境变量 `FSLG_FILE_URI` 和 `FSLG_DOWNLOAD_PASSWORD`

3. 触发 CI 任务

4. 在 CI 日志的最后拿到 Firefox Send 链接

### Github Actions

1. Fork 这个项目到自己的 Github 账户下, 为新 Fork 的项目启用 [Github Actions](https://github.community/t/how-to-run-and-enable-github-actions-on-forked-repo-with-github-api/17232)

2. 在 [Github Actions 设置](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets).
中添加环境变量 `FSLG_FILE_URI` and `FSLG_DOWNLOAD_PASSWORD`

3. 触发 CI 任务

4. 在 CI 日志的最后拿到 Firefox Send 链接