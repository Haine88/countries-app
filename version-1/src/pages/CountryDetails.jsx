import { useParams, Link } from 'react-router-dom';

function CountryDetails({ countriesData }) {
    // get country's name from the URL parameter // 
    const countryName = useParams().countryName;

    // use .find() to find country that matches // 
    const country = countriesData.find(country => country.name.common == countryName);

    return (
        <div className="country-details-container">
            <Link to="/" className="back-button">
                ← Back
            </Link>
            <div className="country-details-content">
                <img src={country.flags.png} alt={`${country.name.common} flag`} />
                <div className="country-detail-info">
                    <h1>{country.name.common}</h1>
                    <button className="save-button">Save</button>
            
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital?.[0]}</p>
            </div>
            </div>
        </div>
    )
}

export default CountryDetails;
