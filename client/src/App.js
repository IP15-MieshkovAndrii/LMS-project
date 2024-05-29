import './App.scss';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./views/Home/Home";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ActivateAccount from './views/Home/ActivateAccount/ActivateAccount';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/activate" element={<ActivateAccount/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
