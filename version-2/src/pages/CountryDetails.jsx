import { useParams, Link } from 'react-router-dom';

function CountryDetails({ countriesData }) {
    // get country's name from the URL parameter // 
    const countryName = useParams().countryName;

    // use .find() to find country that matches // 
    const country = countriesData.find(country => country.name.common == countryName);


    const saveCountry = async (countryName) => {
        try {
            const res = await fetch('/api/save-one-country', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    country_name: countryName,
                }),
            })
            const result = await res.text();
        } catch (error) {
            console.log('error', error)
        }
    }

    const handleSave = () => {
        saveCountry(country.name.common)
    }

    return (
        <div className="country-details-container">
            <Link to="/" className="back-button">
                ← Back
            </Link>
            <div className="country-details-content">
                <img src={country.flags.png} alt={`${country.name.common} flag`} />
                <div className="country-detail-info">
                    <h1>{country.name.common}</h1>
                    <button
                        className="save-button"
                        onClick={handleSave}>
                        Save
                    </button>
            
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital?.[0]}</p>
            </div>
            </div>
        </div>
    )
}

export default CountryDetails;
