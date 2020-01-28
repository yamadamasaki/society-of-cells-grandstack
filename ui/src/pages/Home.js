import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CreateActorDialog from "../components/CreateActorDialog";
import CreateCellDialog from "../components/CreateCellDialog";
import CreateOrganizationDialog from "../components/CreateOrganizationDialog";
import CreateMarketDialog from "../components/CreateMarketDialog";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 275,
    margin: 5,
  },
  title: {
    fontSize: 14,
  }
}));

const NodeAndEdgeCard = props => {
  const classes = useStyles(props);
  const content = props.card

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {content.title}
        </Typography>
        <Typography>
          {content.cardinal}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={content.newHandler}>New</Button>
        {content.dialog}
        <Button size="small" onClick={content.listHandler}>View</Button>
      </CardActions>
    </Card>
  )
}


export default (props) => {
  const classes = useStyles(props);
  const [actorCreator, setActorCreator] = React.useState(false);
  const [cellCreator, setCellCreator] = React.useState(false);
  const [organizationCreator, setOrganizationCreator] = React.useState(false);
  const [marketCreator, setMarketCreator] = React.useState(false);

  const nodes = [
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
      newHandler: _ => setCellCreator(true),
      listHandler: e => {
        console.log(e)
      },
      dialog: <CreateCellDialog onClose={() => setCellCreator(false)} open={cellCreator}/>
    },
    {
      title: '組織',
      cardinal: 3,
      image: '',
      newHandler: _ => setOrganizationCreator(true),
      listHandler: e => {
        console.log(e)
      },
      dialog: <CreateOrganizationDialog onClose={() => setOrganizationCreator(false)} open={organizationCreator}/>
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

  const edges = [
    /*
    {
      title: '約束',
      cardinal:5,
      image: '',
      newHandler: _ => setMarketCreator(true),
      listHandler: e => {
        console.log(e)
      },
      dialog: <CreateMarketDialog onClose={() => setMarketCreator(false)} open={marketCreator}/>,
    },
    {
      title: '契約',
      cardinal: 6,
      image: '',
      newHandler: _ => setOrganizationCreator(true),
      listHandler: e => {
        console.log(e)
      },
      dialog: <CreateOrganizationDialog onClose={() => setOrganizationCreator(false)} open={organizationCreator}/>
    }
    */
  ]

  return (
    <Grid container>
      <Grid container className={classes.root} spacing={2}>
        {
          nodes.map((card, index) =>
            <Grid key={index} item xs={3}>
              <NodeAndEdgeCard card={card}/>
            </Grid>
          )
        }
      </Grid>
      <Grid container className={classes.root} spacing={2}>
        {
          edges.map((card, index) =>
            <React.Fragment key={index}>
              <Grid item xs={1}></Grid>
              <Grid item xs={3}>
                <NodeAndEdgeCard card={card}/>
              </Grid>
            </React.Fragment>
          )
        }
      </Grid>
    </Grid>
  )
}
