import {Link} from 'react-router-dom'
import CountryCard from '../components/CountryCard.jsx';

function Home({countriesData}) {
    return (
        <div>
            <div className="countries-container">
                {countriesData.map((country) => (
                    <CountryCard
                        key={country.name.common}
                        country={country}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;