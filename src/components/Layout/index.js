import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/'
import './index.scss'

const Layout = () => {
  return (
    <>
    <Sidebar className="flex-shrink-0 z-10" />
    <div className="App h-screen flex relative">
      <div className="navbar"> {/* Replace 'navbar' with the class name of your navbar */}
        {/* Navbar content */}
      </div>
      <div className="content-wrapper">
   
        <div className="overflow-hidden flex flex-col flex-grow " style={{height: "100%"}}>
        {/* <StripeGradient /> */}
          <span className="tags top-tags">&lt;body&gt;</span>
          
          <Outlet />
          <span className="tags bottom-tags">
            &lt;/body&gt;
            <br />
            <span className="bottom-tag-html">&lt;/html&gt;</span>
          </span>
        </div>
      </div>
    </div>
  </>
  

  )
}

export default Layout
