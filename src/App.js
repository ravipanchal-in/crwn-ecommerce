import { Routes, Route } from 'react-router-dom';
import Auth from './routes/auth/authentication/authentication';
import Home from "./routes/home/home";
import Navigation from './routes/navigation/navigation.component.jsx'
const Shop = () => (<h1>I am Shop</h1>)

const App = () => {

  return <>
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Auth />} />
      </Route>
    </Routes>
  </>;
};

export default App;
