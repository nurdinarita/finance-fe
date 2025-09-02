import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { closeCircle, chevronBackOutline } from "ionicons/icons";
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
  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);

    // Request Post ke API
    api
      .post("/account-books", data)
      .then((res) => {
        console.log(res);
        // redirect ke /settings/account-book
        navigate("/settings/account-book");
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
      <div class="appHeader">
        <div class="left">
          <Link to="/settings/account-book" class="headerButton goBack">
            <IonIcon icon={chevronBackOutline} />
          </Link>
        </div>
        <div class="pageTitle">Nama Buku</div>
      </div>

      <div class="section mt-2">
        <div class="section-title">Buku Keuangan</div>
        <div class="card">
          <div class="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="form-group basic">
                <div class="input-wrapper">
                  <label class="label" for="name">
                    Nama Buku
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Nama Buku"
                    {...register("name", { required: true })}
                  />
                  <i class="clear-input">
                    <IonIcon icon={closeCircle} />
                  </i>
                </div>
                {errors.name && (
                  <small class="form-error text-danger">
                    Nama Buku harus diisi
                  </small>
                )}
              </div>

              <div class="form-group basic">
                <div class="input-wrapper">
                  <label class="label" for="description">
                    Keterangan
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="Keterangan"
                    {...register("description", { required: false })}
                  />
                  <i class="clear-input">
                    <IonIcon icon={closeCircle} />
                  </i>
                </div>
                {errors.description && (
                  <small class="form-error">Keterangan harus diisi</small>
                )}
              </div>

              <button
                type="submit"
                class="btn btn-primary btn-block"
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
