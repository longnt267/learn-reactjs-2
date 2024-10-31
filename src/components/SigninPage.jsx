import { Box, Button, Checkbox, colors, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import React, { useState, useCallback } from 'react'
import CustomInput from './CustomInput'
import { FaLeaf } from 'react-icons/fa'
import { toast } from 'react-toastify' // Import toast nếu bạn sử dụng

const SigninPage = () => {
  // const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Xóa lỗi khi người dùng bắt đầu nhập lại
    setErrors({ ...errors, [name]: undefined })
  }

  const handleLogin = async (e) => {
    e.preventDefault() // Ngăn chặn hành động mặc định của form

    // try {
    //   // const response = await api.login(formData) // Gọi API đăng nhập
    //   const token = response.data.token

    //   localStorage.setItem('token', token)
    //   toast.success('Đăng nhập thành công!') // Thông báo thành công
    // } catch (error) {
    //   if (error.response && error.response.data.errors) {
    //     // Hiển thị lỗi xác thực
    //     setErrors(error.response.data.errors) // Giả sử lỗi từ backend theo cấu trúc như đã định nghĩa trước đó
    //     Object.values(error.response.data.errors).forEach(
    //       (message) => toast.error(message) // Hiển thị từng thông báo lỗi
    //     )
    //   } else {
    //     toast.error('Đăng nhập thất bại, vui lòng thử lại.') // Lỗi chung
    //   }
    // }
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
            {/* LOGO */}
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
            {/* LOGO END */}

            <Typography
              color='white'
              fontWeight='bold'
              sx={{ textAlign: 'center', margin: 0 }}
              mt={7}
              mb={3}
            ></Typography>
            <Typography color='white' fontSize={30} sx={{ textAlign: 'center', marginTop: 4 }} mt={7} mb={3}>
              Sign in
            </Typography>
          </Box>

          {/* INPUTS */}
          <CustomInput
            label='Login'
            placeholder=''
            name='username' // Thêm name cho input
            value={formData.username} // Liên kết với state
            onChange={handleChange} // Thêm hàm xử lý thay đổi
            error={!!errors.username} // Kiểm tra có lỗi không
            helperText={errors.username} // Hiển thị thông báo lỗi
            isIconActive={false}
          />
          <CustomInput
            label='Password'
            placeholder=''
            name='password' // Thêm name cho input
            value={formData.password} // Liên kết với state
            onChange={handleChange} // Thêm hàm xử lý thay đổi
            error={!!errors.password} // Kiểm tra có lỗi không
            helperText={errors.password} // Hiển thị thông báo lỗi
            isIconActive={true}
          />
          {/* INPUT END */}
          <Button
            onClick={handleLogin}
            variant='contained'
            fullWidth
            sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}

export default SigninPage
