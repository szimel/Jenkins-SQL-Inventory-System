import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';


//first I ever made - checks auth of current user based on token - glorified true false function
const useValidation = () => {
  const token = localStorage.getItem('token') || undefined;
  if (!token) return false;
  try {
    const decoded = jwt_decode(token);
    const exp = decoded.exp;
    const currentTime = Date.now() / 1000;
    if (exp < currentTime) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

export default useValidation;
