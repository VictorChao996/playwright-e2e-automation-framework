//以下為專案介紹

# Playwright Test Framework Practice

## Overview
希望能系統化掌握 Playwright，而不只是寫出自動化腳本。
期望能：
- 理解完整 E2E 測試框架
- 能夠規劃測試流程、策略化定位器
- 使用 Mock 與 CI/CD 整合
- 產出可展示能力的專案案例
- 持續建立與維護一個可隨時導入的自動化測試框架
- 練習設計與撰寫一個易於擴充 & 維護的測試框架

## Prerequisites
- Node.js (version 18 or higher)
- Playwright Test Framework
- A web browser (Chromium, Firefox, or WebKit)
- An IDE or text editor (e.g., Visual Studio Code)

## Installation
1. Clone the repository:
2. Navigate to the project directory:
3. Install the dependencies:
4. Install Playwright browsers:
   ```bash
   npx playwright install
   ```
## Running Tests
To execute the tests, use the following command:
```bash
npx playwright test
```

## Test Structure
- `tests/`: Contains all test files organized by feature or module.
- `pages/`: Contains page object models for different pages of the application.
- `utils/`: Contains utility functions and helpers for the tests.
- `docs/`: Documentation related to the test scenarios and strategies.
- `playwright.config.ts`: Configuration file for Playwright settings.


## Milestones
- 當前狀態：
  - Milestone 3 done
  - deciding next steps

### Milestone 0 — 依據待測網站規劃測試項目
- 了解網站頁面架構（ex. 登入 / 商品 / 購物車 / 結帳）
- 梳理使用者操作流程（User Journey）
- 撰寫高階 Scenario（不需到 Test Case level）
- 分類 Priority（P1–P3）
- 決定自動化範圍（Auto Scope）
- 統整上述資料並產出測試說明文件
  - 包含 test scenario
  - 包含 test scope

### Milestone 1 — 基礎 Codegen 流程
- 選定範例網站進行測試（ex. 線上商店 Demo 網站）
- 錄製基本流程：登入 → 加入購物車 → 結帳
- 清理 Codegen 產生的多餘定位器
- 加入基本斷言，例如登入成功、購物車數量

### Milestone 2 — 語義化選擇器重構 & 專案目錄
- 建立測試目錄結構
- 建立 `spec.ts` 測試檔
- 將 Codegen 自動生成的 CSS/XPath 定位器改寫為語義化 selector
- 使用 `getByRole` / `getByText` / `getByLabel` 等可讀性高的定位方法
- 調整等待機制，減少使用 `waitForSelector`
- 加強斷言：商品清單、金額、提示訊息
- 筆記：語義化選擇器比較


### Milestone 3 — Page Object Model（POM）
- 建立 `/pages` 目錄
- 建立各頁面對應的 Page class，例如：
  - `login.page.ts`
  - `inventory.page.ts`
  - `cart.page.ts`
  - `checkout.page.ts`
  - `checkout2.page.ts`
  - `checkoutComplete.page.ts`
- 使用 POM 重寫完整購物流程 E2E
- 減少測試檔邏輯，僅保留流程
- README：POM 架構圖與設計理念

#### POM 架構簡易圖

```text
tests/
  └─ *.spec.ts
        │
        ▼
pages/
  ├─ login.page.ts
  ├─ inventory.page.ts
  ├─ cart.page.ts
  ├─ checkout.page.ts
  ├─ checkout2.page.ts
  └─ checkoutComplete.page.ts
```

**說明：**
- 測試流程（spec 檔）只描述操作步驟與驗證。
- 每個頁面元件封裝於對應的 page class，統一管理定位器與操作方法。

### Milestone 4 — Data Driven Testing
- 建立測試資料檔案，例如 `test-data.json`
- 將登入流程參數化
- 商品流程可選擇性參數化
- 使用 `test.each()` 執行多筆測試資料
- 加入錯誤帳密測試案例
- README：如何擴充測試資料

### Milestone 5 — 複雜元素處理
- 操作 iFrame
- 多分頁切換
- 檔案上傳/下載並驗證
- README：複雜元素常見坑點與解法

### Milestone 6 — API Mocking
- 攔截 API 請求：成功 / 失敗 / 空資料
- 驗證三種 UI 狀態顯示
- README：Mocking 示意圖與解說

### Milestone 7 — CI/CD
- 撰寫 GitHub Actions Workflow
- 安裝 Playwright 與相關依賴
- 執行完整測試流程（支援 matrix 測試）
- 上傳 HTML report artifact
- 設定 Slack / LINE Notify（失敗時觸發）
- README：CI 流程圖示與用法





## References
- [Playwright 官方文件](https://playwright.dev/docs/intro)