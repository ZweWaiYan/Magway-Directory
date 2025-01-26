import React from 'react'
import UserActiveCharts from './Dashboard/UserActiveCharts'
import PostDataCards from './Dashboard/PostDataCards'
import UpBudgeCards from './Dashboard/UpBudgeCards'
import TotalUserCards from './Dashboard/TotalUserCards'
import TopViewCards from './Dashboard/TopViewCards'

const Dashboard = () => {
  return (
    <div className=''>
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-1'>
        <div className='flex flex-col items-center mb-5'>
          <UpBudgeCards />
          <TotalUserCards />
          <PostDataCards />
        </div>
        <div className='flex justify-center items-start mb-5'>
          <UserActiveCharts />
        </div>
        <div className='flex justify-center items-center'>
          <TopViewCards />
        </div>
      </div>
    </div>

  )
}

export default Dashboard