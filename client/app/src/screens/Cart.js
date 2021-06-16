import Footer from '../components/Footer';
import Header from '../components/Header';

function Cart() {
  return (
    <div>
      <Header />
      <main>
        <form>
          <div class="container form-group">
            <h3>장바구니</h3>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">상품명</th>
                  <th scope="col">가격</th>
                  <th scope="col">주문수량</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>10,000</td>
                  <td>
                    <input type="number" min="0" max="100" value="1" />
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>10,000</td>
                  <td>
                    <input type="number" min="0" max="100" value="1" />
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>test</td>
                  <td>10,000</td>
                  <td>
                    <input type="number" min="0" max="100" value="1" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="container d-flex justify-content-end">
            <button type="button" class="btn btn-outline-dark">
              주문하기
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Cart;
