import { Box, Button, Checkbox, colors, Grid, IconButton, InputAdornment, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CustomInput from './CustomInput'
import { FaLeaf } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { authApi } from '../apis/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth' // Import useAuth hook

const SigninPage = () => {
  const [errors, setErrors] = useState({}) // Tích hợp các lỗi thành 1 object duy nhất
  const [loading, setLoading] = useState(false) // Added state for loading
  const [showPassword, setShowPassword] = useState(false) // Added state for showing password
  const [rememberAccount, setRememberAccount] = useState(false) // Added state for remembering account
  const navigate = useNavigate()
  const { login, setUser } = useAuth() // Lấy login và setUser từ AuthContext

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
      login(response.token)
      setUser(response.user)
      if (rememberAccount) {
        localStorage.setItem('email', email)
      }
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        document.getElementById('login-button').click()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

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
            autoComplete='email' // Added autocomplete for email
          />
          <CustomInput
            label='Password'
            placeholder='Password'
            name='password' // Thêm name cho input
            value={password} // Liên kết với state
            onChange={(e) => setPassword(e.target.value)} // Thêm hàm xử lý thay đổi
            error={!!errors.password} // Kiểm tra có lỗi không
            helperText={errors.password} // Hiển thị thông báo lỗi
            isIconActive={true}
            type={showPassword ? 'text' : 'password'} // Toggle password visibility
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            autoComplete='current-password' // Added autocomplete for password
          />
          {/* INPUT END */}
          <Box display='flex' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
            <Typography color='white' variant='body2'>
              Remember account
            </Typography>
            <Checkbox
              checked={rememberAccount}
              onChange={(e) => setRememberAccount(e.target.checked)}
              color='primary'
            />
          </Box>
          <Button
            id='login-button'
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
    </Grid>
  )
}

export default SigninPage
