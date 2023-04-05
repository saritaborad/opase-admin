import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { PostApi } from "../../api/api-service";
import { API_Path } from "../../const";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [password, setPassword] = useState();
  const [configpassword, setConfigPassword] = useState();
  const [email, setEmail] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user_email")) {
      setEmail(localStorage.getItem("user_email"));
    }
  }, [email]);

  const submitFormData = (formData, resetForm) => {
    let data = {
      email: email,
      password: formData.password,
      configpassword: formData.configpassword,
    };

    const pwdreset = new Promise((resolve) => {
      resolve(PostApi(API_Path.Reset_password, data));
    });
    pwdreset.then((res) => {
      if (res) {
        resetForm(formData);
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const errorContainer = (form, field) => {
    return form.touched[field] && form.errors[field] ? <span className="error text-danger">{form.errors[field]}</span> : null;
  };

  const formAttr = (form, field) => ({
    onBlur: form.handleBlur,
    onChange: form.handleChange,
    value: form.values[field],
  });

  const passwordshow = (e) => {
    var x = document.getElementById("new_password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    document.getElementById("show_pwd").classList.toggle("active");
  };

  const passwordconfirmshow = (e) => {
    var x = document.getElementById("confirm_password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    document.getElementById("show_confirm_pwd").classList.toggle("active");
  };
  return (
    <>
      <div className="comn-row-section">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6">
              <div className="main-center-form p-5">
                <Formik
                  // innerRef={this.runforms}
                  enableReinitialize
                  initialValues={{
                    password: password,
                    configpassword: configpassword,
                  }}
                  validationSchema={Yup.object({
                    password: Yup.string().required("New Password is required."),
                    configpassword: Yup.string()
                      .when("password", {
                        is: (val) => (val && val.length > 0 ? true : false),
                        then: Yup.string().oneOf([Yup.ref("password")], "Password must match."),
                      })
                      .required("Confirm password is required."),
                  })}
                  onSubmit={(formData, { resetForm }) => {
                    submitFormData(formData, resetForm);
                  }}
                >
                  {(runform) => (
                    <form className="row align-items-center" onSubmit={runform.handleSubmit}>
                      <div className="col-12 mb-3">
                        <div className="text-center">
                          <div className="comn-login-head">
                            <h2>Reset your password</h2>
                            <p>Your new password must be different from Previous used passwords.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mb-3">
                        <label className="comn-label-class">New password</label>
                        <bdi className="d-block position-relative">
                          <input type="password" id="new_password" className="form-control login-comn-input pe-5" {...formAttr(runform, "password")} name="password" placeholder="Enter new password" />
                          <span className="showpwd-class bg-transparent" id="show_pwd" onClick={(e) => passwordshow(e)}>
                            <i className="bi bi-eye-slash"></i>
                          </span>
                        </bdi>
                        {errorContainer(runform, "password")}
                      </div>
                      <div className="col-12 mb-3">
                        <label className="comn-label-class">Confirm password</label>
                        <bdi className="d-block position-relative">
                          <input type="password" id="confirm_password" className="form-control login-comn-input pe-5" {...formAttr(runform, "configpassword")} name="configpassword" placeholder="Enter confirm password" />
                          <span className="showpwd-class bg-transparent" id="show_confirm_pwd" onClick={(e) => passwordconfirmshow(e)}>
                            <i className="bi bi-eye-slash"></i>
                          </span>
                        </bdi>
                        {errorContainer(runform, "configpassword")}
                      </div>
                      <div className="col-12">
                        <button
                          className="comn-btn-class w-100"
                          type="submit"
                          // onClick={() => window.open('/login', '_self')}
                        >
                          Set password
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
