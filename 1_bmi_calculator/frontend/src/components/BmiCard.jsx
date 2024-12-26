import React, { useState } from 'react';
import "./BmiCard.css";
import DarkModeButton from './DarkModeButton';

const BmiCard = () => {

    const [bmiSectionDarkMode, setBmiSectionDarkMode] = useState(false);
    const [cardHeaderDarkMode, setCardHeaderDarkMode] = useState(false);
    const [groupBtnDarkMode, setGroupBtnDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setBmiSectionDarkMode(!bmiSectionDarkMode);
        setCardHeaderDarkMode(!cardHeaderDarkMode);
        setGroupBtnDarkMode(!groupBtnDarkMode);
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
                      <div className="col-md-9 fw-bold pt-1">BMI Calculator</div>
                      <div className="col-md-3">
                        <DarkModeButton onToggle={toggleDarkMode}/>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form>
                        <div className='row mb-4'>

                        <div class="col-md-12">
                            <div class="mb-3">
                                <label class="form-label" for="fullName">Your Full Name</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="fullName" 
                                    placeholder="Full Name..." 
                                    autoComplete='off'
                                    required
                                />
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="mb-3">
                                <label class="form-label" for="weight">Your Weight (kg)</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="weight" 
                                    placeholder="Weight (kg)..." 
                                    autoComplete='off'
                                    required
                                />
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="mb-3">
                                <label class="form-label" for="height">Your Height (inch)</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="height" 
                                    placeholder="Height (inch)..." 
                                    autoComplete='off'
                                    required
                                />
                            </div>
                        </div>

                        <div class="col">
                            <div class="mb-3">
                                <div class="d-flex justify-content-center gap-2">
                                    <button className={`btn ${groupBtnDarkMode ? 'groupBtnDarkMode' : 'group-btn'}`} type="button">Submit</button>
                                    <button className={`btn ${groupBtnDarkMode ? 'groupBtnDarkMode' : 'group-btn'}`} type="button">Reload</button>
                                </div>
                            </div>
                        </div>

                        </div>
                    </form>
                  </div>
                  {/* <ul class="list-group list-group-flush">
                    <li class="list-group-item">An item</li>
                    <li class="list-group-item">A second item</li>
                    <li class="list-group-item">A third item</li>
                </ul> */}
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