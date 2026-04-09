import { useState, useEffect } from 'react';
import CountryCard from '../components/CountryCard.jsx';


function SavedCountries({countriesData}) {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        country: '',
        bio: ''
    });

    const [newestUserData, setNewestUserData] = useState(null)

    const [savedCountries, setSavedCountries] = useState([]);

    // it's a handlechange function that keep the existing data while only change one specific value//
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
   // save user data to database //
    const storeUserData = async (data) => {
        const response = await fetch('api/add-one-user', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.fullName,
                country_name: data.country,
                email: data.email,
                bio: data.bio,
            }),
        })
        const result = await response.text();
        console.log("result", result)
    }

 //  handle form submission 
    async function handleSubmit(e) {
       e.preventDefault();
        console.log('Form submitted: ', formData)
        
        await storeUserData(formData)

        setFormData({
            fullName: '',
            email: '',
            country: '',
            bio: ''
        });

        getNewestUserData();
    }
   // get newest user from database 
    const getNewestUserData = async () => {
        try {
            const res = await fetch('/api/get-newest-user', {
                method: "GET",
            });
            const userData = await res.json();
            

            setNewestUserData({
                fullName: userData.name,
                email: userData.email,
                country: userData.country_name,
                bio: userData.bio
            });
        } catch (error) {
            console.log('error', error)
        }
    };

  // get all saved countries from database //
    const getSavedCountries = async () => {
        try {
            const res = await fetch('/api/get-all-saved-countries', {
                method: "GET",
            });
            const data = await res.json();
            setSavedCountries(data);
        } catch (error) {
            console.log('error', error)
        }
    }; 
   // load data when page loads 
    useEffect(() => {
        getNewestUserData();
        getSavedCountries();
    }, []);




    return (
        <div className="saved-countries-container"> 
            <section className="saved-countries-section">
                <h2>My Saved Countries</h2>
                <div className="saved-countries-list">
                    {savedCountries.map((savedCountry, index) => {
                        const fullCountryData = countriesData.find(
                            country => country.name.common === savedCountry.country_name
                        );
                        return <CountryCard key={index} country={fullCountryData} />
                        })}
                </div>
            </section>
            
            <section className="profile-section">
                {newestUserData && <h2>Welcome, {newestUserData.fullName} !</h2>}
                <h2>My Profile</h2>
                <div className="profile-form">
                    <input 
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                    />

                      <input 
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                      <input 
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                    />

                      <textarea 
                        type="bio"
                        name="bio"
                        placeholder="Bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Submit</button>
             </div>
            </section>
        </div>
    )
}

export default SavedCountries;