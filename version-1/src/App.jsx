import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SavedCountries from './pages/SavedCountries';
import CountryDetails from './pages/CountryDetails.jsx';
import localData from '../localData.js'
import "./App.css";
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
   // i set it to localData instead of [] so if it fail it still have localdata //
  const [countriesData, setCountriesData] = useState(localData)

  const getCountriesData = async () => {
    try {
      const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,borders,capital,region');
      const data = await res.json();
      console.log(data);
      setCountriesData(data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);

    return (
    <BrowserRouter>
      <header>
        <Link to="/">Where in the world?</Link>
        <Link to="/saved">Saved Countries</Link>
      </header>
      <Routes>
        <Route path="/" element={<Home countriesData={countriesData} />} />
        <Route path="saved" element={<SavedCountries />} />
          <Route path="/country-detail/:countryName" element={<CountryDetails countriesData={countriesData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
