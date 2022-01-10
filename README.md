# 電商服飾網站
透過 React.js 以及相關套件完成簡易版電商網站，用戶可以依照網站所提供的購物資訊，收藏產品或添加到購物車，並且網站會自動同步紀錄所有資訊，實作現在所有購物網站應具備的基本功能。現在就試試看吧！[點我傳送](https://emory.work/clothing-ec/demo)

## 基本功能
- 會員註冊 / 登入 / 修改個人檔案  
- 瀏覽商品  
- 用戶收藏清單  
- 加入購物車  
- 自動同步用戶的收藏清單跟購物車  

## 採用架構
專案使用 Facebook 提供的 Create-React-App 建置，加速開發效率  
前端部分透過 React.js 搭配 React Router 渲染，並串接後端提供的 APIs，跟 server 要求網站的資源或同步後端資料庫資料  
頁面主要為 styled-component 組成，並透過一些第三方 libs，實作對應的動畫跟組件  
後端透過自身架設的 LAMP server，並透過 php 實作相對應 APIs  

## 主要涵式庫
- styled-components
- react-router
- react-router-dom
- react-spring
- react-animations
- react-bootstrap
- axios

## 後端相關 APIs
可以參考此 repo，[點我傳送](https://github.com/GuanYu914/clothing-ec-website-backend)
