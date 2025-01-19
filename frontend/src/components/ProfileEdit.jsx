import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'

const ProfileEdit = () => {
  return (
    <div className="profile-edit-form-container">
      <div className="profile-edit-avatar">
        <img
          src="../public/assets/images/others/default-avatar.jpg" // 替換大頭貼路徑
          alt="avatar"
          className="profile-avatar"
        />
        <span
          className="change-picture-btn"
          onClick={() => {
            console.log('更換大頭貼')
          }}
        >
          <FontAwesomeIcon icon={faCameraRetro} className="change-picture" />
        </span>
      </div>
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
            placeholder="會顯示user.name"
            // value={user.name}
            // onChange={handleChange}
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
            disabled
            placeholder="disabled，之後會顯示user.email"
            // value={formData.email}
            // onChange={handleChange}
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
            placeholder="請輸入您要修改的密碼"
            // value={formData.password}
            // onChange={handleChange}
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
            placeholder="請再次輸入您要修改的密碼"
            // value={formData.confirmPassword}
            // onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="form-button">
            確認修改
          </button>
        </div>
      </form>
      {/* 等資料串接好，之後會顯示訊息彈窗 */}
    </div>
  )
}

export default ProfileEdit
