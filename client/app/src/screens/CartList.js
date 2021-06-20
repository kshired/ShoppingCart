import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Link } from '@material-ui/core';
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
  table: {
    minWidth: 650,
  },
  submit: {
    maxWidth: 40,
    margin: theme.spacing(1),
  },
}));

export default function CartList({ history }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  function createData({ item_id, count, item: { name, price } }) {
    return { id: item_id, name, count, price: price * count };
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token === null) {
      alert('로그인 해주세요!');
      history.push('/signin');
      return;
    }
    async function getCartList() {
      const resp = await axios.get(`${process.env.REACT_APP_SERVER}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.data.ok) {
        let tmp = [];
        for (let data of resp.data.data) {
          tmp.push(createData(data));
        }
        setRows(tmp);
      } else {
        return;
      }
    }
    getCartList();
  }, [history]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#id</TableCell>
                  <TableCell align="center">상품 이름</TableCell>
                  <TableCell align="right">수량</TableCell>
                  <TableCell align="right">가격</TableCell>
                  <TableCell align="center">&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">
                      <Link href={`/item/${row.id}`}>{row.name}</Link>
                    </TableCell>
                    <TableCell align="right">{row.count}개</TableCell>
                    <TableCell align="right">{row.price}원</TableCell>
                    <TableCell align="center">
                      <Button
                        type="submit"
                        variant="contained"
                        color="inherit"
                        className={classes.submit}
                      >
                        수정
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                      >
                        삭제
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container justify="flex-end">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              주문
            </Button>
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
