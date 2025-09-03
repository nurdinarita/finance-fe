import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IonIcon } from "@ionic/react";
import { closeCircle } from "ionicons/icons";

import useAxios from "../../components/hook/useAxios";
import { AuthContext } from "../../components/context/AuthContext";

const Login = () => {
  const api = useAxios();
  const navigate = useNavigate();

  const { auth, dispatch, loading, error } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const password = watch("password");

  const onSubmit = async (data) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await api.post("/login", data);

      const { access_token, token_type, user } = res.data;

      // payload untuk disimpan di context
      const payload = {
        token: `${access_token}`,
        user,
      };

      dispatch({ type: "LOGIN_SUCCESS", payload });

      navigate("/"); // redirect setelah login sukses
    } catch (err) {
      console.error(err);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "Email atau password salah!",
      });
    }
  };

  return (
    <div id="appCapsule">
      <div className="section mt-2 text-center">
        <h1>Masuk</h1>
      </div>
      <div className="section mb-5 p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card">
            <div className="card-body pb-1">
              {/* Email */}
              <div className="form-group basic">
                <div className="input-wrapper" style={{ position: "relative" }}>
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Masukkan email"
                    {...register("email", { required: true })}
                  />
                  {email && (
                    <span
                      onClick={() => setValue("email", "")}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#999",
                        fontSize: "20px",
                      }}
                    >
                      <IonIcon icon={closeCircle} />
                    </span>
                  )}
                  {errors.email && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      Email wajib diisi
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="form-group basic">
                <div className="input-wrapper" style={{ position: "relative" }}>
                  <label className="label" htmlFor="password">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Masukkan kata sandi"
                    {...register("password", { required: true })}
                  />
                  {password && (
                    <span
                      onClick={() => setValue("password", "")}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#999",
                        fontSize: "20px",
                      }}
                    >
                      <IonIcon icon={closeCircle} />
                    </span>
                  )}
                  {errors.password && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      Kata sandi wajib diisi
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {error && (
            <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
              {error}
            </p>
          )}

          <div className="form-links mt-2">
            <div>
              <a href="/register">Daftar Akun</a>
            </div>
            <div>
              <a href="/forgot-password" className="text-muted">
                Lupa Kata Sandi?
              </a>
            </div>
          </div>

          <div className="form-button-group transparent">
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
            >
              {loading ? "Loading..." : "Masuk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
