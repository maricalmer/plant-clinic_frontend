import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'

const NoMatch = () => {
  return (
    <div>
      <div className="merriweather container mx-auto h-[calc(100vh-4rem)] flex items-center justify-center">
        <div>
          <FontAwesomeIcon className="text-9xl text-lime-900" icon={faLeaf} />
          <h1 className="text-center text-4xl mt-4 font-bold">404</h1>
          <p className="text-center font-light">Page not found</p>
        </div>
      </div>
    </div>
  );
};

export default NoMatch;
