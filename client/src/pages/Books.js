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
function Books() {
  const classes = useStyles();
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

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

  // Load all books and store them with setBooks
  // useEffect(() => {
  //   loadBooks()
  // }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    // if (formObject.title && formObject.author) {
    //   API.saveBook({
    //     title: formObject.title,
    //     author: formObject.author,
    //     synopsis: formObject.synopsis
    //   })
    //     .then(res => loadBooks())
    //     .catch(err => console.log(err));
    // }
    console.log(formObject);
    bookSearch();
  };

  function storeBook(bookNum) {
    const targetBook = books[bookNum];
    console.log(targetBook);
    API.saveBook(targetBook).then(res => {
      console.log(res);
    }).catch(err => console.log(err))
  }

    return (
  //     <Container fluid>
  //       <Row>
  //         <Col size="md-6">
  //           <Jumbotron>
  //             <h1>What Books Should I Read?</h1>
  //           </Jumbotron>
  //           <form>
  //             <Input
  //               onChange={handleInputChange}
  //               name="title"
  //               placeholder="Title (required)"
  //             />
  //             <Input
  //               onChange={handleInputChange}
  //               name="author"
  //               placeholder="Author (required)"
  //             />
  //             <TextArea
  //               onChange={handleInputChange}
  //               name="synopsis"
  //               placeholder="Synopsis (Optional)"
  //             />
  //             <FormBtn
  //               disabled={!(formObject.author && formObject.title)}
  //               onClick={handleFormSubmit}
  //             >
  //               Submit Book
  //             </FormBtn>
  //           </form>
  //         </Col>
  //         <Col size="md-6 sm-12">
  //           <Jumbotron>
  //             <h1>Books On My List</h1>
  //           </Jumbotron>
  //           {books.length ? (
  //             <List>
  //               {books.map(book => (
  //                 <ListItem key={book._id}>
  //                   <Link to={"/books/" + book._id}>
  //                     <strong>
  //                       {book.title} by {book.author}
  //                     </strong>
  //                   </Link>
  //                   <DeleteBtn onClick={() => deleteBook(book._id)} />
  //                 </ListItem>
  //               ))}
  //             </List>
  //           ) : (
  //             <h3>No Results to Display</h3>
  //           )}
  //         </Col>
  //       </Row>
  //     </Container>
  //   );
  // }

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


export default Books;
