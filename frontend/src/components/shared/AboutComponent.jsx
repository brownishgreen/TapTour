import React from "react";

const AboutComponent = () => {
  return (
    <div className="about-page-container">
      <div className="about-page__image">
        <img src="/assets/images/others/about-page.png" alt="About Page" />
      </div>
      <div className="about-page-container-inner-container">
        <h4>關於</h4>

        <p>TapTour 是一個專為旅人打造的探索平台</p>
        <p>透過簡單點擊，發現精彩故事</p>
        <br />

        <p>深度探索｜豐富活動</p>
        <p>商品推薦｜輕鬆購買</p>
        <p>評論分享｜建立足跡</p>
        <br />
        <h4>聯繫我們</h4>
        <p>
          有何建議或合作需求歡迎聯繫我們
        </p>
        <p>
          taptour@example.com
          <span className="about-page__contact-icon">📪</span>
        </p>
      </div>
    </div>
  );
};

export default AboutComponent;
