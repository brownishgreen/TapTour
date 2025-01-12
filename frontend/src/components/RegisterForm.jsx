const RegisterForm = () => {
  return (
    <div className="signup-background">
      <div className="form-container">
        <form>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              名稱
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="請輸入您的名稱"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              信箱
            </label>
            <input
              type="email"
              className="form-input"
              id="email"
              name="email"
              placeholder="請輸入您的信箱"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              密碼
            </label>
            <input
              type="password"
              className="form-input"
              id="password"
              name="password"
              placeholder="請輸入您的密碼"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              確認密碼
            </label>
            <input
              type="password"
              className="form-input"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="請再次輸入您的密碼"
            />
          </div>
          <div>
            <button type="submit" className="form-button">
              註冊
            </button>
          </div>
          <div className="form-actions">
            <p className="login-link">
              已有帳戶？ <a href="/login">由此登入</a>
            </p>
            <div className="divider">
              <span>或</span>
            </div>
            <button className="google-login-button">
              <img
                src="../public/assets/images/icons/google-icon.svg"
                alt="Google Logo"
                className="google-icon"
              />
              使用 Google 帳號登入
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
