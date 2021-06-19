import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(4),
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  pagination: {
    marginBottom: theme.spacing(4),
  },
}));

export default function Item({ match }) {
  const classes = useStyles();
  const { id } = match.params;
  const [item, setItem] = useState({});

  useEffect(() => {
    async function getItem() {
      const res = await axios.get(`http://52.79.121.63/items/${id}`);
      setItem(res.data.data);
    }
    getItem();
  }, [id]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        {item ? (
          <Grid container justify="center">
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={item.picture}
                title={item.name}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography>{item.price}원</Typography>
              </CardContent>
            </Card>
            <CardActions>
              <Button size="small" color="primary">
                카트에 담기
              </Button>
            </CardActions>
          </Grid>
        ) : (
          <div>404 NOT FOUND</div>
        )}
      </main>
      <Footer />
    </React.Fragment>
  );
}
