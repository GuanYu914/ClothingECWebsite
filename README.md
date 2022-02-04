# 電商服飾網站
透過 React.js 以及相關套件完成簡易版電商網站，用戶可以依照網站所提供的購物資訊，收藏產品或添加到購物車，並且網站會自動同步紀錄所有資訊，實作現在所有購物網站應具備的基本功能。現在就試試看吧！[點我傳送](https://emory.work/clothing-ec/demo)

## 基本功能
- 會員註冊 / 登入 / 修改個人檔案  
- 瀏覽商品  
- 用戶收藏清單  
- 加入購物車  
- 自動同步用戶的收藏清單跟購物車  

## 採用架構
專案使用 facebook 提供的 create-react-app 建置 
前端使用 react 框架，並使用相關生態系 libraries  
導入 redux 管理 state，並使用 thunk 完成非同步 actions  
樣式主要為 styled-components 組成，並透過 react-spring 完成動畫  
後端為 lamp server，並使用 php 實作相對應 api  

## 主要涵式庫
- styled-components
- reactjs
- react-redux
- redux-toolkit
- react-router
- react-router-dom
- react-spring
- react-animations
- react-bootstrap
- axios

## 後端相關 APIs
可以參考此 repo，[點我傳送](https://github.com/GuanYu914/clothing-ec-website-backend)

## 功能許願池
- [ ] 用戶留言功能
- [ ] 後台上架商品系統