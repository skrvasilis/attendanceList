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
import { Box, height } from "@mui/system";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import SideBar from "./Sidebar";

function Students() {
  const {
    item,
    setItem,
    count,
    setCount,
    peopleAttend,
    setPeopleAttend,
    array,
    setArray,
    sorted,
    setSorted,
  } = useContext(UserContext);
  useEffect(() => {
    setArray(JSON.parse(item));
  }, [item]);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const arr = JSON.parse(item);
    if (data.name !== "") {
      arr.push({ name: data.name, condition: "" });

      setItem(JSON.stringify(arr));
    }

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
    const yesArr = [];
    const other = [];
    for (let i of array) {
      if (i.condition === "ishere") {
        yesArr.push(i);
      } else {
        other.push(i);
      }
    }

    const sortedYes = yesArr.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });

    const sortedOther = other.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });

    const concatArr = sortedYes.concat([...sortedOther]);

    setSorted(concatArr);
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

  ////////////////////////////////////////////////////////////////////
  return (
    <main style={{ display: "flex" }}>
      <div className="leftCotainer">
        <h3>Number of people: {count}</h3>
        <h3>Number of people attended: {peopleAttend}</h3>

        <button className="btn" onClick={allHere}>
          All are here today
        </button>
        <button className="btn" onClick={resetList}>
          Reset the list
        </button>

        <h3>Add a new person</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            label="Name"
            type="text"
            placeholder="Name"
            {...register("name", {})}
            margin="normal"
          />

          <button type="submit">Add</button>
        </form>
        <button className="btn" onClick={deleteAll}>
          Delete Everyone
        </button>
      </div>

      <List className="listContainer" sx={{ m: 4 }}>
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
               
                <IconButton
                  edge="end"
                  className="icon"
                  title="person is attending"

                  onClick={() => attend(item.name)}
                >
                  <CheckCircleIcon />
                </IconButton>
                <IconButton
                  className="icon"
                  edge="end"
                  title="person is not attending"

                  onClick={() => notAttend(item.name)}
                >
                  <NotInterestedIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  title="person is late"
                  onClick={() => isLate(item.name)}
                >
                  <AccessTimeIcon />
                </IconButton>
                <IconButton
                  title="delete person"
                  edge="end"
                  size="small"
                  onClick={() => deleteOne(item.name)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          );
        })}
      </List>
      <SideBar allHere={allHere} resetList={resetList} deleteAll={deleteAll} />
    </main>
  );
}

export default Students;
