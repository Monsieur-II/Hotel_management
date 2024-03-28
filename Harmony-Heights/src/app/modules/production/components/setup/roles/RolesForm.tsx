import {useState} from 'react'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Link} from 'react-router-dom'
// import './formStyle.css'
import type {RcFile, UploadFile, UploadProps} from 'antd/es/upload/interface'
import {UploadOutlined} from '@ant-design/icons'
import {Button, Upload, message} from 'antd'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {Api_Endpoint} from '../../../../../services/ApiCalls'
import {useNavigate, Navigate} from 'react-router-dom'
import { BASE_URL } from '../../../urls'

const RolesForm = () => {
  const [formData, setFormData] = useState({})
  const [activeTab, setActiveTab] = useState('tab1')
  const {register, reset, handleSubmit} = useForm()
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const {mutate: addNewRole} = useMutation((values)=>axios.post(`${BASE_URL}/users/NewRole`,values), {
    onSuccess:()=>{
      message.success("Role saved successfully")
      // queryClient.invalidateQueries('bookings')
      // queryClient.invalidateQueries('rooms')
      // queryClient.invalidateQueries('guests')
      // scheduleObj.current.refreshTemplates()
      // scheduleObj.current.refreshLayout()
      navigate('/roles')
    },
    onError:(error: any)=>{
      console.log(error)
      message.error("Operation failed")
    }
  })
  const handleTabClick = (tab: any) => {
    setActiveTab(tab)
  }

  const navigate = useNavigate()

  const handleTabChange = (newTab: any) => {
    setActiveTab(newTab)
  }

  const [fileList, setFileList] = useState<UploadFile[]>([])

  const onChange: UploadProps['onChange'] = (info) => {
    let fileList = [...info.fileList]

    // Limit the file list to only one file
    fileList = fileList.slice(-1)

    // Update the state with the new file list
    setFileList(fileList)
  }

  const onPreview = async (file: any) => {
    let src = file.url

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }

    const image = new Image()
    image.src = src

    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  
  const OnSubmit = handleSubmit(async (values, event) => {
    event?.preventDefault()
    setLoading(true)
    console.log(values)
    
    try {
     
      const userDetails:any = {
        // room: roomsdata?.data[args?.data?.Id-1]?.id,
        name:values.name,
        description: values.description,
      }

      // console.log('bookingSchedule', bookingSchedule)
      // mutateGameSchedule(gameSchedule)
      addNewRole(userDetails)
    } catch (error: any) {
      setSubmitLoading(false)
      return error.statusText
    }
  })

  return (
    <div
      className='col-12'
      style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '5px',

        boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
      }}
    >
      <Link to='/roles'>
        <a
          style={{fontSize: '16px', fontWeight: '500'}}
          className='mb-7 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'
        >
          Back to list
        </a>
      </Link>

      <div className='tabs'></div>
      <form onSubmit={OnSubmit}>
        {/* <form onSubmit={OnSUbmit}> */}
        <div className='tab-content'>
          {/* Details */}
          {activeTab === 'tab1' && (
            <div className='col-12'>
              <div className='row mb-0'>
                <div className='col-4 mb-7'>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Name
                  </label>
                  <input
                    type='text'
                    {...register('name')}
                    className='form-control form-control-solid'
                  />
                </div>
                <div className='col-4 mb-7'>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Description
                  </label>
                  <input
                    type='text'
                    {...register('description')}
                    className='form-control form-control-solid'
                  />
                </div>
              </div>
              
              
            </div>
          )}
        </div>
        <button className='btn btn-primary' onClick={OnSubmit} type='submit'>
          Submit
        </button>
        {/* <button className='btn btn-primary' onClick={OnSUbmit} type="submit">Submit</button> */}
      </form>
    </div>
  )
}

export {RolesForm}
