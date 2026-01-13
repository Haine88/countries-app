import { useState } from 'react';


function SavedCountries() {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        country: '',
        bio: ''
    });

    
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit() {
        console.log('Form submitted: ', formData)

        setFormData({
            fullName: '',
            email: '',
            country: '',
            bio: ''
        });
    }
    return (
        <div className="saved-countries-container"> 
            <section className="saved-countries-section">
                <h2>My Saved Countries</h2>
            </section>
            
            <section className="profile-section">
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