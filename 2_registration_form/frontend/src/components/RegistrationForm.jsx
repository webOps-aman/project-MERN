import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {

    const [user, setUser] = useState({
        fullname: "",
        age: "",
        email: "",
        city: "",
        pincode: "",
        phonenumber: "",
        occupation: ""
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await fetch("http://localhost:4000/",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            
            if(response.ok){
                setUser({
                    fullname: "",
                    age: "",
                    email: "",
                    city: "",
                    pincode: "",
                    phonenumber: "",
                    occupation: ""
                })
            }

            console.log(response);
        } catch (error) {
            console.log(`Error from Registration ${error}`);
        }

    };

  return (
    <>
        <section className='form-section mt-5'>
            <div className='container form-container'>
                <div className='row form-row'>
                    <div className='col-md-5 image-col'>
                        <div className='image-area'>
                            <img src="./images/form_image.png" className='img-fluid' alt="form" />
                        </div>
                    </div>
                    <div className='col-md-7 form-col mt-5'>
{/* -----form start here-----*/}
                        <form onSubmit={handleSubmit}>
                            <div className='row mb-4'>

                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                    <label className="form-label" htmlFor="fullname">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fullname"
                                            name="fullname"
                                            value={user.fullname}
                                            onChange={handleInput}
                                            placeholder="Full Name..."
                                            autoComplete='off'
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                    <label className="form-label" htmlFor="age">Age</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="age"
                                            name="age"
                                            value={user.age}
                                            onChange={handleInput}
                                            placeholder="Age..."
                                            autoComplete='off'
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='col-md-12'>
                                    <div className='mb-3'>
                                    <label className="form-label" htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleInput}
                                            placeholder="Email..."
                                            autoComplete='off'
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                    <label className="form-label" htmlFor="city">City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="city"
                                            name="city"
                                            value={user.city}
                                            onChange={handleInput}
                                            placeholder="City..."
                                            autoComplete='off'
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                    <label className="form-label" htmlFor="pincode">Pin Code</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="pincode"
                                            name="pincode"
                                            value={user.pincode}
                                            onChange={handleInput}
                                            placeholder="Pin Code..."
                                            autoComplete='off'
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                    <label className="form-label" htmlFor="phonenumber">Phone Number</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="phonenumber"
                                            name="phonenumber"
                                            value={user.phonenumber}
                                            onChange={handleInput}
                                            placeholder="Phone Number..."
                                            autoComplete='off'
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                    <label className="form-label" htmlFor="occupation">Occupation</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="occupation"
                                            name="occupation"
                                            value={user.occupation}
                                            onChange={handleInput}
                                            placeholder="Occupation..."
                                            autoComplete='off'
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='col-md-12 text-center'>
                                <button type="submit" className='btn btn-primary'>Submit</button>
                                </div>

                            </div>
                        </form>
{/* -----form end here-----*/}
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default RegistrationForm