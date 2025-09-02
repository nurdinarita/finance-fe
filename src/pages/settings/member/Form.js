import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { chevronBackOutline, closeCircle } from "ionicons/icons";
import { useForm } from "react-hook-form";

import useAxios from "../../../components/hook/useAxios";

const Form = () => {
  const api = useAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  // ambil data selectedBook dari localStorage
  const selectedBook = JSON.parse(localStorage.getItem("selectedBook"));

  const onSubmit = async (data) => {
    setLoading(true);
    data.account_book_id = selectedBook.id; // sertakan account_book_id dalam data yang dikirim
    api
      .post("/members", data)
      .then((res) => {
        console.log(res);
        navigate("/settings/member");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="appHeader">
        <div className="left">
          <Link to="/settings/member" className="headerButton goBack">
            <IonIcon icon={chevronBackOutline} />
          </Link>
        </div>
        <div className="pageTitle">Member Form</div>
      </div>

      <div className="section mt-2">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label className="label" htmlFor="name">
                    Nama Member
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Nama Member"
                    {...register("name", { required: true })}
                  />
                  <i className="clear-input">
                    <IonIcon icon={closeCircle} />
                  </i>
                </div>
                {errors.name && (
                  <small className="form-error text-danger">
                    Nama Member harus diisi
                  </small>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
