import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchMonthlyChallenge,} from './monthlyChallengeSlice';
import styles from './MonthlyChallenge.module.css';
import {Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";

export function MonthlyChallenge() {
    const dispatch = useDispatch();
    const books = useSelector(state => state.challenge.books)
    useEffect(() => {
        dispatch(fetchMonthlyChallenge())
    }, [dispatch])

    let renderBooks = (books) => {
        console.log(books)
        return books.map((book, index) => {

            return (<Grid key={index} item style={{display: 'flex'}}>
                    <Card style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
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
                            <Button size="small">More Info</Button>
                        </CardActions>
                    </Card></Grid>
            )
        })
    }

    return (
        <Grid container spacing={2} alignItems="stretch" className={styles.cont}>
            {renderBooks(books)}
        </Grid>
    );
}
