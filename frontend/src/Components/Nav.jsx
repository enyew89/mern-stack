import React from 'react'
import { Link } from 'react-router';
import { PlusIcon } from "lucide-react";



function NavBar() {
  return (
    <header>
        <div>
            <div className="navbar bg-base-100 px-8 py-4 shadow-md flex justify-between" >
                <h1 className="text-2xl font-bold">Note App</h1>
                <Link to="/create" className=''><button className='btn btn-primary '> <PlusIcon />Create</button></Link>
            </div>
        </div>
    </header>
  )
}

export default NavBar;