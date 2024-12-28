import React, { useState } from 'react';
import "./BmiCard.css";
import DarkModeButton from './DarkModeButton';

const BmiCard = () => {

    const [bmiSectionDarkMode, setBmiSectionDarkMode] = useState(false);
    const [cardHeaderDarkMode, setCardHeaderDarkMode] = useState(false);
    const [groupBtnDarkMode, setGroupBtnDarkMode] = useState(false);

    const [user, setUser ] = useState({
      fullName: "",
      age: "",
      weight: "",
      height: "",
      bmi: "",
      bmiMessage: ""
    });

    const handleInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;

      setUser({
        ...user,
        [name]: value,
      });
    };


    const toggleDarkMode = () => {
        setBmiSectionDarkMode(!bmiSectionDarkMode);
        setCardHeaderDarkMode(!cardHeaderDarkMode);
        setGroupBtnDarkMode(!groupBtnDarkMode);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (parseInt(user.weight) === 0 || parseInt(user.height) === 0) {
        alert("Please enter valid weight & height");
        return;
      }
    
      let bmi = Number(user.weight / (user.height * user.height)) * 703;
      const updatedBmi = bmi.toFixed(1);
      let bmiMessage = "";
    
      if (bmi < 18.5) {
        bmiMessage = "You are underweight";
      } else if (bmi >= 18.5 && bmi < 25) {
        bmiMessage = "You have a normal weight";
      } else if (bmi >= 25 && bmi < 30) {
        bmiMessage = "You are overweight";
      } else {
        bmiMessage = "You are obese";
      }
    
      const bmiUserData = {
        ...user,
        bmi: updatedBmi,
        bmiMessage: bmiMessage,
      };
    
      setUser(bmiUserData);
    
      try {
        const response = await fetch('http://localhost:5000/api/auth/bmiuserdata', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bmiUserData),
        });
    
        if (!response.ok) {
          throw new Error("Failed to send BMI data");
        }else if(response.ok){
          setUser({
            fullName: "",
            age: "",
            weight: "",
            height: "",
            bmi: "",
            bmiMessage: ""
          });
          alert("Data has been successfully sent to the database.");
        }

    
        console.log(response);
      } catch (error) {
        console.error("Error sending BMI data:", error);
      }
    };
    

    const reloadForm = () => {
      setUser({
        fullName:"",
        age:"",
        weight:"",
        height:"",
        bmi:"",
        bmiMessage:"",
      })
    }
    
  return (
    <>
    <section className={`${bmiSectionDarkMode ? 'bmiSectionDarkMode' : 'bmi-section'}`}>
        <div className="container bmi-container">
          <div className="row bmi-row d-flex justify-content-center align-items-center">
            <div className="col-md-4">
{/* -----bmi calculator start here----- */}
                <div className="card">
                  <div className={`${cardHeaderDarkMode ? 'cardHeaderDarkMode' : 'card-header'}`}>
                    <div className="row">
                      <div className="col-md-9 fw-bold py-1">BMI Calculator</div>
                      <div className="col-md-3">
                        <DarkModeButton onToggle={toggleDarkMode}/>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className='row mb-4'>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="fullName">Your Full Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="fullName"
                                    name="fullName"
                                    value={user.fullName}
                                    onChange={handleInput}
                                    placeholder="Full Name..." 
                                    autoComplete='off'
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="age">Your Age</label>
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

                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="weight">Your Weight (kg)</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="weight" 
                                    name="weight"
                                    value={user.weight}
                                    onChange={handleInput}
                                    placeholder="Weight (kg)..."
                                    autoComplete='off'
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="height">Your Height (inch)</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="height"
                                    name="height"
                                    value={user.height}
                                    onChange={handleInput}
                                    placeholder="Height (inch)..." 
                                    autoComplete='off'
                                    required
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="mb-3">
                                <div className="d-flex justify-content-center gap-2">
                                    <button className={`btn ${groupBtnDarkMode ? 'groupBtnDarkMode' : 'group-btn'}`} type="submit">Submit</button>
                                    <button className={`btn ${groupBtnDarkMode ? 'groupBtnDarkMode' : 'group-btn'}`} type="button" onClick={reloadForm}>Reload</button>
                                </div>
                            </div>
                        </div>

                        </div>
                    </form>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      {user.bmi && <h3>Your BMI is: {user.bmi}</h3>}
                    </li>
                    <li className="list-group-item">
                      {user.bmiMessage && <p>{user.bmiMessage}</p>}
                    </li>
                </ul>
                </div>
{/* -----bmi calculator end here----- */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BmiCard