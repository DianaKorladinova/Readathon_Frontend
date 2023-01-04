import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchMonthlyChallenge,} from './monthlyChallengeSlice';
import styles from './MonthlyChallenge.module.css';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

export function MonthlyChallenge() {
    const dispatch = useDispatch();
    const books = useSelector(state => state.challenge.books)
    useEffect(() => {
        dispatch(fetchMonthlyChallenge())
    }, [dispatch])

    let renderBooks = (books) => {
        console.log(books)
        return books.map((book, index) => {

            return (
                <Card key={index} sx={{maxWidth: 345}}>
                    {/*<CardMedia*/}
                    {/*    sx={{height: 140}}*/}
                    {/*    image="/static/images/cards/contemplative-reptile.jpg"*/}
                    {/*    title="green iguana"*/}
                    {/*/>*/}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {book.title}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            {book.author}
                        </Typography>
                        {book.ISBN}
                    </CardContent>
                    <CardActions>
                        <Button size="small">I'm done</Button>
                    </CardActions>
                </Card>
            )
        })
    }

    return (<div>
        <div className={styles.row}>
            {renderBooks(books)}
        </div>
    </div>);
}
