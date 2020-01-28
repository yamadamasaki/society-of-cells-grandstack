import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CreateActorDialog from "../components/CreateActorDialog";
import CreateMarketDialog from "../components/CreateMarketDialog";

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

export default (props) => {
  const classes = useStyles(props);
  const [actorCreator, setActorCreator] = React.useState(false);
  const [marketCreator, setMarketCreator] = React.useState(false);

  const cards = [
    {
      title: 'ひと',
      cardinal: 1,
      image: '',
      newHandler: _ => setActorCreator(true),
      listHandler: e => {
        console.log(e)
      },
      dialog: <CreateActorDialog onClose={() => setActorCreator(false)} open={actorCreator}/>
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
      newHandler: _ => setMarketCreator(true),
      listHandler: e => {
        console.log(e)
      },
      dialog: <CreateMarketDialog onClose={() => setMarketCreator(false)} open={marketCreator}/>,
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
                {card.dialog}
                <Button size="small" onClick={card.listHandler}>View</Button>
              </CardActions>
            </Card>
          </Grid>
        )
      }
    </Grid>
  )
}
