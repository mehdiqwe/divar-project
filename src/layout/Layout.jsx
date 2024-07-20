import Header from "layout/Header"
import Footer from "layout/Footer"

const Layout = ({children}) => {
  return (
    <>
        <Header/>
        <div style={{minHeight: "100vh"}}>
            {children}
        </div>
        <Footer />
    </>
  )
}

export default Layout