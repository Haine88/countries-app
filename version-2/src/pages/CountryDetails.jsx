import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function CountryDetails({ countriesData }) {
    // get country's name from the URL parameter // 
    const countryName = useParams().countryName;

    const [viewCount, setViewCount] = useState(0);

    const [isSaved, setIsSaved] = useState(false);

    // use .find() to find country that matches // 
    const country = countriesData.find(country => country.name.common === countryName);

      // update view count to data base 
    const updateViewCount = async (countryName) => {
        try {
            const res = await fetch('/api/update-one-country-count', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    country_name: countryName
                }),
                
            });
            const result = await res.json();
            setViewCount(result.count);
        } catch (error) {
            console.log('error', error);
        }
    }
    // call the undateviewcount function when page load // 
    useEffect(() => {
        if (country) {
        updateViewCount(country.name.common);
        checkIfSaved(country.name.common)
        }
    }, [country?.name.common]);

   
    const checkIfSaved = async (countryName) => {
        try {
            const res = await fetch('/api/get-all-saved-countries', {
                method: "GET",
            });
            const data = await res.json();
            const isCountrySaved = data.some(
                saveCountry => saveCountry.country_name === countryName
            );
            setIsSaved(isCountrySaved);
        } catch (error) {
            console.log('error', error)
        }
    }






   // save country to the user's list
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
            setIsSaved(true)
        } catch (error) {
            console.log('error', error)
        }
    }
     
    const unsaveCountry = async (countryName) => {
        try {
            const res = await fetch('/api/unsave-one-country', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    country_name: countryName,
                })
            })
            const result = await res.text();
            setIsSaved(false)
        } catch (error) {
            console.log('error', error)
        }
    }

    const handleToggleSave = () => {
        if (isSaved) {
            unsaveCountry(country.name.common);
        } else {
            saveCountry(country.name.common);
       }
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
                        onClick={handleToggleSave}>
                        {isSaved ? '❤️' : '🤍'}
                    </button>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital?.[0]}</p>
            <p>Viewed: {viewCount} times</p>
            </div>
            </div>
        </div>
    )
}

export default CountryDetails;
