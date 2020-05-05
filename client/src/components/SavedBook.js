import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

function SavedBook(props) {
    const classes = useStyles();

    return (
        <div>
            <ListItemAvatar>
                <Avatar alt="book" src={props.img} />
            </ListItemAvatar>
            <ListItemText
                primary={props.title}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {props.authors && props.authors.length > 0 ? props.authors.join(" & ") : ""}
                            <br />
                            {props.description}
                        </Typography>
                        <a href={props.bookLink}>{props.bookLink}</a>
                    </React.Fragment>
                }
            />
        </div>
    )
}


export default SavedBook;