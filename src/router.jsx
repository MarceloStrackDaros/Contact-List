import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/login/login';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/main' element={ <App /> }></Route>
      </Routes>
    </BrowserRouter>
  )
}