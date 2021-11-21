import React, { useState } from 'react';

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const [userInfo, setUserInfo] = useState(
    {
      userName: "",
      room: '',
    }
  )
  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext);

