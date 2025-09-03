import React from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import * as ionicons from "ionicons/icons";
import { useQuery } from "@tanstack/react-query";

import useAxios from "../../../components/hook/useAxios";

const Category = () => {
  const api = useAxios();
  const selectedBook = JSON.parse(localStorage.getItem("selectedBook"));

  // fetch data Category
  const {
    data: categories,
    isLoading: isCategoryLoading,
    isFetching: isCategoryFetching,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      api.get(`/categories?account_book_id=${selectedBook.id}`).then((res) => {
        return res.data.data;
      }),
  });

  // Grouping berdasarkan tipe (income / expense)
  const groupedCategories = categories?.reduce((acc, category) => {
    const type = category.type || "Lainnya"; // fallback kalau tidak ada
    if (!acc[type]) acc[type] = [];
    acc[type].push(category);
    return acc;
  }, {});

  return (
    <>
      <div className="appHeader">
        <div className="left">
          <Link to="/settings" className="headerButton goBack">
            <IonIcon icon={ionicons["chevronBackOutline"]} />
          </Link>
        </div>
        <div className="pageTitle">Kategori</div>
      </div>

      <div className="mt-2">
        {(isCategoryLoading || isCategoryFetching) && (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        )}
        {!isCategoryLoading &&
          categories?.length === 0 &&
          !isCategoryFetching && (
            <div className="text-center mt-5">
              <IonIcon
                icon={ionicons["documentOutline"]}
                style={{ fontSize: "80px" }}
              />
              <h3 className="mt-2">Belum ada kategori</h3>
            </div>
          )}
        {!isCategoryLoading &&
          !isCategoryFetching &&
          groupedCategories &&
          Object.keys(groupedCategories).map((type) => (
            <div key={type} className="mb-3">
              <h6 className="px-3 text-muted">
                {type.toUpperCase() === "INCOME" ? "PEMASUKAN" : "PENGELUARAN"}
              </h6>
              <ul className="listview image-listview inset">
                {groupedCategories[type].map((category) => (
                  <li key={category.id}>
                    <div className="item">
                      <div className="icon-box bg-danger">
                        <IonIcon icon={ionicons["personOutline"]} />
                      </div>
                      <div className="in">
                        <div>{category.name}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>

      <Link
        to="/settings/category/add"
        className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow"
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

export default Category;
