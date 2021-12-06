import { createContext, useState } from "react";
import useLocalStorage from "react-use-localstorage";


export const UserContext = createContext()


export const UserContextProvider = (props) => {

    const [students, setStudents] = useState([]);
  const [item, setItem] = useLocalStorage("name", JSON.stringify([]));




    return <UserContext.Provider value = {{students ,setStudents , item, setItem}}>
        {props.children}
    </UserContext.Provider>
}