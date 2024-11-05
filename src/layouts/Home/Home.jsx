import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import './Home.css'

export const HomeLayout = ({ children }) => {
  return (
    <div className='homepage'>
      <Header />
      <main className='content'>{children}</main>
      <Footer />
    </div>
  )
}
