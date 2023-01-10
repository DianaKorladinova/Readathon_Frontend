import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {BookDetail} from "./features/bookDetail/BookDetail";
import {MonthlyChallenge} from "./features/monthlyChallenge/MonthlyChallenge";
import BookUpload from "./features/bookUpload/bookUpload";

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <MonthlyChallenge/>,
            },
            {
                path: "book/:bookId",
                element: <BookDetail/>,
            },
            {
                path: "add",
                element: <BookUpload/>,
            },
        ],
    },
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
