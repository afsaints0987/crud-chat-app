import { Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Dashboard from "./pages/Dashboard/Dashboard"

function App() {
  const user = localStorage.getItem("userData")
  
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to='/'/>}/>
    </Routes>
  )
}

export default App
