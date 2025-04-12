import Header from "./component/Header";
import Homepage from "./Pages/Homepage";
import Productdetails from "./Pages/Productdetails";
import { AuthProvider } from "./UserContext/Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from './Pages/Cart';

function App() {
  

  return (
    <>
    <AuthProvider>
    <Header/>
    <Routes>
       <Route path="/"  element={ <Homepage/>} />
       <Route path="/product/:id"  element={ <Productdetails/>} />
       <Route path="/cart" element={<Cart />} />
    </Routes>
   
    </AuthProvider>
      
    </>
  )
}

export default App
