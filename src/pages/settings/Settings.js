import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {
  cameraOutline,
  chevronBackOutline,
  notificationsOutline,
} from "ionicons/icons";

import useAxios from "../../components/hook/useAxios";
import avatar1 from "../../assets/images/avatar1.jpg";

const Settings = () => {
  const api = useAxios();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  // baca localStorage di awal (lazy init biar cuma sekali dieksekusi)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // efek samping kalau darkMode berubah
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    setLoading(true);
    api.post("/logout").finally(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login", { replace: true });
      setLoading(false);
    });
  };

  return (
    <>
      <div class="appHeader">
        {/* <div class="left">
          <a href="#" class="headerButton goBack">
            <IonIcon icon={chevronBackOutline} />
          </a>
        </div> */}
        <div class="pageTitle">Settings</div>
        {/* <div class="right">
          <a href="app-notifications.html" class="headerButton">
            <IonIcon icon={notificationsOutline} />
            <span class="badge badge-danger">4</span>
          </a>
        </div> */}
      </div>

      <div className="section mt-3 text-center">
        <div className="avatar-section">
          <a href="#">
            <img src={avatar1} alt="avatar" className="imaged w100 rounded" />
            <span className="button">
              <IonIcon icon={cameraOutline} />
            </span>
          </a>
        </div>
      </div>

      <div className="listview-title mt-1">Theme</div>
      <ul className="listview image-listview text inset no-line">
        <li>
          <div className="item">
            <div className="in">
              <div>Dark Mode</div>
              <div className="form-check form-switch ms-2">
                <input
                  className="form-check-input dark-mode-switch"
                  type="checkbox"
                  id="darkmodeSwitch"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <label class="form-check-label" for="darkmodeSwitch"></label>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div class="listview-title mt-1">Profile Settings</div>
      <ul class="listview image-listview text inset">
        <li>
          <a href="#" class="item">
            <div class="in">
              <div>Change Username</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item">
            <div class="in">
              <div>Update E-mail</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item">
            <div class="in">
              <div>Address</div>
              <span class="text-primary">Edit</span>
            </div>
          </a>
        </li>
        <li>
          <div class="item">
            <div class="in">
              <div>Private Profile</div>
              <div class="form-check form-switch ms-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="SwitchCheckDefault2"
                />
                <label
                  class="form-check-label"
                  for="SwitchCheckDefault2"
                ></label>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div class="listview-title mt-1">App Settings</div>
      <ul className="listview image-listview inset mb-3">
        <li>
          <Link to="/settings/category" className="item">
            <div className="icon-box bg-primary">
              <i className="icon ion-md-list-box" />
            </div>
            <div className="in">Kategori</div>
          </Link>
        </li>

        <li>
          <Link to="/settings/member" className="item">
            <div className="icon-box bg-primary">
              <i className="icon ion-md-contacts" />
            </div>
            <div className="in">Member</div>
          </Link>
        </li>

        <li>
          <Link to="/settings/account-book" className="item">
            <div className="icon-box bg-primary">
              <i className="icon ion-md-book" />
            </div>
            <div className="in">Nama Buku</div>
          </Link>
        </li>
      </ul>

      <div class="text-center mt-3 mb-3">
        <button
          class="btn btn-danger"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </>
  );
};

export default Settings;
