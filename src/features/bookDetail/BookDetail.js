import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookDetail } from './bookDetailSlice'
import { useParams } from 'react-router-dom'
import {
    fetchMonthlyChallenge,
} from '../monthlyChallenge/monthlyChallengeSlice'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

export function BookDetail () {
    let { bookId } = useParams()
    bookId = Number(bookId)
    const books = useSelector(state => state.challenge.books)
    const bookDetail = useSelector(state => state.book.bookDetail)
    const dispatch = useDispatch()
    useEffect(() => {
        if (books.length === 0) {
            dispatch(fetchMonthlyChallenge())
        } else if (!bookDetail) {
            dispatch(fetchBookDetail(books[bookId]))
        }
    }, [bookId, books, dispatch])

    function renderDetail () {
        if (bookDetail) {
            console.log(bookDetail)
            return (
                <div className="BookDetail">
                    <Typography variant="h3" mt={3}>{bookDetail.title}</Typography>,
                    <br/><br/>
                    <Card sx={{ maxWidth: 645 }}>
                        <CardMedia
                            sx={{ width: 250, height: 350 }}
                            image="https://ia800606.us.archive.org/view_archive.php?archive=/32/items/olcovers642/olcovers642-L.zip&file=6425240-L.jpg"
                            title="Book Cover"
                        />
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }}>Book Details</Typography>
                            <Typography>Author: {books[bookId].author}</Typography>
                            <Typography>ISBN: {bookDetail.isbn_13}</Typography>
                            <Typography>Physical Format: {bookDetail.physical_format}</Typography>
                            <Typography>Publish Date: {bookDetail.publish_date}</Typography>
                            <Typography>Publishers: {bookDetail.publishers}</Typography>
                        </CardContent>
                    </Card>
                    {/*<Paper elevation={12} style={{ margin: "0px 0px 8px 0px", border: "1px solid black" }}>*/}
                    {/*    <Typography variant="h3" mt={3}>{bookDetail.title}</Typography>,*/}
                    {/*    <br/><br/>*/}
                    {/*    <Typography sx={{ fontSize: 26 }}>Book Details</Typography>*/}
                    {/*    <Typography sx={{ fontSize: 20 }}>ISBN: {bookDetail.isbn_13}</Typography>*/}
                    {/*    <Typography sx={{ fontSize: 20 }}>Physical Format: {bookDetail.physical_format}</Typography>*/}
                    {/*    <Typography sx={{ fontSize: 20 }}>Publish Date: {bookDetail.publish_date}</Typography>*/}
                    {/*    <Typography sx={{ fontSize: 20 }}>Publishers: {bookDetail.publishers}</Typography>*/}
                    {/*</Paper>*/}
                </div>
            )
        }
    }

    return (
        <>
            {renderDetail()}
            {/*{bookDetail? bookDetail["isbn_10"]:"a"}*/}
        </>

    )
}
