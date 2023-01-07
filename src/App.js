import React from 'react';
import './App.css';
import {Link, Outlet, useLocation} from "react-router-dom";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import {Fab, Grid, Typography} from "@mui/material";

function App() {
    let location = useLocation();

    function renderNav() {
        if (location['pathname'] !== '/')
            return <Link to={""}><ArrowBackIosOutlinedIcon sx={{color: "black", fontSize: 50}}/></Link>
        return <Typography variant="h2">Readathon</Typography>
    }

    return (
        <div className="App">
            <Grid container alignItems="center" direction="column" sx={{minHeight: "100vh", padding: "10vh"}}
                  justifyContent="space-between">
                <Grid item>{renderNav()}</Grid>
                <Grid item><Outlet/> </Grid>
            </Grid>
            <Fab color="primary" sx={{position:"fixed", bottom:"2em", right:"2em"}} aria-label="login">
                <PersonRoundedIcon />
            </Fab>
        </div>
    );
}

export default App;
