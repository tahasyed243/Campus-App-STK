import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import useGetCompanyJobs from '@/hooks/useGetCompanyJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import CompanyJobsTable from './CompanyJobsTable'
import Footer from '../shared/Footer'

const CompanyJobs = () => {
  useGetCompanyJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto mb-44'>
        <div 
        className='w-fit rounded-lg hover:underline duration-700
         flex items-center hover:bg-gray-300 justify-between my-5'>
          <Button onClick={() => navigate("/jobs/create")}>New Jobs</Button>
        </div>
        <CompanyJobsTable />
      </div>
      <Footer />
    </div>
  )
}

export default CompanyJobs