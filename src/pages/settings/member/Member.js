import React from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import * as ionicons from "ionicons/icons";
import { useQuery } from "@tanstack/react-query";

import useAxios from "../../../components/hook/useAxios";

const Member = () => {
  const api = useAxios();

  const selectedBook = JSON.parse(localStorage.getItem("selectedBook"));
  // fetch data Member
  const { data: members, isLoading: isMemberLoading } = useQuery({
    queryKey: ["members"],
    queryFn: () =>
      api.get(`/members?account_book_id=${selectedBook.id}`).then((res) => {
        return res.data.data;
      }),
  });

  return (
    <>
      <div class="appHeader">
        <div class="left">
          <Link to="/settings" class="headerButton goBack">
            <IonIcon icon={ionicons["chevronBackOutline"]} />
          </Link>
        </div>
        <div class="pageTitle">Member Page</div>
      </div>
      <div class="mt-2">
        <ul class="listview image-listview inset">
          {isMemberLoading && (
            <div className="text-center mt-5">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          )}
          {!isMemberLoading && members?.length === 0 && (
            <div className="text-center mt-5">
              <IonIcon
                icon={ionicons["personOutline"]}
                style={{ fontSize: "80px" }}
              />
              <h3 className="mt-2">Belum ada member</h3>
            </div>
          )}
          {!isMemberLoading &&
            members?.map((member) => (
              <li>
                <div class="item">
                  <div class="icon-box bg-danger">
                    <IonIcon icon={ionicons["personOutline"]} />
                  </div>
                  <div class="in">
                    <div>{member.name}</div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <Link
        to="/settings/member/add"
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
        <i className="bi bi-person-add" style={{ fontSize: "28px" }} />
      </Link>
    </>
  );
};

export default Member;
