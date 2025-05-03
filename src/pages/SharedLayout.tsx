
import { Outlet } from 'react-router-dom'
import { HeaderMegaMenu } from '../components/Navbar/HeaderMegaMenu'
import Footer from '../components/Footer/Footer'
const SharedLayout = () => {
  return (
    <div className='m-0 p-0 bg-white '>
        <HeaderMegaMenu/>
        <main>
        <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default SharedLayout