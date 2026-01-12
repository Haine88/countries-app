function CountryCard({country}) {
    return (
        <div className="country-card">
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
            <div className="country-info">
                <h2>{country.name.common}</h2>
                <p>Population: {country.population.toLocaleString()}</p>
                <p>Capital: {country.capital}</p>
                <p>Region: {country.region}</p>
            </div>
        </div>
    )
}
export default CountryCard;