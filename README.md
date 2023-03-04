## Rename-tool 命名自動化

主要針對圖檔重新命名自動化，目前支援副檔名型別為： `jpeg`, `jpg`, `png`, `svg`

## 快速開始

```zsh
npm install -g @pakerzhang/rename-tool
# or
yarn global add @pakerzhang/rename-tool
```

透過 terminal 進入想重新命名的素材路徑後 執行 `rename-image` 依照 action flow 執行即可
Ex:

```zsh
cd /usr/desktop/assets/

rename-image
```

![Guide](./guide/rename-tool.gif)

## 安裝

在下載套件前請確保電腦已安裝 `npm` 及 `node`

[Windows](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac#:~:text=How%20to%20Install%20Node.js%20and%20NPM%20on%20Windows%3F) install

[macOS](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac#:~:text=How%20to%20Install%20Node.js%20and%20NPM%20on%20Mac%3F) install

## Todo

- [x] 修正檔案讀取順序
- [x] 新增動態增減改動檔案類型功能
- [ ] Refactor project to tool-collection
- [ ] Add execel parser
