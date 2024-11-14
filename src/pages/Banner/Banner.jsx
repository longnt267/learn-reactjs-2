import { Container } from '@mui/material'
import './Banner.css'

export const Banner = () => {
  return (
    <Container className='banner-container'>
      <img
        className='image-banner'
        src='https://i.postimg.cc/Df4XfjC2/462569861-1301308087895213-814065351129321231-n.jpg'
        alt='Ảnh cãi nhau bằng cả tính mạng'
      />
    </Container>
  )
}
