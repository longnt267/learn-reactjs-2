import { Box, Button, colors, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import CustomInput from './CustomInput'
import { FaLeaf } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { authApi } from '../apis/auth'
import { useNavigate } from 'react-router-dom'

const SigninPage = () => {
  const [errors, setErrors] = useState({}) // Tích hợp các lỗi thành 1 object duy nhất
  const [loading, setLoading] = useState(false) // Added state for loading
  const navigate = useNavigate()

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    if (!email.trim() || !password.trim()) {
      isValid = false
      toast.error('Email và mật khẩu không được để trống')
    }

    setErrors(newErrors)
    return isValid
  }

  // Sửa lại hàm handleChange
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    setLoading(true) // Set loading to true when starting the API call
    try {
      const response = await authApi.login(email, password)
      localStorage.setItem('token', response.token)
      toast.success('Đăng nhập thành công!')
      // Redirect immediately after successful login
      navigate('/home') // or wherever your main app page is
    } catch (error) {
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach((message) => {
          toast.error(message)
        })
      } else {
        toast.error(error.response?.data?.message || 'Đã có lỗi xảy ra')
      }
    } finally {
      setLoading(false) // Set loading to false after the API call
    }
  }

  return (
    <Grid
      xs={12}
      sm={12}
      md={6}
      lg={6}
      xl={6}
      minHeight={550}
      sx={{
        boxShadow: {
          xs: '',
          sm: '',
          md: '15px 2px 5px -5px',
          lg: '15px 2px 5px -5px',
          xl: '15px 2px 5px -5px'
        }
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(0, 24, 57, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          borderRadius: {
            xs: '30px',
            sm: '30px',
            md: '30px 0 0 30px',
            lg: '30px 0 0 30px',
            xl: '30px 0 0 30px'
          }
        }}
      >
        <Box width='50%'>
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Box
              sx={{
                mt: '60px',
                width: '150px',
                height: '50px',
                bgcolor: 'primary.main',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 20px ${colors.green[500]}`
              }}
            >
              <Typography variant='h6' fontWeight='bold' color='white'>
                <FaLeaf size={20} />
              </Typography>
            </Box>

            <Typography color='white' fontSize={30} sx={{ textAlign: 'center', marginTop: 4 }} mt={7} mb={3}>
              Đăng nhập
            </Typography>
          </Box>

          {/* INPUTS */}
          <CustomInput
            label='Login'
            placeholder='Email'
            name='email' // Thêm name cho input
            value={email} // Liên kết với state
            onChange={(e) => setEmail(e.target.value)} // Thêm hàm xử lý thay đổi
            error={!!errors.email} // Kiểm tra có lỗi không
            helperText={errors.email} // Hiển thị thông báo lỗi
            isIconActive={false}
          />
          <CustomInput
            label='Password'
            placeholder='Password'
            name='password' // Thêm name cho input
            value={password} // Liên kết với state
            onChange={(e) => setPassword(e.target.value)} // Thêm hàm xử lý thay đổi
            error={!!errors.password} // Kiểm tra có lỗi không
            helperText={errors.password} // Hiển thị thông báo lỗi
            isIconActive={false}
          />
          {/* INPUT END */}
          <Button
            onClick={handleLogin}
            variant='contained'
            fullWidth
            sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </Box>
      </Box>
      <ToastContainer position='top-right' autoClose={3000} />
    </Grid>
  )
}

export default SigninPage
