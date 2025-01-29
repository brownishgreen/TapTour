'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      { id: 1, image_url: "/uploads/activities/xiong-ya-li-bu-da-pei-si-1/1-001.png", activity_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 2, image_url: "/uploads/activities/xiong-ya-li-bu-da-pei-si-1/1-002.png", activity_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 3, image_url: "/uploads/activities/xiong-ya-li-bu-da-pei-si-1/1-003.png", activity_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 4, image_url: "/uploads/activities/xiong-ya-li-bu-da-pei-si-1/1-004.png", activity_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 5, image_url: "/uploads/activities/xiong-ya-li-bu-da-pei-si-1/1-005.png", activity_id: 1, created_at: new Date(), updated_at: new Date() },

      { id: 6, image_url: "/uploads/activities/tai-guo-man-gu-2/2-001.png", activity_id: 2, created_at: new Date(), updated_at: new Date() },
      { id: 7, image_url: "/uploads/activities/tai-guo-man-gu-2/2-002.png", activity_id: 2, created_at: new Date(), updated_at: new Date() },
      { id: 8, image_url: "/uploads/activities/tai-guo-man-gu-2/2-003.png", activity_id: 2, created_at: new Date(), updated_at: new Date() },
      { id: 9, image_url: "/uploads/activities/tai-guo-man-gu-2/2-004.png", activity_id: 2, created_at: new Date(), updated_at: new Date() },
      { id: 10, image_url: "/uploads/activities/tai-guo-man-gu-2/2-005.png", activity_id: 2, created_at: new Date(), updated_at: new Date() },

      { id: 11, image_url: "/uploads/activities/tai-guo-jim-thompson-3/3-001.jpg", activity_id: 3, created_at: new Date(), updated_at: new Date() },
      { id: 12, image_url: "/uploads/activities/tai-guo-jim-thompson-3/3-002.png", activity_id: 3, created_at: new Date(), updated_at: new Date() },
      { id: 13, image_url: "/uploads/activities/tai-guo-jim-thompson-3/3-003.png", activity_id: 3, created_at: new Date(), updated_at: new Date() },
      { id: 14, image_url: "/uploads/activities/tai-guo-jim-thompson-3/3-004.png", activity_id: 3, created_at: new Date(), updated_at: new Date() },
      { id: 15, image_url: "/uploads/activities/tai-guo-jim-thompson-3/3-005.png", activity_id: 3, created_at: new Date(), updated_at: new Date() },

      { id: 16, image_url: "/uploads/activities/tai-guo-man-gu-4/4-001.png", activity_id: 4, created_at: new Date(), updated_at: new Date() },
      { id: 17, image_url: "/uploads/activities/tai-guo-man-gu-4/4-002.png", activity_id: 4, created_at: new Date(), updated_at: new Date() },
      { id: 18, image_url: "/uploads/activities/tai-guo-man-gu-4/4-003.png", activity_id: 4, created_at: new Date(), updated_at: new Date() },
      { id: 19, image_url: "/uploads/activities/tai-guo-man-gu-4/4-004.png", activity_id: 4, created_at: new Date(), updated_at: new Date() },
      { id: 20, image_url: "/uploads/activities/tai-guo-man-gu-4/4-005.png", activity_id: 4, created_at: new Date(), updated_at: new Date() },

      { id: 21, image_url: "/uploads/activities/tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-5/5-tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-001.png", activity_id: 5, created_at: new Date(), updated_at: new Date() },
      { id: 22, image_url: "/uploads/activities/tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-5/5-tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-004.png", activity_id: 5, created_at: new Date(), updated_at: new Date() },
      { id: 23, image_url: "/uploads/activities/tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-5/5-tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-003.png", activity_id: 5, created_at: new Date(), updated_at: new Date() },
      { id: 24, image_url: "/uploads/activities/tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-5/5-tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-002.png", activity_id: 5, created_at: new Date(), updated_at: new Date() },
      { id: 25, image_url: "/uploads/activities/tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-5/5-tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-005.png", activity_id: 5, created_at: new Date(), updated_at: new Date() },

      { id: 26, image_url: "/uploads/activities/chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-6/6-chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-001.png", activity_id: 6, created_at: new Date(), updated_at: new Date() },
      { id: 27, image_url: "/uploads/activities/chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-6/6-chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-005.png", activity_id: 6, created_at: new Date(), updated_at: new Date() },
      { id: 28, image_url: "/uploads/activities/chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-6/6-chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-003.png", activity_id: 6, created_at: new Date(), updated_at: new Date() },
      { id: 29, image_url: "/uploads/activities/chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-6/6-chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-004.png", activity_id: 6, created_at: new Date(), updated_at: new Date() },
      { id: 30, image_url: "/uploads/activities/chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-6/6-chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-002.png", activity_id: 6, created_at: new Date(), updated_at: new Date() },

      { id: 31, image_url: "/uploads/activities/wei-ye-na--qian-qian-gong-zhu-bo-wu-guan-sisimuseum-7/7-002.png", activity_id: 7, created_at: new Date(), updated_at: new Date() },
      { id: 32, image_url: "/uploads/activities/wei-ye-na--qian-qian-gong-zhu-bo-wu-guan-sisimuseum-7/7-005.png", activity_id: 7, created_at: new Date(), updated_at: new Date() },
      { id: 33, image_url: "/uploads/activities/wei-ye-na--qian-qian-gong-zhu-bo-wu-guan-sisimuseum-7/7-001.png", activity_id: 7, created_at: new Date(), updated_at: new Date() },
      { id: 34, image_url: "/uploads/activities/wei-ye-na--qian-qian-gong-zhu-bo-wu-guan-sisimuseum-7/7-004.png", activity_id: 7, created_at: new Date(), updated_at: new Date() },
      { id: 35, image_url: "/uploads/activities/wei-ye-na--qian-qian-gong-zhu-bo-wu-guan-sisimuseum-7/7-003.png", activity_id: 7, created_at: new Date(), updated_at: new Date() },

      { id: 36, image_url: "/uploads/activities/ao-di-li--ha-xiu-ta-te-hallstatt-8/8-001.png", activity_id: 8, created_at: new Date(), updated_at: new Date() },
      { id: 37, image_url: "/uploads/activities/ao-di-li--ha-xiu-ta-te-hallstatt-8/8-002.png", activity_id: 8, created_at: new Date(), updated_at: new Date() },
      { id: 38, image_url: "/uploads/activities/ao-di-li--ha-xiu-ta-te-hallstatt-8/8-003.png", activity_id: 8, created_at: new Date(), updated_at: new Date() },
      { id: 39, image_url: "/uploads/activities/ao-di-li--ha-xiu-ta-te-hallstatt-8/8-004.png", activity_id: 8, created_at: new Date(), updated_at: new Date() },
      { id: 40, image_url: "/uploads/activities/ao-di-li--ha-xiu-ta-te-hallstatt-8/8-005.png", activity_id: 8, created_at: new Date(), updated_at: new Date() },

      { id: 41, image_url: "/uploads/activities/jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-10/10-jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-001.png", activity_id: 10, created_at: new Date(), updated_at: new Date() },
      { id: 42, image_url: "/uploads/activities/jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-10/10-jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-003.png", activity_id: 10, created_at: new Date(), updated_at: new Date() },
      { id: 43, image_url: "/uploads/activities/jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-10/10-jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-002.png", activity_id: 10, created_at: new Date(), updated_at: new Date() },
      { id: 44, image_url: "/uploads/activities/jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-10/10-jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-004.png", activity_id: 10, created_at: new Date(), updated_at: new Date() },
      { id: 45, image_url: "/uploads/activities/jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-10/10-jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-005.png", activity_id: 10, created_at: new Date(), updated_at: new Date() },

      { id: 46, image_url: "/uploads/activities/ma-lai-xi-ya-sha-ba-11/11-001.png", activity_id: 11, created_at: new Date(), updated_at: new Date() },
      { id: 47, image_url: "/uploads/activities/ma-lai-xi-ya-sha-ba-11/11-002.png", activity_id: 11, created_at: new Date(), updated_at: new Date() },
      { id: 48, image_url: "/uploads/activities/ma-lai-xi-ya-sha-ba-11/11-003.png", activity_id: 11, created_at: new Date(), updated_at: new Date() },
      { id: 49, image_url: "/uploads/activities/ma-lai-xi-ya-sha-ba-11/11-005.png", activity_id: 11, created_at: new Date(), updated_at: new Date() },
      { id: 50, image_url: "/uploads/activities/ma-lai-xi-ya-sha-ba-11/11-004.png", activity_id: 11, created_at: new Date(), updated_at: new Date() },

      { id: 51, image_url: "/uploads/activities/ming-gu-wu-shi-jie-yi-chan-12/12-001.png", activity_id: 12, created_at: new Date(), updated_at: new Date() },
      { id: 52, image_url: "/uploads/activities/ming-gu-wu-shi-jie-yi-chan-12/12-004.png", activity_id: 12, created_at: new Date(), updated_at: new Date() },
      { id: 53, image_url: "/uploads/activities/ming-gu-wu-shi-jie-yi-chan-12/12-005.png", activity_id: 12, created_at: new Date(), updated_at: new Date() },
      { id: 54, image_url: "/uploads/activities/ming-gu-wu-shi-jie-yi-chan-12/12-003.png", activity_id: 12, created_at: new Date(), updated_at: new Date() },
      { id: 55, image_url: "/uploads/activities/ming-gu-wu-shi-jie-yi-chan-12/12-002.png", activity_id: 12, created_at: new Date(), updated_at: new Date() },

      { id: 56, image_url: "/uploads/activities/jie-ke-ku-lun-luo-fu-9/9-001.png", activity_id: 9, created_at: new Date(), updated_at: new Date() },
      { id: 57, image_url: "/uploads/activities/jie-ke-ku-lun-luo-fu-9/9-002.png", activity_id: 9, created_at: new Date(), updated_at: new Date() },
      { id: 58, image_url: "/uploads/activities/jie-ke-ku-lun-luo-fu-9/9-003.png", activity_id: 9, created_at: new Date(), updated_at: new Date() },
      { id: 59, image_url: "/uploads/activities/jie-ke-ku-lun-luo-fu-9/9-004.png", activity_id: 9, created_at: new Date(), updated_at: new Date() },
      { id: 60, image_url: "/uploads/activities/jie-ke-ku-lun-luo-fu-9/9-005.png", activity_id: 9, created_at: new Date(), updated_at: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
