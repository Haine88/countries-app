import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SavedCountries from './pages/SavedCountries';
import CountryDetails from './pages/CountryDetails.jsx';
import localData from '../localData.js'
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">Where in the world?</Link>
        <Link to="/saved">Saved Countries</Link>
      </header>
      <Routes>
        <Route path="/" element={<Home countriesData={localData} />} />
        <Route path="saved" element={<SavedCountries />} />
        <Route path="/country" element={<CountryDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
