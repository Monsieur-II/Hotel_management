import {useState} from 'react'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Link} from 'react-router-dom'
// import './formStyle.css'
import type {RcFile, UploadFile, UploadProps} from 'antd/es/upload/interface'
import {UploadOutlined} from '@ant-design/icons'
import {Button, Upload, message} from 'antd'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {Api_Endpoint, fetchRolesApi} from '../../../../../services/ApiCalls'
import {useNavigate, Navigate} from 'react-router-dom'
import { BASE_URL } from '../../../urls'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'

const UsersForm = () => {
  const [formData, setFormData] = useState({})
  const [activeTab, setActiveTab] = useState('tab1')
  const {register, reset, handleSubmit} = useForm()
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const {data: userRoles, isLoading: userRolesLoad} = useQuery('roles', fetchRolesApi)
  const {mutate: addNewUser} = useMutation((values)=>axios.post(`${BASE_URL}/users`,values), {
    onSuccess:()=>{
      message.success("User registered successfully")
      // queryClient.invalidateQueries('bookings')
      // queryClient.invalidateQueries('rooms')
      // queryClient.invalidateQueries('guests')
      // scheduleObj.current.refreshTemplates()
      // scheduleObj.current.refreshLayout()
      navigate('/users')
    },
    onError:(error: any)=>{
      console.log(error)
      message.error("Registration failed")
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
   
    try {
     
      const dat =  userRoles?.data.find((e: { id: any })=>e.id===values.role)
      const userDetails:any = {
        // room: roomsdata?.data[args?.data?.Id-1]?.id,
        firstName:values.firstName,
        lastName: values.lastname,
        email:values.email,
        // role:values.email,
        // gender:values.email,
        roleId: dat['id'],
        username:values.username,
        password:values.password
        // gameTypeId: data.gameType,
      }

     
      addNewUser(userDetails)
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
      <Link to='/users'>
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
                    First Name
                  </label>
                  <input
                    type='text'
                    {...register('firstName')}
                    className='form-control form-control-solid'
                  />
                </div>
                <div className='col-4 mb-7'>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    {...register('lastname')}
                    className='form-control form-control-solid'
                  />
                </div>
                <div className='col-4 mb-7'>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Email
                  </label>
                  <input
                    type='text'
                    {...register('email')}
                    className='form-control form-control-solid'
                  />
                </div>
              </div>
              <div className='row mb-0'>
              <div className='col-4 mb-7'>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Username
                  </label>
                  <input
                    type='text'
                    {...register('username')}
                    className='form-control form-control-solid'
                  />
                </div>
                <div className='col-4 mb-7'>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Password
                  </label>
                  <input
                    type='text'
                    {...register('password')}
                    className='form-control form-control-solid'
                  />
                </div>
                <div className='col-4 mb-7'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Role
                  </label>
                  <DropDownListComponent
                id='role'
                placeholder='User Role'
                {...register('role')}
                className='form-control form-control-solid'
                dataSource={userRoles?.data}
                fields={{text: 'name', value: 'id'}}
                // value={props && props.gameTypeId ? props.gameTypeId : null}
                style={{width: '100%'}}
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

export {UsersForm}
