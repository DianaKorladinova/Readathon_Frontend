import React, {useEffect} from 'react';
import './App.css';
import {Link, Outlet, useLocation} from "react-router-dom";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import {Grid, Typography} from "@mui/material";
import Modal from "./features/modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {checkConnection} from "./features/connection/connectionSlice";

function App() {
    const location = useLocation();
    const dispatch = useDispatch()
    const err = useSelector(state => state.connection.err)
    const connected = useSelector(state => state.connection.connected)
    const token = useSelector(state => state.modal.token)

    useEffect(() => {
        console.log("rechecked")
        dispatch(checkConnection())
    }, [dispatch, token])


    function renderNav() {
        if (location['pathname'] !== '/') {
            return (
                <Link style={{textDecoration: 'none'}} to={""}>
                    <Grid item direction={"row"} alignItems="center" justifyContent="center"
                          container>
                    <ArrowBackIosOutlinedIcon sx={{color: "black", fontSize: 40}}/>
                        <Typography variant="h2" display="inline" color={"black"}>Home</Typography>
                    </Grid>
                </Link>
            )
        }
        return <Typography variant="h2">Readathon</Typography>
    }

    return (
        <div className="App">
            {!connected ? <Typography mt="2em" ml="1em" variant="h2">{err.message}</Typography> :
                <>
                    <Grid container alignItems="center" direction="column" sx={{minHeight: "100vh", padding: "10vh"}}
                          justifyContent="space-around">
                        <Grid item >{renderNav()}</Grid>
                        <Grid item><Outlet/> </Grid>
                    </Grid>
                    <Modal/>
                </>
            }
        </div>
    );
}

export default App;
