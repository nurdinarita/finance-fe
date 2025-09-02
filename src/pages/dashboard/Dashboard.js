import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useAxios from "../../components/hook/useAxios";
import DepositModal from "../../components/modals/DepositModal";
import logo from "../../assets/images/logo.png";
import avatar1 from "../../assets/images/avatar1.jpg";

const Dashboard = () => {
  const api = useAxios();

  // fetch data buku keuangan
  const { data: accountBooks, isLoading: isLoadingAccountBook } = useQuery({
    queryKey: ["account-books"],
    queryFn: () =>
      api.get(`/account-books`).then((res) => {
        console.log(res);
        return res.data.data;
      }),
  });

  const [selectedBook, setSelectedBook] = useState({});

  // update selectedBook ketika data sudah ada
  useEffect(() => {
    if (accountBooks && accountBooks.length > 0) {
      setSelectedBook(accountBooks[0]); // default ambil yang pertama
      localStorage.setItem("selectedBook", JSON.stringify(accountBooks[0]));
    }
  }, [accountBooks]);

  const handleChangeBook = (event) => {
    const bookId = parseInt(event.target.value);
    const book = accountBooks.find((b) => b.id === bookId);
    setSelectedBook(book);
    localStorage.setItem("selectedBook", JSON.stringify(book));
  };

  return (
    <>
      <DepositModal />

      {/* App Header */}
      <div className="appHeader bg-primary text-light">
        <div className="left">
          <div className="pageTitle">
            <Link to="/">
              <img src={logo} alt="logo" className="logo" />
            </Link>
          </div>

          {/* Dropdown pilih akun */}
          {/* {isLoadingAccountBook && <div>Loading...</div>} */}
          <div className="dropdown">
            <select
              className="btn btn-light btn-sm dropdown-toggle"
              style={{
                maxWidth: "100px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: "left",
              }}
              value={selectedBook?.id}
              onChange={handleChangeBook}
            >
              {isLoadingAccountBook && <option>Loading...</option>}
              {accountBooks?.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="right">
          <a href="app-settings.html" className="headerButton">
            <img src={avatar1} alt="image" className="imaged w32" />
            <span className="badge badge-danger">6</span>
          </a>
        </div>
      </div>
      {/* * App Header */}

      {/* Account Book Selector */}
      <div className="section bg-primary text-light py-2">
        <div className="d-flex align-items-center justify-content-between px-3">
          <div>
            <i className="bi bi-journal-bookmark fs-4 me-1"></i>
            <strong>{selectedBook.name}</strong>
          </div>
        </div>
      </div>
      {/* * Account Book Selector */}

      {/* Wallet Card */}
      <div className="section wallet-card-section pt-1">
        <div className="wallet-card">
          {/* Balance */}
          <div className="balance">
            <div className="left">
              <span className="title">Total Saldo</span>
              <h1 className="total">Rp 2.562</h1>
            </div>
            <div className="right">
              <a
                href="#"
                className="button"
                data-bs-toggle="modal"
                data-bs-target="#depositActionSheet"
              >
                <i className="icon ion-md-add" />
              </a>
            </div>
          </div>
          {/* Balance */}
          {/* Wallet Footer */}
          <div className="wallet-footer">
            <div className="item">
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#withdrawActionSheet"
              >
                <div className="icon-wrapper bg-danger">
                  <i className="icon ion-md-arrow-down" />
                </div>
                <strong>Withdraw</strong>
              </a>
            </div>
            <div className="item">
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#sendActionSheet"
              >
                <div className="icon-wrapper">
                  <i className="icon ion-md-arrow-forward" />
                </div>
                <strong>Send</strong>
              </a>
            </div>
            <div className="item">
              <a href="app-cards.html">
                <div className="icon-wrapper bg-success">
                  <i className="icon ion-md-card" />
                </div>
                <strong>Cards</strong>
              </a>
            </div>
            <div className="item">
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#exchangeActionSheet"
              >
                <div className="icon-wrapper bg-warning">
                  <i className="icon ion-md-swap" />
                </div>
                <strong>Exchange</strong>
              </a>
            </div>
          </div>
          {/* Wallet Footer */}
        </div>
      </div>
      {/* Wallet Card */}

      {/* Stats */}
      <div className="section">
        <div className="row mt-2">
          <div className="col-6">
            <div className="stat-box">
              <div className="title">Pemasukan</div>
              <div className="value text-success" style={{ fontSize: "16px" }}>
                Rp. 5.000.000
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="stat-box">
              <div className="title">Pengeluaran</div>
              <div className="value text-danger" style={{ fontSize: "16px" }}>
                Rp. 2.000.000
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Stats */}

      {/* Transactions */}
      <div className="section mt-4">
        <div className="section-heading">
          <h2 className="title">Transactions</h2>
          <a href="app-transactions.html" className="link">
            View All
          </a>
        </div>
        <div className="transactions">
          {/* item */}
          <a href="app-transaction-detail.html" className="item">
            <div className="detail">
              <img
                src="images/1.jpg"
                alt="img"
                className="image-block imaged w48"
              />
              <div>
                <strong>Amazon</strong>
                <p>Shopping</p>
              </div>
            </div>
            <div className="right">
              <div className="price text-danger">- $ 150</div>
            </div>
          </a>
          {/* item */}
          {/* item */}
          <a href="app-transaction-detail.html" className="item">
            <div className="detail">
              <img
                src="images/2.jpg"
                alt="img"
                className="image-block imaged w48"
              />
              <div>
                <strong>Apple</strong>
                <p>Appstore Purchase</p>
              </div>
            </div>
            <div className="right">
              <div className="price text-danger">- $ 29</div>
            </div>
          </a>
          {/* item */}
          {/* item */}
          <a href="app-transaction-detail.html" className="item">
            <div className="detail">
              <img
                src="images/avatar3.jpg"
                alt="img"
                className="image-block imaged w48"
              />
              <div>
                <strong>Alex Ljung</strong>
                <p>Transfer</p>
              </div>
            </div>
            <div className="right">
              <div className="price">+ $ 1,000</div>
            </div>
          </a>
          {/* item */}
          {/* item */}
          <a href="app-transaction-detail.html" className="item">
            <div className="detail">
              <img
                src="images/avatar4.jpg"
                alt="img"
                className="image-block imaged w48"
              />
              <div>
                <strong>Beatriz Brito</strong>
                <p>Transfer</p>
              </div>
            </div>
            <div className="right">
              <div className="price text-danger">- $ 186</div>
            </div>
          </a>
          {/* item */}
        </div>
      </div>
      {/* Transactions */}

      {/* <!-- Monthly Bills */}
      <div className="section full mt-4">
        <div className="section-heading padding">
          <h2 className="title">Monthly Bills</h2>
          <a href="app-bills.html" className="link">
            View All
          </a>
        </div>
        {/* <!-- carousel multiple */}
        <div>Posisi Card Carosel</div>
        {/* carousel multiple */}
      </div>
      {/* Monthly Bills */}
    </>
  );
};

export default Dashboard;
