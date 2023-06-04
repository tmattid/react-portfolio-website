import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/'
import './index.scss'
//import Logo component
import Logo from '.././Home//FloatingVertSlider//Logo.tsx'

const Layout = () => {
  return (
    <div className="App" style={{ height: '100vh' }}>
      <Sidebar />
      <div className="row h-100 " style={{overflow: 'hidden'}}>
        <div className="col-md-6 h-100">
          <span className="tags top-tags">&lt;body&gt;</span>

          <Outlet />
          <span className="tags bottom-tags">
            &lt;/body&gt;
            <br />
            <span className="bottom-tag-html">&lt;/html&gt;</span>
          </span>
        </div>
        <div className="col-md-6 h-100" style={{display: 'flex',alignItems: 'center',
justifyContent: 'center',  }}>
          <Logo />
        </div>
      </div>
     
    </div>
    
  )
}

export default Layout
