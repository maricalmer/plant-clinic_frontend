import React, { useEffect, useState } from 'react';
import { Bus } from '../utils/bus';

const Flash = () => {
  let [visibility, setVisibility] = useState(true);

  useEffect(() => {
    Bus.addListener('flash', () => {
      setVisibility(true);
      setTimeout(() => {
        setVisibility(false);
      }, 100000);
    });
  }, []);

  return (
    visibility && <div className="p-3">
      <strong>Image uploading, refresh the page in few seconds!</strong>
    </div>
  )
}

export default Flash;
