import React from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {
  cameraOutline,
  chevronBackOutline,
  notificationsOutline,
  walletOutline,
  add,
} from "ionicons/icons";
import { useQuery } from "@tanstack/react-query";

import useAxios from "../../../components/hook/useAxios";

const AccountBook = () => {
  const api = useAxios();

  // fetch data buku keuangan
  const { data: accountBooks, isLoading } = useQuery({
    queryKey: ["account-books"],
    queryFn: () =>
      api.get(`/account-books`).then((res) => {
        return res.data.data;
      }),
  });

  return (
    <>
      <div class="appHeader">
        <div class="left">
          <Link to="/settings" class="headerButton goBack">
            <IonIcon icon={chevronBackOutline} />
          </Link>
        </div>
        <div class="pageTitle">Nama Buku</div>
      </div>

      <div class="listview-title mt-2"></div>
      {/* Content */}
      {isLoading && (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}
      {!isLoading && accountBooks?.length === 0 && (
        <div className="text-center mt-5">
          <IonIcon icon={walletOutline} style={{ fontSize: "80px" }} />
          <p className="mt-2">Belum ada buku keuangan</p>
        </div>
      )}
      {!isLoading && accountBooks?.length > 0 && (
        <ul class="listview image-listview inset">
          {accountBooks.map((book) => (
            <li>
              <a href="#" class="item">
                <div class="icon-box bg-primary">
                  <IonIcon icon={walletOutline} />
                </div>
                <div class="in">
                  <div>
                    <strong>{book.name}</strong>
                    <br />
                    <small class="text-muted">{book.description || "-"}</small>
                  </div>
                  {/* Default */}
                  {book?.is_default ? (
                    <div class="text-right text-muted">
                      <small class="badge badge-primary ">Default</small>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* * Content */}

      <Link
        to="/settings/account-book/add"
        className="btn btn-primary rounded-circle d-flex align-items-center
        justify-content-center shadow"
        style={{
          width: "55px",
          height: "55px",
          position: "fixed",
          bottom: "80px",
          right: "20px",
        }}
      >
        <i className="bi bi-plus" style={{ fontSize: "28px" }} />
      </Link>
    </>
  );
};

export default AccountBook;
