import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CreateActorDialog from "../components/CreateActorDialog";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  }
}));

export default () => {
  const classes = useStyles();
  const [actorCreator, setActorCreator] = React.useState(false);
  const openActorCreator = () => setActorCreator(true);
  const closeActorCreator = (flag, values) => {
    setActorCreator(false);
  };

  const cards = [
    {
      title: 'ひと',
      cardinal: 1,
      image: '',
      newHandler: e => {
        openActorCreator()
      },
      listHandler: e => {
        console.log(e)
      },
    },
    {
      title: 'セル',
      cardinal: 2,
      image: '',
      newHandler: e => {
        console.log(e)
      },
      listHandler: e => {
        console.log(e)
      },
    },
    {
      title: '組織',
      cardinal: 3,
      image: '',
      newHandler: e => {
        console.log(e)
      },
      listHandler: e => {
        console.log(e)
      },
    },
    {
      title: '市場',
      cardinal: 4,
      image: '',
      newHandler: e => {
        console.log(e)
      },
      listHandler: e => {
        console.log(e)
      },
    }
  ];

  return (
    <Grid container className={classes.root} spacing={2}>
      {
        cards.map((card, index) =>
          <Grid key={index} item xs={3}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {card.title}
                </Typography>
                <Typography>
                  {card.cardinal}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={card.newHandler}>New</Button>
                <CreateActorDialog onClose={closeActorCreator} open={actorCreator}/>
                <Button size="small" onClick={card.listHandler}>View</Button>
              </CardActions>
            </Card>
          </Grid>
        )
      }
    </Grid>
  )
}
