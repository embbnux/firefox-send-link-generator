# Firefox Send Link Generator

This project provide a command-line way to get Firefox Send file download link. Support to generate Firefox Send link with web URI.

[中文文档](README.zh.md)

## Usage

Require Node.js >= 10

With NPX:

```
$ FSLG_FILE_URI=your_file_original_uri FSLG_DOWNLOAD_PASSWORD=your_download_password npx firefox-send-link-generator
```

`FSLG_FILE_URI` environmet variable is file original URI that you want to download.
`FSLG_DOWNLOAD_PASSWORD` environmet variable is password for protecting your Firefox Send link, optional

## Work with CI

With CI, we can create Firefox Send link for files that can't be downloaded well in your local network with original URI.

### Travis CI

1. Fork this repo, and enable [Travis CI](https://travis-ci.org/account/repositories) for forked repo.

2. Add environment variables `FSLG_FILE_URI` and `FSLG_DOWNLOAD_PASSWORD` in [travis project settings](https://docs.travis-ci.com/user/environment-variables/#defining-variables-in-repository-settings).

3. Trigger your travis CI job

### Github Actions

1. Fork this repo, and enable [Github Actions](https://github.community/t/how-to-run-and-enable-github-actions-on-forked-repo-with-github-api/17232) for forked repo.

2. Add environment variables `FSLG_FILE_URI` and `FSLG_DOWNLOAD_PASSWORD` in [Github Actions settings](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets).

3. Trigger Github Actions job
