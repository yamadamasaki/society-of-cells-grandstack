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
import CreateCommitmentDialog from "../components/CreateCommitmentDialog";
import CreateContractDialog from "../components/CreateContractDialog";
import NeoGraph from "../components/NeoGraph";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {useSnackbar} from "notistack";
import LinearProgress from "@material-ui/core/LinearProgress";
import {all, any, values} from "ramda";

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
  const content = props.card;

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
};

export default (props) => {
  const classes = useStyles(props);
  const [actorCreator, setActorCreator] = React.useState(false);
  const [cellCreator, setCellCreator] = React.useState(false);
  const [organizationCreator, setOrganizationCreator] = React.useState(false);
  const [marketCreator, setMarketCreator] = React.useState(false);
  const [commitmentCreator, setCommitmentCreator] = React.useState(false);
  const [contractCreator, setContractCreator] = React.useState(false);

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
    {
      title: 'コミットメント',
      cardinal: 5,
      image: '',
      newHandler: _ => setCommitmentCreator(true),
      listHandler: e => {
        console.log(e)
      },
      dialog: <CreateCommitmentDialog onClose={() => setCommitmentCreator(false)} open={commitmentCreator}/>,
    },
    {
      title: 'コントラクト',
      cardinal: 6,
      image: '',
      newHandler: _ => setContractCreator(true),
      listHandler: e => {
        console.log(e)
      },
      dialog: <CreateContractDialog onClose={() => setContractCreator(false)} open={contractCreator}/>
    }
  ];

  const {enqueueSnackbar} = useSnackbar();
  const loadings = {};
  const results = {};

  ({loading: loadings.actor, data: results.actor} =
    useQuery(gql`query {Actor {id, name, commitments {Cell {id}}}}`,
      {onError: e => enqueueSnackbar("GET_ALL_ACTORS failed")}));
  ({loading: loadings.cell, data: results.cell} =
    useQuery(gql`query {Cell {id, name, contracts {Organization {id}}}}`,
      {onError: e => enqueueSnackbar("GET_ALL_CELLS failed")}));
  ({loading: loadings.organization, data: results.organization} =
    useQuery(gql`query {Organization {id, name}}`,
      {onError: e => enqueueSnackbar("GET_ALL_ORGANIZATIONS failed")}));

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
      <Grid container className={classes.root} spacing={2}>
        {any(it => !!it)(values(loadings)) && <LinearProgress/>}
        {all(it => !!it)(values(results)) && (
          <NeoGraph neoGraph={{...results.actor, ...results.cell, ...results.organization}}/>
        )}
      </Grid>
    </Grid>
  )
}
