import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export default function validationHook() {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    try {
      const decoded = jwt_decode(token);
      const exp = decoded.exp;
      const currentTime = Date.now() / 1000;
      if (exp < currentTime) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return isValid;
}
