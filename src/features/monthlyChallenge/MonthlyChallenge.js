import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchMonthlyChallenge,} from './monthlyChallengeSlice';
import {Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";

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
                    <Card style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
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
                            <Button size="small" component={Link} to={`/books/${index}`}>
                                More Info
                            </Button>
                        </CardActions>
                    </Card></Grid>
            )
        })
    }

    return (
        <Grid container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{minHeight: '100%', width: '75%', margin: 'auto'}}>
            <Grid container spacing={2} alignItems="stretch">
                {renderBooks(books)}
            </Grid>
        </Grid>
    );
}
