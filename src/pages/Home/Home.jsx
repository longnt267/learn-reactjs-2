import { Container } from '@mui/material'
import { Banner } from '../Banner/Banner'
import { ListProduct } from '../Product/ListProduct'

export const Home = () => {
  return (
    <Container className='home'>
      <Banner />
      <ListProduct />
    </Container>
  )
}
