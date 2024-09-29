// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ShearedLayout from './pages/SharedLayout'
import Leading from './pages/Leanding/Leading';
import ThreeD from './pages/ThreeD/ThreeD';

export default function App() {
  return <BrowserRouter>
      <Routes>
      <Route path='/' element={<ShearedLayout/>}>
        <Route index element={<Leading/>}></Route>
        
        </Route>
        <Route path='3D' element={<ThreeD/>}></Route>
      </Routes>
    </BrowserRouter>

}