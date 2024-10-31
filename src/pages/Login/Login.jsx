import React, { useState } from 'react'
import './LoginForm.css' // Kết nối với file CSS

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Xử lý đăng nhập ở đây
    console.log('Username:', username)
    console.log('Password:', password)
  }

  return (
    <div className='login-form-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h2>Đăng Nhập</h2>
        <div className='form-group'>
          <label htmlFor='username'>Tài khoản</label>
          <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Mật khẩu</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Đăng Nhập</button>
      </form>
    </div>
  )
}

export default LoginForm
