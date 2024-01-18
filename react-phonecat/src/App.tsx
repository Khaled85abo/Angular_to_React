import './App.css'
import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PhoneList from './components/phone-list/PhoneList'
import PhoneDetail from './components/phone-detail/PhoneDetail'
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes >
          <Route path="/" element={<Navigate to={'/phones'} replace />} />
          <Route path="/phones" element={<PhoneList />} />
          <Route path="/phones/:phoneId" element={<PhoneDetail />} />
          <Route path="/*" element={<h3>Not Found</h3>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
