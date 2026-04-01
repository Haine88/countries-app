import {Link} from 'react-router-dom'


function CountryCard({ country }) {
    return (
        <Link to={`/country-detail/${country.name.common}`}>
        <div className="country-card">
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
            <div className="country-info">
                <h2>{country.name.common}</h2>
                <p>Population: {country.population.toLocaleString()}</p>
                <p>Capital: {country.capital}</p>
                <p>Region: {country.region}</p>
            </div>
            </div>
        </Link>
    )
}
export default CountryCard;