import React, { useEffect, useState } from "react";
import API from "../utils/API";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Mylist, Mylistitem } from "../components/List";
import Button from '@material-ui/core/Button';
import SavedBook from "../components/SavedBook";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
export default function Saved() {
    const classes = useStyles();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        loadSaved();
    }, []);

    function loadSaved() {
        API.getBooks().then(res => {
            setBooks(res.data)
            console.log(res.data);
        }).catch(err => console.log(err));
    };
    function deleteBook(id) {
        // add code here to remove a book using API
        API.deleteBook(id).then(result => {
            loadSaved();
        })
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}><h1>(React) Google Books Search</h1></Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Your Saved Books:
            {books.length ? (
                            <Mylist>
                                {books.map(book => {
                                    return (
                                        <Mylistitem key={book._id}>
                                            <SavedBook img={book.image} title={book.title} authors={book.authors} bookLink={book.link} description={book.description} />
                                            <Button onClick={() => deleteBook(book._id)}>Delete</Button>
                                        </Mylistitem>
                                    );
                                })}
                            </Mylist>
                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
