import logo from './logo.svg';
import './App.css';
import Nav from "./component.js/Nav"
import Footer from "./component.js/Footer"
import Signup from "./component.js/Signup"
import Login from "./component.js/Login"
import AddProduct from "./component.js/AddProduct"
import UpdateProduct from "./component.js/UpdateProduct"
import Profiles from "./component.js/Profiles"
import ProductList from "./component.js/ProductList"
import PrivateComponent from "./component.js/PrivateComponent"
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>

      <Routes>

        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<h1>{<ProductList/>}</h1>} />
        <Route path="/add" element={<h1>{<AddProduct/>}</h1>} />
        <Route path="/update/:productId" element={<h1>{<UpdateProduct/>}</h1>} />
        <Route path="/profile" element={<h1>{<Profiles/>}</h1>} />
        {/* <Route path="/logout" element={<h1>Logout Component</h1>} /> */}
        </Route>

        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
