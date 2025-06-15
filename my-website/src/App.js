import './App.css';
import Home from './pages/Home'
import Layout from './pages/Layout';
import NoPage from './pages/NoPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

/*--rose-ebony: #563d39ff;
--satin-sheen-gold: #cd9f3cff;
--rust: #b54403ff;
--dark-moss-green: #496515ff;
--pakistan-green: #183d00ff;*/

export default App;
