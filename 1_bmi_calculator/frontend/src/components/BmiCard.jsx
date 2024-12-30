import React, { useEffect, useState } from 'react';
import "./BmiCard.css";
import DarkModeButton from './DarkModeButton';

const BmiCard = () => {

  const [bmiSectionDarkMode, setBmiSectionDarkMode] = useState(false);
  const [cardHeaderDarkMode, setCardHeaderDarkMode] = useState(false);
  const [groupBtnDarkMode, setGroupBtnDarkMode] = useState(false);
  const [bmiUserRecord, setBmiUserRecord] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const [user, setUser] = useState({
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
  };

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
      } else {
        // Append the new user record to the state
        setBmiUserRecord((prevRecords) => [...prevRecords, bmiUserData]);

        // Reset form
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

    } catch (error) {
      console.error("Error sending BMI data:", error);
    }
  };

  const reloadForm = () => {
    setUser({
      fullName: "",
      age: "",
      weight: "",
      height: "",
      bmi: "",
      bmiMessage: "",
    });
  };

  // Fetch the user data
  const getUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data/userrecord', {
        method: "GET",
      });

      if (response.ok) {
        const bmiUserRecord = await response.json();
        setBmiUserRecord(bmiUserRecord.msg);
      }
    } catch (error) {
      console.log(`Error from fetching the user data: ${error}`);
    }
  };

  const deleteUser = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`http://localhost:5000/api/data/delete/${id}`, {
          method: "DELETE",
      });

      const data = await response.json();
      console.log(`User after delete:`, data);

      if(response.ok){
        getUserData();
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
};

  useEffect(() => {
    getUserData();
  }, []);

  // Paginate the data
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = bmiUserRecord.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  

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
                      <DarkModeButton onToggle={toggleDarkMode} />
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
            {/* -----record bmi user data start here----- */}
            <div className="col-md-7">
              <div className="card">
                <div className="card-header text-center fw-bold">
                  All User Data
                </div>
                {/* -----table start here----- */}
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Age</th>
                      <th scope="col">Weight</th>
                      <th scope="col">Height</th>
                      <th scope="col">Bmi</th>
                      <th scope="col">Bmi Message</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.map((record, index) => (
                      <tr key={record.id || index}>
                        <th scope="row">{index + 1}</th> {/* Index ko 1-based banane ke liye */}
                        <td>{record.fullName}</td>
                        <td>{record.age}</td>
                        <td>{record.weight}</td>
                        <td>{record.height}</td>
                        <td>{record.bmi}</td>
                        <td>{record.bmiMessage}</td>
                        <td>
                          <button type="button" className="btn btn-danger" onClick={() => deleteUser(record._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination controls */}
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage * recordsPerPage >= bmiUserRecord.length}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
                {/* -----table end here----- */}
              </div>
            </div>
            {/* -----record bmi user data end here----- */}
          </div>
        </div>
      </section>
    </>
  );
}

export default BmiCard;
