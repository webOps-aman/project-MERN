import React, { useEffect, useState } from 'react'

const ShowData = () => {

  const [record, setRecord] = useState([]);

  const getShowData = async () => {
    try {
      const response = await fetch("http://localhost:4000/showdata",{
        method: "GET"
      });
      
      if(response.ok){
        const showDataRecord = await response.json();
        setRecord(showDataRecord.msg)
      }
    } catch (error) {
      console.log(`Error from fetching the user data: ${error}`);
    }
  }

  useEffect(() => {
    getShowData();
  },[])

  return (
    <>
      <section className='showdata-section'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 my-5'>
              <h3 className='text-center'>All Register User Data</h3>
            </div>
            <div className='col-md-12'>
{/* -----showdata table start here----- */}
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Email</th>
                    <th scope="col">City</th>
                    <th scope="col">Pincode</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">occupation</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    record.map((rec, index) => (
                      <tr key={rec.id || index}>
                        <th scope="row">{index + 1}</th>
                        <td>{rec.fullname}</td>
                        <td>{rec.age}</td>
                        <td>{rec.email}</td>
                        <td>{rec.city}</td>
                        <td>{rec.pincode}</td>
                        <td>{rec.phonenumber}</td>
                        <td>{rec.occupation}</td>
                      </tr>
                    ))
                  }
                    
                  </tbody>
                </table>
{/* -----showdata table end here----- */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ShowData