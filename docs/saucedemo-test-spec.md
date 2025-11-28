# Saucedemo 測試規格書

## 緣起
[此專案](../README.md#milestone-0--依據待測網站規劃測試項目) 的 milestone 0 練習。

## 紀錄

### Site Map
- Login Page: https://www.saucedemo.com/
- Inventory page: https://www.saucedemo.com/inventory.html
- inventory item page: https://www.saucedemo.com/inventory-item.html?id=4
- Cart Page: https://www.saucedemo.com/cart.html
- Checkout 1 page: https://www.saucedemo.com/checkout-step-one.html
- Checkout 2 page: https://www.saucedemo.com/checkout-step-two.html
- Checkout complete page: https://www.saucedemo.com/checkout-complete.html

### User Journey
- Purchase flow: Login -> Inventory -> Cart -> check 1 -> check 2 -> check complete -> inventory
### Test Scenario (High Level)
#### Login Page
- User Login with correct account & password
- User Login with error account & password
- User Login with empty account or password
- User Login with locked out user account
#### Inventory Page
- Add Item to cart (btn)
- Remove item from cart (remove btn)
- sorting selection
	- with name a-z
	- with name z-a
	- with price high to low
	- with price low to high
- view item detail
- go to cart
#### Cart Page
- Show the item with added to cart correctly
- back to shopping
- view item detail
- remove item from cart
- checkout
#### Check 1
- cancel
- enter info and continue

#### Check 2
- cancel
- check item with added to cart correctly
- check price total correctly
- Finish
#### Check complete
- Back to home

### Scenario Priority & Automation
- Priority 參考定義 
	- p1: 主流程 (壞掉會阻斷大量 User, Critical Path)
	- p2: 主流程的錯誤/分支 或 非主流程的項目 (會影響 User 體驗, 資料準確性的)
	- p3: 非必要流程 (壞掉對商務完全不影響或影響極小的項目)
- Auto 規則：
	- p1: Yes
	- p2: Optional
	- p3: no

#### Scenario Table

| **Scenario No** | **Scenario Context**                                           | **Priority** | **Auto ?** | **Auto Done** | **Reason**         |
| --------------- | -------------------------------------------------------------- | ------------ | ---------- | ------------- | ------------------ |
| 1               | **Login Page:** User Login with correct account & password     | p1           | Y          | V             | 主流程                |
| 2               | **Login Page:** User Login with error account & password       | p2           | O          | V             | 非主流程               |
| 3               | **Login Page:** User Login with empty account or password      | p3           | N          | X             | 低頻率情境, 不需大量驗證      |
| 4               | **Login Page:** User Login with locked out user account        | p3           | N          | X             | 低頻率情境, 不需大量驗證      |
| 5               | **Inventory Page:** Add Item to cart (btn)                     | p1           | Y          | V             | 主流程                |
| 6               | **Inventory Page:** Remove item from cart (remove btn)         | p1           | Y          | V             | 主流程                |
| 7               | **Inventory Page:** sorting selection - with name a-z          | p3           | N          | X             | 對主流程影響小            |
| 8               | **Inventory Page:** sorting selection - with name z-a          | p3           | N          | X             | 對主流程影響小            |
| 9               | **Inventory Page:** sorting selection - with price high to low | p3           | N          | X             | 對主流程影響小            |
| 10              | **Inventory Page:** sorting selection - with price low to high | p3           | N          | X             | 對主流程影響小            |
| 11              | **Inventory Page:** view item detail                           | p3           | N          | X             | 對主流程影響小            |
| 12              | **Inventory Page:** go to cart                                 | p1           | Y          | V             | 主流程                |
| 13              | **Cart Page:** Show the item with added to cart correctly      | p1           | Y          | V             | 主流程                |
| 14              | **Cart Page:** back to shopping                                | p2           | O          | V             | 主流程                |
| 15              | **Cart Page:** view item detail                                | p3           | N          | X             | 對主流程影響小            |
| 16              | **Cart Page:** remove item from cart                           | p1           | Y          | V             | 主流程                |
| 17              | **Cart Page:** checkout                                        | p1           | Y          | V             | 主流程                |
| 18              | **Check 1:** cancel (from checkout step 1)                     | p2           | O          | V             | 主流程分支結果            |
| 19              | **Check 1:** enter info and continue (to checkout step 2)      | p1           | Y          | V             | 主流程                |
| 20              | **Check 2:** cancel (from checkout step 2)                     | p2           | O          | X             | 主流程分支結果            |
| 21              | **Check 2:** check item with added to cart correctly           | p2           | O          | V             | 後端資料, 應與 Cart 結果同步 |
| 22              | **Check 2:** check price total correctly                       | p2           | O          | V             | 可藉由後端 double check |
| 23              | **Check 2:** Finish (complete order)                           | p1           | Y          | V             | 主流程                |
| 24              | **Check complete:** Back to home                               | p1           | Y          | V             | 主流程                |
|                 |                                                                |              |            |               |                    |

### Test scope
#### In scope
- p1 scenario 全部自動化
- Login / Inventory / Cart / Checkout 主流程 cover
- 基本 UI 驗證 (按鈕, 錯誤訊息)
- Cart 資訊 (商品資料, total 金額等)

#### Out of scope
- 性能測試
- 安全性測試
- API 測試 
- 多瀏覽器驗證
- 實際付款
- DB 驗證

#### Automation Strategy
- 使用 playwright + TypeScript
- 使用 codegen 快速獲取元素定位  & 跳轉流程
- 等流程完備後在優化成 Page Object Model (POM)




## Reference
- https://www.saucedemo.com/