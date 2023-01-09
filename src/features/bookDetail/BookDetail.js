import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchBookDetail} from './bookDetailSlice'
import {useParams} from 'react-router-dom'
import {fetchMonthlyChallenge,} from '../monthlyChallenge/monthlyChallengeSlice'
import {CircularProgress, Grid, Paper, Typography} from '@mui/material'

export function BookDetail() {
    let {bookId} = useParams()
    bookId = Number(bookId)
    const books = useSelector(state => state.challenge.books)
    const bookDetail = useSelector(state => state.book.bookDetail)
    const status = useSelector(state => state.book.status)
    const dispatch = useDispatch()
    useEffect(() => {
        if (books.length === 0) {
            dispatch(fetchMonthlyChallenge())
        } else {
            dispatch(fetchBookDetail(books[bookId]))
        }
    }, [bookId, books, dispatch])

    function renderDetail() {
        if (bookDetail && status === 'idle') {
            return (<div className="BookDetail">
                <Paper
                    sx={{
                        p: 5, margin: 'auto', maxWidth: 500, flexGrow: 1, backgroundColor: '#fff',
                    }}
                >
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
