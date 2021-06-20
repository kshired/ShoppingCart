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
import { TextField } from '@material-ui/core';
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
  textField: {
    width: '25',
  },
}));

export default function Item({ match, history }) {
  const classes = useStyles();
  const { id } = match.params;
  const [item, setItem] = useState(null);
  const [count, setCount] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getItem() {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/items/${id}`
      );
      setItem(res.data.data);
    }
    getItem();
  }, [id]);

  const handleAddCart = async (event, value) => {
    event.preventDefault();

    if (!error) {
      const token = localStorage.getItem('accessToken');
      if (token === null) {
        alert('로그인 해주세요!');
        history.push('/signin');
      }
      try {
        const resp = await axios.post(
          `${process.env.REACT_APP_SERVER}/cart`,
          {
            item_id: item.id,
            count,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (resp.data.ok) {
          alert('카트에 담았습니다!');
        } else {
          alert('카트에 담지 못했습니다!');
        }
      } catch (err) {
        alert('카트에 담지 못했습니다!');
      }
    } else {
      return;
    }
  };

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
              <TextField
                label="수량"
                error={error}
                helperText={
                  error
                    ? `수량에 문제가 있습니다 (최대수량 : ${item.stock_quantity})`
                    : ''
                }
                onChange={(e) => {
                  setCount(e.target.value);
                  if (
                    e.target.value <= item.stock_quantity &&
                    e.target.value >= 1
                  ) {
                    setError(false);
                  } else {
                    setError(true);
                  }
                }}
                className={classes.textfield}
                InputProps={{
                  inputProps: {
                    min: 1,
                    max: item.stock_quantity,
                    defaultValue: 1,
                  },
                }}
              ></TextField>
              <Button size="small" color="primary" onClick={handleAddCart}>
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
