import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useLocalStorage from "react-use-localstorage";
import { UserContext } from "./context/userContext";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import swal from "sweetalert";
// import TextField from "@mui/material/TextField"
import {
  Button,
  TextField,
  List,
  ListItem,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { Box } from "@mui/system";

function Students() {
  const { item, setItem } = useContext(UserContext);
  const [count, setCount] = useLocalStorage("count", 0);
  const [peopleAttend, setPeopleAttend] = useState(0);
  const [array, setArray] = useState([]);
  const [sorted, setSorted] = useState([]);
  useEffect(() => {
    setArray(JSON.parse(item));
  }, [item]);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const arr = JSON.parse(item);
    arr.push({ name: data.name, condition: "" });

    setItem(JSON.stringify(arr));
    reset();
  };

  const deleteAll = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let arr = JSON.parse(item);
        arr = [];
        setItem(JSON.stringify(arr));

        swal("Poof! Your List has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your List safe!");
      }
    });
  };

  const deleteOne = (name) => {
    let arr = JSON.parse(item);
    const filtered = arr.filter((item) => item.name !== name);
    setItem(JSON.stringify(filtered));
  };

  useEffect(() => {
    setCount(array.length);

    //////////////////from Dashboard //////////
    const sortedArr = [...array].sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });

    setSorted(sortedArr);
  }, [array]);

  const attend = (name) => {
    let people = JSON.parse(item);
    let myPerson = people.map((item) => {
      if (item.name === name) {
        item.condition = "ishere";
        return item;
      } else {
        return item;
      }
    });
    setItem(JSON.stringify(myPerson));
  };

  const notAttend = (name) => {
    let people = JSON.parse(item);

    let myPerson = people.map((item) => {
      if (item.name === name) {
        item.condition = "isnothere";
        return item;
      } else {
        return item;
      }
    });
    setItem(JSON.stringify(myPerson));
  };

  const isLate = (name) => {
    let people = JSON.parse(item);

    let myPerson = people.map((item) => {
      if (item.name === name) {
        item.condition = "islate";
        return item;
      } else {
        return item;
      }
    });
    setItem(JSON.stringify(myPerson));
  };

  useEffect(() => {
    let people = JSON.parse(item);

    let yes = people.filter(
      (item) => item.condition === "ishere" || item.condition === "islate"
    );
    setPeopleAttend(yes.length);
  }, [item]);

  const allHere = () => {
    let people = JSON.parse(item);

    let myPerson = people.map((item) => {
      item.condition = "ishere";
      return item;
    });
    setItem(JSON.stringify(myPerson));
  };
  const resetList = () => {
    let people = JSON.parse(item);

    let myPerson = people.map((item) => {
      item.condition = null;
      return item;
    });
    setItem(JSON.stringify(myPerson));
  };

  const giveMeIcon = (condition) => {
    if (condition === "ishere") {
      return <CheckCircleIcon />;
    } else if (condition === "islate") {
      return <AccessTimeIcon />;
    } else if (condition === "isnothere") {
      return <NotInterestedIcon />;
    }
  };

  ///////////////////////////////////////////

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: "30%",
          mt: 1,
          pt: 4,
          pl: 4,
          pr: 12,
          borderRight: 1,
          borderBlockColor: "gray.400",
          height: "98vh",
        }}
      >
        <h2>Number of people: {count}</h2>

        <h2>Number of people attended: {peopleAttend}</h2>

        <Button
          variant="outlined"
          onClick={allHere}
          style={{ marginTop: "10px", width: "70%" }}
        >
          All students are here today
        </Button>
        <Button
          variant="outlined"
          onClick={resetList}
          sx={{ margin: "10px 0 100px 0", width: "70%" }}
        >
          Reset the list
        </Button>

        <Typography variant="h4">Add a new person</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            type="text"
            placeholder="Name"
            {...register("name", {})}
            margin="normal"
            sx={{ width: "100%" }}
          />
          <Box sx={{ pb: 4 }}>
            <Button variant="outlined" type="submit" sx={{ width: "100%" }}>
              Add
            </Button>
          </Box>
        </form>
        <Button sx={{ width: "100%" }} variant="outlined" onClick={deleteAll}>
          Delete All Student's
        </Button>
      </Box>
      <List sx={{ width: "50%", m: 4 }}>
        {sorted.map((item, index) => {
          return (
            <ListItem
              key={index}
              sx={{
                borderBottom: 1,
                p: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p className={item.condition}>
                {" "}
                {giveMeIcon(item.condition)} {item.name}{" "}
              </p>

              <Box>
                {" "}
                <IconButton edge="end" onClick={() => notAttend(item.name)}>
                  <NotInterestedIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => attend(item.name)}>
                  <CheckCircleIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => isLate(item.name)}>
                  <AccessTimeIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => deleteOne(item.name)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default Students;
