import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <header className="p-3 mb-3 border-bottom bg-light">
      <div className="container">
        <div
          className="
            d-flex
            flex-wrap
            align-items-center
            justify-content-center justify-content-lg-start
          "
        >
          <a
            href="test"
            className="
              d-flex
              align-items-center
              mb-2 mb-lg-0
              text-dark text-decoration-none
            "
          >
            Shop
          </a>

          <ul
            className="
              nav
              col-12 col-lg-auto
              me-lg-auto
              mb-2
              justify-content-center
              mb-md-0
            "
          >
            <li>
              <a href="/" className="nav-link px-2 link-dark">
                상품 목록
              </a>
            </li>
            <li>
              <a href="/cart" className="nav-link px-2 link-dark">
                장바구니
              </a>
            </li>
            <li>
              <a href="test" className="nav-link px-2 link-dark">
                주문조회
              </a>
            </li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="dropdown text-end">
            <a
              href="test"
              className="d-block link-dark text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/kshired.png"
                alt="mdo"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </a>
            <ul
              className="dropdown-menu text-small"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <a className="dropdown-item" href="test">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="test">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
