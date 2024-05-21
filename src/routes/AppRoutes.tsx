import { Route, Routes } from 'react-router-dom'
import App from '../App'
import Header from '../components/Header/Header'
import CadastrarProduto from '../pages/CadastrarProduto'


export const AppRoutes = () => {
  return (
    <>
    <Header />
    <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/cadastrar-produto' element={<CadastrarProduto />}></Route>
        <Route path='/' element={<App />}></Route>
        <Route path='/' element={<App />}></Route>
        <Route path='/' element={<App />}></Route>
     

    </Routes>
    
    
    
    </>
  )
}
