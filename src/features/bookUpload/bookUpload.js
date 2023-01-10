import React from 'react';
import {Button, CircularProgress, Grid, List, ListItem, ListItemButton, ListItemText, Paper} from "@mui/material";
import {FormContainer, TextFieldElement} from "react-hook-form-mui";
import {useDispatch, useSelector} from "react-redux";
import {search} from "./bookUploadSlice";

function BookUpload() {

    const dispatch = useDispatch()
    const arr = useSelector(state => state.upload.searchResults)
    const status = useSelector(state => state.upload.status)

    const searchTitle = (data) => {
        dispatch(search(data.title))
    }

    function selectWork(event) {
        console.log(event.target.dataset);
        console.log(arr[event.target.dataset.id])
    }

    const showResults = () => {
        if (status !== 'idle') return <Grid container justifyContent="center"> <CircularProgress color="inherit"/></Grid>
        const rows = arr.map((res, index) => (
            <ListItem key={index} disablePadding>
                <ListItemButton>
                    <ListItemText onClick={selectWork} data-id={index} primary={res.title}/>
                </ListItemButton>
            </ListItem>
        ))
        return <List>{rows}</List>
    }

    return (
        <Paper sx={{p: 5, margin: 'auto', maxWidth: 500, flexGrow: 1, backgroundColor: '#fff'}}>
            <FormContainer onSuccess={searchTitle}>
                <TextFieldElement name="title" label="Title" fullWidth required/>
                <Grid container mt={1} justifyContent="right">
                    <Button type="submit">Search</Button>
                </Grid>
                {showResults()}
            </FormContainer>
        </Paper>
    );
}

export default BookUpload;