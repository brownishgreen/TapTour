export default class CustomError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode // ✅ 設定 HTTP 狀態碼
  }
}
