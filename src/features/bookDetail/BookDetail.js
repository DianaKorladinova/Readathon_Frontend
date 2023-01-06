import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBookDetail} from "./bookDetailSlice";
import {useParams} from "react-router-dom";
import {fetchMonthlyChallenge} from "../monthlyChallenge/monthlyChallengeSlice";

export function BookDetail() {
    let {bookId} = useParams();
    bookId = Number(bookId)
    const books = useSelector(state => state.challenge.books)
    const dispatch = useDispatch()
    useEffect(() => {
        if (books.length===0) {
            dispatch(fetchMonthlyChallenge())
            console.log("here")
        } else {
            console.log("then here?", books)
           dispatch(fetchBookDetail(books[bookId]))
        }
    }, [bookId, books, dispatch])
    return (
        <>
            Ahoj
            {/*{book ? book.title : "nic"}*/}
        </>

    );
}
