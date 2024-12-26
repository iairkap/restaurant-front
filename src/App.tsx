
import './App.css'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Home from './pages/HomePage'
import MenuManagment from './pages/Dashboard/MenuManagment'
import RestaurantInfo from './pages/Dashboard/RestaurantInfo'
import Staff from './pages/Dashboard/Staff'
import Settings from './pages/Dashboard/Settings'
import DashboardLayout from './Layout'
import LoginPage from './pages/Login'
import SignUpPage from './pages/SignUp'
function App() {

  return (
    <main className="w-[calc(100vw-72px)]">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignUpPage />} />
        {/* Dashbord Routes */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/dashboard/menu" element={<DashboardLayout><MenuManagment /></DashboardLayout>} />
        <Route path="/dashboard/staff" element={<DashboardLayout><Staff /></DashboardLayout>} />
        <Route path="/dashboard/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
        <Route path="/dashboard/info" element={<DashboardLayout><RestaurantInfo /></DashboardLayout>} />
      </Routes>

    </main>
  )
}

export default App
