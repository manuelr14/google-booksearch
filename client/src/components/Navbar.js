import React, { useState } from "react";
import SavedBook from "../components/SavedBook";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Mylist, Mylistitem } from "../components/List";
import GoogleApi from "../utils/GoogleAPI";
import API from "../utils/API";

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
export default function Books() {
  const classes = useStyles();
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState("")

  function bookSearch() {
    GoogleApi.findBooks(formObject).then(results => {

      setBooks(results.data.items.map(book => {
        return {
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          link: book.volumeInfo.infoLink,
          image: book.volumeInfo.imageLinks.thumbnail
        }
      }));
    }).catch(err => setBooks([]))
  }

  function handleInputChange({ target }) {
    setFormObject(target.value);
    // add code to control the components here
  }

  function handleFormSubmit(event) {
    // add code here to post a new book to the api
    event.preventDefault();
    console.log(formObject);
    bookSearch();
  }

  function storeBook(bookNum) {
    const targetBook = books[bookNum];
    console.log(targetBook);
    API.saveBook(targetBook).then(res => {
      console.log(res);
    }).catch(err => console.log(err))
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}><h1>(React) Google Books Search</h1></Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Book Search
          <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                label="Standard"
                name="SearchTerm"
                placeholder="Search Term"
                onChange={handleInputChange} />
              <Button
                disabled={formObject === ""}
                onClick={handleFormSubmit}
                variant="contained"
                color="primary">
                Search
            </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1>Results:</h1>
            {books.length ? (
              <Mylist>
                {books.map((book, index) => {
                  return (
                    <Mylistitem key={index}>
                      <SavedBook img={book.image} title={book.title} authors={book.authors} bookLink={book.link} description={book.description} />
                      <Button
                        onClick={() => storeBook(index)}
                        variant="contained"
                        color="secondary">
                        Save
                        </Button>
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
  );
}