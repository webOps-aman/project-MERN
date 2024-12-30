import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        <section className='navbar-section'>
            <div className='container navbar-container'>
                <div className='row navbar-row'>
                    <div className='col-md-12'>
{/* -----navbar start here----- */}
                        <nav className="navbar navbar-expand-lg bg-body-tertiary">
                            <div className="container-fluid">
                                <NavLink className="navbar-brand" to="#">Simple Form</NavLink>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 offset-md-7">
                                        <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/">Registration Form</NavLink>
                                        </li>
                                        <li className="nav-item">
                                        <NavLink className="nav-link" to="/showdata">Show Data</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
{/* -----navbar end here----- */}
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Navbar