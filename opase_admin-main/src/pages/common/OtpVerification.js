import React, { useEffect, useState } from "react";
import Otp_Profile from "../../images/otp-image.png";
import OtpInput from "react-otp-input";
import { PostApi } from "../../api/api-service";
import { API_Path } from "../../const";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function OtpVerification() {
  const [otp, setOTP] = useState("");
  const [email, setEmail] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user_email")) {
      setEmail(localStorage.getItem("user_email"));
    }
  }, [email]);

  let otpVerify = () => {
    let data = {
      email: email,
      otp: parseInt(otp),
    };
    const Verification = new Promise((resolve) => {
      resolve(PostApi(API_Path.verifyOtp, data));
    });
    Verification.then((res) => {
      if (res) {
        toast.success(res.data.message);
        navigate("/reset-password");
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <>
      <div className="comn-row-section">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 m-auto">
              <div className="main-center-form p-5">
                <div className="row align-items-center">
                  <div className="col-12">
                    <div className="text-center">
                      <img src={Otp_Profile} className="img-fluid" alt="otpverify" />
                      <div className="comn-login-head">
                        <h2>Verification code</h2>
                        <p>
                          We have sent the code verification to your Email address <span>{email}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-3 mb-4">
                    <OtpInput
                      value={otp}
                      onChange={setOTP}
                      numInputs={5}
                      separator={<span style={{ width: "8px" }}></span>}
                      isInputNum={true}
                      shouldAutoFocus={true}
                      inputStyle={{
                        border: "0",
                        borderRadius: "64px",
                        backgroundColor: "#282828",
                        width: "50px",
                        height: "50px",
                        fontSize: "14px",
                        color: "#fff",
                        fontWeight: "400",
                      }}
                      containerStyle={{
                        justifyContent: "center",
                      }}
                      focusStyle={{
                        border: "0",
                        outline: "none",
                        color: "#fff",
                        boxShadow: "0 0 3px #282828",
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      className="comn-btn-class w-100"
                      type="button"
                      // onClick={() => window.open('/reset-password', '_self')}
                      onClick={() => otpVerify()}
                    >
                      Submit
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
