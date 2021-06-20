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
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import { Link } from 'react-router-dom';
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

export default function ItemList() {
  const classes = useStyles();
  const [totPage, setTotPage] = useState(1);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getTotalPage() {
      const total = await axios.get(
        `${process.env.REACT_APP_SERVER}/items/page`
      );
      setTotPage(total.data.page);
      await handlePage([], 1);
    }
    getTotalPage();
  }, []);

  const handlePage = async (_, value) => {
    const resp = await axios.get(
      `${process.env.REACT_APP_SERVER}/items?page=${value}`
    );
    setCards(resp.data.data);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.picture}
                    title={card.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>{card.price}원</Typography>
                  </CardContent>
                  <CardActions>
                    <Link
                      to={`item/${card.id}`}
                      style={{ color: 'inherit', textDecoration: 'inherit' }}
                    >
                      <Button size="small" color="primary">
                        자세히 보기
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Grid container justify="center">
          <Pagination
            className={classes.pagination}
            boundaryCount={1}
            count={totPage}
            color="primary"
            onChange={handlePage}
          />
        </Grid>
      </main>
      <Footer />
    </React.Fragment>
  );
}
