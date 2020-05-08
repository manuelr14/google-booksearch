import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

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

// This file exports both the List and ListItem components

export function Mylist({ children }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>{ children }</List>
  );
}

export function Mylistitem({ children }) {
  return <ListItem alignItems="flex-start">{ children }</ListItem>;
}