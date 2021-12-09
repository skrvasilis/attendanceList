import { createContext, useState } from "react";
import useLocalStorage from "react-use-localstorage";


export const UserContext = createContext()


export const UserContextProvider = (props) => {

    const [students, setStudents] = useState([]);
  const [item, setItem] = useLocalStorage("name", JSON.stringify([]));
  // const { item, setItem } = 
  const [count, setCount] = useLocalStorage("count", 0);
  const [peopleAttend, setPeopleAttend] = useState(0);
  const [array, setArray] = useState([]);
  const [sorted, setSorted] = useState([]);




    return <UserContext.Provider value = {{students ,setStudents , item, setItem , count,setCount,peopleAttend,setPeopleAttend,array,setArray,sorted,setSorted}}>
        {props.children}
    </UserContext.Provider>
}