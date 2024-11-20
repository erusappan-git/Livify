import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import AppRoutes from "./router/AppRoutes"



const App = () => {
  return (
    <>
      <Header />

      <ToastContainer/>

      <Outlet />

      <Footer />
    </>
  )
}

export default App
