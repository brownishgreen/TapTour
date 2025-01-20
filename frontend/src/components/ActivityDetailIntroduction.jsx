import React from 'react'
import '../scss/components/_activity-detail-introduction.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faClock, faCheck, faEarthEurope } from '@fortawesome/free-solid-svg-icons'

const ActivityDetailIntroduction = () => {
  return (
    <div className="activity-detail-introduction">
      <p><FontAwesomeIcon icon={faPeopleGroup} /> 0-99歲</p>
      <p><FontAwesomeIcon icon={faClock} /> 所需時間：5-7小時</p>
      <p><FontAwesomeIcon icon={faClock} /> 開始時間：查看供應狀況</p>
      <p><FontAwesomeIcon icon={faEarthEurope} /> 即時指南：中文、英語</p>
      <p><FontAwesomeIcon icon={faCheck} /> 包含：午餐、交通、門票</p>
    </div>
  )
}

export default ActivityDetailIntroduction