import React, {useEffect, useState} from 'react';
import {
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    Radio,
    RadioGroup
} from "@mui/material";
import {FormContainer, TextFieldElement} from "react-hook-form-mui";
import {useDispatch, useSelector} from "react-redux";
import {search, upload} from "./bookUploadSlice";
import {useNavigate} from "react-router-dom";

function BookUpload() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const arr = useSelector(state => state.upload.searchResults)
    const status = useSelector(state => state.upload.status)
    const ok = useSelector(state => state.upload.ok)
    const logged = useSelector(state => state.connection.logged)
    const [selected, setSelected] = useState(-1)
    const [questionValues, setQuestionValues] = useState({});
    const [correct, setCorrect] = useState([]);

    useEffect(() => {
        if (ok || !logged) navigate('/')
    }, [logged, ok, navigate]);


    const searchTitle = (data) => {
        dispatch(search(data.title))
    }

    function selectWork(event, id) {
        setSelected(id)
    }

    const showResults = () => {
        if (status !== 'idle') return <Grid container justifyContent="center"> <CircularProgress
            color="inherit"/></Grid>
        const rows = arr.map((res, index) => (<ListItem key={index} disablePadding>
            <ListItemButton>
                <ListItemText onClick={event => selectWork(event, index)} primary={res.title}/>
            </ListItemButton>
        </ListItem>))
        return <List>{rows}</List>
    }

    const selectForm = <FormContainer onSuccess={searchTitle}>
        <TextFieldElement name="title" label="Title" fullWidth required/>
        <Grid container mt={1} justifyContent="right">
            <Button type="submit">Search</Button>
        </Grid>
        {showResults()}
    </FormContainer>;

    function handleCorrect(event, index) {
        let arr = [...correct]
        arr[index] = Number(event.target.value)
        setCorrect([...arr])
    }

    function loadAnswers() {
        return Object.keys(questionValues).map((key, index) => {
            return (
                <Grid item key={`question${index}`}>
                    <Grid container alignContent={"center"} justifyContent={"center"} spacing={1.5}>
                        <Grid xs={12} item><TextFieldElement name={`q.${key}.name`} label="Question" fullWidth
                                                             required/></Grid>
                        <Grid xs={10} item><TextFieldElement name={`q.${key}.a1`} label="Answer #1" fullWidth
                                                             required/></Grid>
                        <Grid xs={10} item><TextFieldElement name={`q.${key}.a2`} label="Answer #2" fullWidth
                                                             required/></Grid>
                        <Grid xs={10} item><TextFieldElement name={`q.${key}.a3`} label="Answer #3" fullWidth
                                                             required/></Grid>
                    </Grid>
                    <FormLabel>Correct answer:</FormLabel>
                    <RadioGroup row
                                value={correct[index]}
                                onChange={(event) => handleCorrect(event, index)}>
                        {Object.keys(questionValues[key])
                            .slice(1)
                            .map((keyA, indexA) => <FormControlLabel value={indexA} key={keyA} control={<Radio/>}
                                                                     label={keyA}/>)}
                    </RadioGroup>
                </Grid>)
        })
    }

    function addQuestion() {
        const num = Object.keys(questionValues).length + 1
        setQuestionValues({...questionValues, [`question${num}`]: {name: '', a1: '', a2: '', a3: ''}})
        let arr = [...correct]
        arr.push(0)
        setCorrect(arr)
    }

    function uploadBook(data) {
        const result = {
            title: data.titleBook,
            author: data.authorBook,
            ISBN: data.ISBNBook,
            questions: Object.values(data.q).map((q, index) => {
                return {
                    question: q.name, correct: correct[index], answers: [q.a1, q.a2, q.a3]
                }
            })
        }
        dispatch(upload(result))
    }

    const uploadForm = () => {
        const el = arr[selected]
        let defaultValues = {
            titleBook: el.title, authorBook: el.author_name.join(", "), ISBNBook: el.key.slice(7), q: questionValues
        };
        return (<FormControl>
            <FormContainer defaultValues={defaultValues} onSuccess={uploadBook}>
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        <Grid container spacing={1.5}>
                            <Grid xs={12} item><TextFieldElement name="titleBook" label="Book Title" fullWidth
                                                                 required/></Grid>
                            <Grid sm={6} item><TextFieldElement name="authorBook" label="Book Author" fullWidth
                                                                required/></Grid>
                            <Grid sm={6} item><TextFieldElement name="ISBNBook" label="ISBN" fullWidth
                                                                required/></Grid>

                        </Grid>
                        <Button onClick={addQuestion}>Add Question</Button>
                    </Grid>
                    {loadAnswers()}
                </Grid>
                <Button type="submit">Submit</Button>
            </FormContainer>
        </FormControl>)
    }


    return (<Paper sx={{p: 5, margin: 'auto', maxWidth: 500, flexGrow: 1, backgroundColor: '#fff'}}>
        {selected > -1 ? uploadForm() : selectForm}
    </Paper>);
}

export default BookUpload;