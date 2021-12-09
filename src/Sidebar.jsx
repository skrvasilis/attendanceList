import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "./context/userContext";
import { useForm } from "react-hook-form";

export default function SideBar({ allHere, resetList, deleteAll }) {
  const [state, setState] = React.useState({ left: false });
  const { setItem, item, peopleAttend, count } = React.useContext(UserContext);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const arr = JSON.parse(item);
    if (data.name !== "") {
      arr.push({ name: data.name, condition: "" });

      setItem(JSON.stringify(arr));
    }

    reset();
  };

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ left: open });
  };

  const list = (anchor) => (
    <Box>
     <div className="slideBar">
        <h3>Number of people: {count}</h3>
        <h3>Number of people attended: {peopleAttend}</h3>

        <button className="btn" onClick={allHere}>
          All students are here today
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
          Delete All Student's
        </button>
      </div>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <button className="slideButton" onClick={toggleDrawer("left", true)}>
          <MenuIcon></MenuIcon>
        </button>
        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
