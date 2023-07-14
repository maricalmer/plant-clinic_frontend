import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlantWilt } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../utils/constants';

const Header = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div className="ubuntu bg-lime-950 h-70 py-8 sm:sticky sm:top-0 sm:z-10 sm:flex sm:justify-between sm:h-20 sm:p-0">
      <div className="sm:flex sm:items-center">
        <div className="mx-auto w-fit sm:mx-0 sm:ml-6 flex items-center">
          <FontAwesomeIcon className="text-4xl text-lime-500" icon={faPlantWilt} />
          <Link to="/" className="no-underline">
            <div className="text-lime-500 text-2xl font-medium ml-2">Plant Clinic</div>
          </Link>
        </div>
        <div className="ml-6 flex items-center sm:ml-10 h-20">
          <Link
            to="/search"
            className="font-light h-20 pt-7 text-lime-100 text-xl no-underline border-solid border-b-2 border-lime-950 hover:border-lime-300 hover:text-lime-300"
          >
            Search
          </Link>
        </div>
        {authToken && (
          <div className="ml-6 flex items-center h-20">
            <Link
              to="/create"
              className="font-light h-20 pt-7 text-lime-100 text-xl no-underline border-solid border-b-2 border-lime-950 hover:border-lime-300 hover:text-lime-300"
            >
              Submit
            </Link>
          </div>
        )}
      </div>
      <div className="flex items-center text-lime-700 ml-6 mt-4 sm:mr-6 sm:mt-0">
        {authToken ? (
          <div
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              navigate(`/`);
            }}
            className="cursor-pointer"
          >
            logout
          </div>
        ) : (
          <Link
            to="/login"
              className="ml1 no-underline cursor-pointer"
          >
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
