import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {
  pieChartOutline,
  newspaperOutline,
  albumsOutline,
  cardOutline,
  settingsOutline,
} from "ionicons/icons";

import "../../assets/css/style.css";
import Loader from "../../components/loader/Loader";

function Layout() {
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  // deteksi perubahan route
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // simulasi loading 0.3s
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Loader show={loading} />

      {/* App Capsule */}
      <div id="appCapsule" className="mb-3">
        <Outlet />
      </div>
      {/* * App Capsule */}

      {/*  App Bottom Menu */}
      <div className="appBottomMenu">
        <Link
          to="/"
          className={`item ${location.pathname === "/" && "active"}`}
        >
          <div className="col">
            <IonIcon icon={pieChartOutline} />
            <strong>Overview</strong>
          </div>
        </Link>
        <Link to="app-pages.html" className="item">
          <div className="col">
            <IonIcon icon={newspaperOutline} />
            <strong>Pages</strong>
          </div>
        </Link>
        <Link to="app-components.html" className="item">
          <div className="col">
            <IonIcon icon={albumsOutline} />
            <strong>Components</strong>
          </div>
        </Link>
        <Link to="app-cards.html" className="item">
          <div className="col">
            <IonIcon icon={cardOutline} />
            <strong>My Cards</strong>
          </div>
        </Link>
        <Link
          to="/settings"
          className={`item ${
            location.pathname.startsWith("/settings") && "active"
          }`}
        >
          <div className="col">
            <IonIcon icon={settingsOutline} />

            <strong>Settings</strong>
          </div>
        </Link>
      </div>
      {/* App Bottom Menu */}
    </>
  );
}

export default Layout;
