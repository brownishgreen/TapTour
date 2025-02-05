'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        id: 1,
        name: "日本環球影城門票 Universal Studios Japan｜日本大阪 （官方授權）",
        price: 1795,
        description: "日本環球影城官方授權門票，中文介面讓您輕鬆訂購\n在TapTour訂購日本環球影城門票後可立即拿到電子門票，現場掃 QR code 即可入園遊玩\n有效期限內，可依照日本環球影城月曆中相同票種之日期入園，保有行程絕佳彈性\n日本環球影城門票＋超級任天堂世界™ 園區保證入場套票，輕鬆玩轉瑪利歐世界",
        location_id: null,
        category_id: 1,
        created_at: new Date("2025-02-05 12:36:51"),
        updated_at: new Date("2025-02-05 12:36:51")
      },
      {
        id: 2,
        name: "日本大阪｜大阪樂高樂園門票 LEGOLAND® Discovery Center Osaka",
        price: 469,
        description: "此門票無進場時間限制，當日營業時間皆可入場\n小巧精緻的室內樂高樂園，適合大人小孩一起同樂\n遊樂設施種類多，樂高積木製造工廠、4D 劇場等歡迎來到樂高世界",
        location_id: null,
        category_id: 3,
        created_at: new Date("2025-02-05 12:39:05"),
        updated_at: new Date("2025-02-05 12:39:05")
      },
      {
        id: 3,
        name: "日本eSIM卡｜每日高速、總量、無限流量吃到飽方案｜優惠65折",
        price: 500,
        description: "本eSIM之日本Docomo/ kddi(au)/ Softbank 電信數據漫遊服務由China Mobile international Limited(中國移動國際有限公司)提供\nKKday日本eSIM提供4G服務並可使用熱點分享\n快速俐落享受 4G 上網，無需手忙腳亂\n收到憑證即可掃描後安裝使用，環保無耗材、免運費、零遺失風險",
        location_id: null,
        category_id: 3,
        created_at: new Date("2025-02-05 12:43:04"),
        updated_at: new Date("2025-02-05 12:43:04")
      },
      {
        id: 4,
        name: "【優惠54折】韓國網卡｜韓國高速每日流量/總量型 eSIM",
        price: 400,
        description: "本eSIM之韓國SKT電信數據漫遊服務由China Mobile international Limited(中國移動國際有限公司)提供\n韓國自由行推薦使用NAVER等Google以外地圖以獲得更好體驗\n上網新選擇，免換卡，快速俐落享受 4G 上網，無需手忙腳亂\n收到憑證即可掃描後安裝使用，不用往返奔波領取實體卡或等實體寄送\n環保無耗材、免運費、零遺失風險",
        location_id: null,
        category_id: 4,
        created_at: new Date("2025-02-05 12:44:48"),
        updated_at: new Date("2025-02-05 12:44:48")
      },
      {
        id: 5,
        name: "台灣桃園機場接送｜桃園國際機場 (TPE)往返台北\\新北市區｜包車接機含舉牌服務",
        price: 790,
        description: "TapTour機場接駁、機場接送，預約價格透明，雙北送機最低780、24hr安心客服，48小時前可免費取消，機場快線直達車\n嚴選機場接駁，最快可訂購當日 6 小時後搭車，價錢還比搭計程車便宜，不需排隊等計程車，品質保證\n接機服務依航班實際抵達時間免費等候  90分鐘並含舉牌服務，送機接送服務免費等候 30 分鐘",
        location_id: null,
        category_id: 1,
        created_at: new Date("2025-02-05 12:47:42"),
        updated_at: new Date("2025-02-05 12:47:42")
      },
      {
        id: 6,
        name: "日本成田機場專車接送 ｜機場 ⮂東京23區內及各大景點",
        price: 500,
        description: "成田機場、羽田機場接送，可指定送至東京市區飯店或是車站\n提供東京市區至迪士尼的單程接送服務，讓人輕鬆前往幻想國度！\n提供機場和東京市區至各大景點和近郊地區的單程接送服務，免卻乘搭公共交通工具的煩惱\n日本合法綠牌車專車接送，無須與他人共乘，安心抵達目的地\n司機提供日語與或中文對應，無需擔心溝通問題\n24 小時隨時待命！就算是深夜或凌晨的班機也可以放心使用\n可以接受緊急訂單，當天回復，並在短時間內派車",
        location_id: null,
        category_id: 1,
        created_at: new Date("2025-02-05 12:50:01"),
        updated_at: new Date("2025-02-05 12:50:01")
      },
      {
        id: 7,
        name: "【泰國】機場包車接送 | 廊曼/素萬那普機場 ↔ 曼谷市區",
        price: 500,
        description: "體驗從素萬那普/廊曼國際機場到曼谷酒店區住宿的便捷往返私人接送服務。選擇這些超級節省方案和車輛，完美配合您的旅行團，讓您友善專業的司機以最快的路線帶領您到達目的地。\n\n享受便利的專車機場接送服務，順利無憂地開始您的假期或商務旅行\n避免面對陌生公共交通的麻煩和壓力\n在消毒的車輛中舒適地放鬆身心，讓經驗豐富、友善的司機駕駛",
        location_id: null,
        category_id: 1,
        created_at: new Date("2025-02-05 12:51:44"),
        updated_at: new Date("2025-02-05 12:51:44")
      },
      {
        id: 8,
        name: "台北展覽｜草間彌生的「軌跡」與「奇跡」——W Collection & More 1951-2005",
        price: 190,
        description: "重現 1998 台北雙年展經典作品《圓點的強迫妄想》\n聚焦 1951-2005 草間彌生最具開創性時期\n匯集繪畫、版畫、拼貼、軟雕塑、大型裝置、行為展演錄像、服裝等近 70 組／件作品，台灣首度登場",
        location_id: null,
        category_id: 3,
        created_at: new Date("2025-02-05 12:55:03"),
        updated_at: new Date("2025-02-05 12:55:03")
      },
      {
        id: 9,
        name: "台北展覽 | Animage雜誌和吉卜力展",
        price: 490,
        description: "豐富的展覽內容和創作手稿，見證日本動畫的發展故事！ \n經典吉卜力動畫的雜誌封面完全再現！粉絲們還能親自成為封面主角！ \n精美的特展限定商品，千萬不容錯過！",
        location_id: null,
        category_id: 1,
        created_at: new Date("2025-02-05 12:57:36"),
        updated_at: new Date("2025-02-05 12:57:36")
      },
      {
        id: 10,
        name: "台中｜科博館｜國立自然科學博物館門票科博館",
        price: 100,
        description: "全台第一座科學博物館，本館以科技整合、生活化、藝術化及以人為中心之主題展示\n擁有台灣第一座完全沉浸包覆的 IMAX 大型圓頂劇場，以及 GOTO 公司的光學星象儀投射的近乎真實星空，帶給台灣民眾迥異於以往的全新科學學習體驗。",
        location_id: null,
        category_id: 1,
        created_at: new Date("2025-02-05 13:00:12"),
        updated_at: new Date("2025-02-05 13:00:12")
      },
      {
        id: 11,
        name: "法國 | 巴黎迪士尼非指定日期樂園門票",
        price: 3039,
        description: "趁著各種套餐選項的便利，遊覽巴黎迪士尼樂園的一個或兩個主題樂園\n欣賞必看的 D-Light，在巴黎迪士尼樂園度過並享受美好的夜晚\n和經典迪士尼角色一同慶祝聖誕節和新年！",
        location_id: null,
        category_id: 1,
        created_at: new Date("2025-02-05 13:02:22"),
        updated_at: new Date("2025-02-05 13:02:22")
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
