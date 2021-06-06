import './Items.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Items = () => {
  const [items, setItems] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3, 4, 5];
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${url}/items/page`).then((response) => {
      setTotalPage(response.data.page);
    });
  }, [totalPage, url]);

  useEffect(() => {
    axios
      .get(`${url}/items`, {
        params: {
          page,
        },
      })
      .then((response) => {
        setItems(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [page, url]);

  return (
    <div>
      <ul>
        {items.map(({ id, name, price }) => (
          <li key={id}>
            {id}. {name} ${price}
          </li>
        ))}
      </ul>
      <div>
        {(Math.ceil(page / 5) - 1) * 5 > 0 ? (
          <div
            className="page-button"
            onClick={() => {
              let newPage = (Math.ceil(page / 5) - 1) * 5;
              setPage(newPage);
            }}
          >
            {'<<'}
          </div>
        ) : (
          ''
        )}
        {pages.reduce((result, cur) => {
          let curPage = cur + (Math.ceil(page / 5) - 1) * 5;

          if (curPage <= totalPage) {
            if (curPage === page) {
              result.push(
                <div
                  className="page-button"
                  key={curPage}
                  onClick={() => setPage(curPage)}
                >
                  <b>{curPage}</b>
                </div>
              );
            } else {
              result.push(
                <div
                  className="page-button"
                  key={curPage}
                  onClick={() => setPage(curPage)}
                >
                  {curPage}
                </div>
              );
            }
          }
          return result;
        }, [])}
        {(Math.ceil(page / 5) - 1) * 5 + 6 <= totalPage ? (
          <div
            className="page-button"
            onClick={() => {
              let newPage = (Math.ceil(page / 5) - 1) * 5 + 6;
              setPage(newPage);
            }}
          >
            {'>>'}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Items;
