import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchBookDetail, verifyWin} from './bookDetailSlice'
import {useNavigate, useParams} from 'react-router-dom'
import {fetchMonthlyChallenge,} from '../monthlyChallenge/monthlyChallengeSlice'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Accordion, AccordionDetails, AccordionSummary, FormControlLabel, Radio, RadioGroup} from '@mui/material'
import {Button, CircularProgress, Grid, Paper, Typography} from '@mui/material'

export function BookDetail() {
    let {bookId} = useParams()
    bookId = Number(bookId)
    const books = useSelector(state => state.challenge.books)
    const bookDetail = useSelector(state => state.book.bookDetail)
    const status = useSelector(state => state.book.status)
    const eligible = useSelector(state => state.book.eligible)
    const logged = useSelector(state => state.connection.logged)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        if (books.length === 0) {
            dispatch(fetchMonthlyChallenge())
        } else {
            dispatch(fetchBookDetail(books[bookId]))
        }
    }, [bookId, books, dispatch])

    useEffect(() => {
        if (eligible) {
            navigate('/add')
        }
    }, [eligible, navigate])

    const [valRadio, setValRadio] = useState([null, null, null]);
    const handleChange = (index, event) => {
        const arr = [...valRadio]
        arr[index] = event.target.value
        setValRadio(arr)
    }

    const checkAnswers = () => {
        const answers = books[bookId].questions.map(q => q.correct)
        let correct = true
        for (const answer in answers) {
            if (Number(valRadio[answer]) !== answers[answer]) {
                correct = false
                break
            }
        }
        // localStorage.setItem(`answered${bookId}`, "yes")
        if (correct) {
            dispatch(verifyWin())
        }
    }

    function renderQuestions() {
        if (!logged || !books[bookId] || localStorage.getItem(`answered${bookId}`)) return;
        const qs = books[bookId].questions.map((q, index) => {
            const as = q.answers.map((answer, i) =>
                <FormControlLabel key={i} value={i} control={<Radio/>} label={answer}/>)
            return (
                <Accordion key={index + `Q`}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Question {index + 1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {q.question}
                        </Typography>
                        <RadioGroup value={valRadio[index]} onChange={event => handleChange(index, event)}>
                            {as}
                        </RadioGroup>
                    </AccordionDetails>
                </Accordion>
            )
        })
        return (
            <Grid mt={2}>
                {qs}
                <Button onClick={checkAnswers}>Submit answers</Button>
            </Grid>
        )
    }

    function renderDetail() {
        if (bookDetail && status === 'idle') {
            return (<div className="BookDetail">
                <Paper sx={{p: 5, margin: 'auto', maxWidth: 500, flexGrow: 1, backgroundColor: '#fff'}}>
                    <Grid container spacing={2}>
                        <Grid item sx={{width: 200, height: 300}}>
                            <img style={{maxHeight: "100%", maxWidth: "100%"}} alt="complex"
                                 src="https://ia800606.us.archive.org/view_archive.php?archive=/32/items/olcovers642/olcovers642-L.zip&file=6425240-L.jpg"/>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {bookDetail.title}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Author: {books[bookId].author}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Physical Format: {bookDetail.physical_format}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Publish Date: {bookDetail.publish_date}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Publisher: {bookDetail.publishers}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="text.secondary">
                                        ISBN: {bookDetail.isbn_13}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {renderQuestions()}
                </Paper>
            </div>)
        } else {
            return <CircularProgress color="inherit"/>
        }
    }

    return (<>
            {renderDetail()}
        </>

    )
}
