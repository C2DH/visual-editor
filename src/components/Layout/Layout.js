import React from 'react'
import './Layout.css'
import Sidebar from '../../components/Sidebar'
import Error from '../Error';

const Layout = ({ children }) => (
  <div className="Layout">
    <Sidebar />
    <Error />
    <div className="Layout__container">
      {children}
    </div>
  </div>
)

export default Layout
