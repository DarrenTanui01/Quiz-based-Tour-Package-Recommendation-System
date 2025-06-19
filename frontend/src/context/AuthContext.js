import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [traveler, setTraveler] = useState(null); // { id, name, email }
  const [token, setToken] = useState(null);

  const login = (travelerData, jwtToken) => {
    setTraveler(travelerData);
    setToken(jwtToken);
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('traveler', JSON.stringify(travelerData));
  };

  const logout = () => {
    setTraveler(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('traveler');
  };

  // On mount, restore from localStorage
  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedTraveler = localStorage.getItem('traveler');
    if (storedToken && storedTraveler) {
      setToken(storedToken);
      setTraveler(JSON.parse(storedTraveler));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ traveler, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}