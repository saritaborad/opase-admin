import React, { useEffect, useState } from "react";
import { PostApi } from "../../api/api-service";
import { API_Path } from "../../const";
import Checkmail_Profile from "../../images/mail-img.png";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CheckYourMail() {
  const [email, setEmail] = useState("");
  const [isphone, setisphone] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user_email")) {
      setEmail(localStorage.getItem("user_email"));
    }
  }, [email]);

  let checkMailVerify = () => {
    let data = {
      email: email,
      isphone: isphone,
    };
    let checkMail = new Promise((resolve) => {
      resolve(PostApi(API_Path.checkEmailverify, data));
    });
    checkMail.then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/dashboard");
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <>
      <div className="comn-row-section">
        <div className="container">
          <div className="row align-items-center h-100">
            <div className="col-lg-6 m-auto">
              <div className="main-center-form p-5">
                <div className="row align-items-center">
                  <div className="col-12">
                    <div className="text-center">
                      <img src={Checkmail_Profile} className="img-fluid" alt="checkmail" />
                      <div className="comn-login-head">
                        <h2>Check your email</h2>
                        <p>Don’t worry! It happens. Please enter the address associated with your account.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <button className="comn-btn-class w-100" type="button" onClick={() => checkMailVerify()}>
                      Open Mail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
