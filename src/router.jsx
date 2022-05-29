import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/login/login';
import UserProvider from './components/contexts/user'

export default function Router() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/main' element={ <App /> }></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}