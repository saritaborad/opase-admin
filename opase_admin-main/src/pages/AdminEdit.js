import React, { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";

export default function AdminEdit(params) {
  const [forgotmodalShow, setDeclineModalShow] = useState(false);
  const [ResetmodalShow, setResetModalShow] = useState(false);
  const [adminData, setAdminData] = useState([]);

  const location = useLocation("");

  useEffect(() => {
    geteditAdminData();
  }, []);

  const geteditAdminData = () => {
    const data = {
      id: location.state.id,
    };
    const editAdminData = new Promise((resolve) => {
      resolve(PostApi(API_Path.editAdmin, data));
    });

    editAdminData.then((res) => {
      if (res.status === 200) {
        setAdminData(res.data.data[0]);
      } else {
        toast.error(res.data.massage);
      }
    });
  };

  const submitFormData = (formData, resetForm) => {
    const data = {
      id: location.state.id,
      fullname: formData.fullname,
      status: formData.admin_status,
      role: formData.role,
    };
    const editAdminData = new Promise((resolve) => {
      resolve(PostApi(API_Path.editAdmin, data));
    });

    editAdminData.then((res) => {
      if (res.status === 200) {
        geteditAdminData();
        toast.success(res.data.massage);
      } else {
        resetForm();
        toast.error(res.data.massage);
      }
    });
  };

  let errorContainer = (form, field) => {
    return form.touched[field] && form.errors[field] ? <span className="error text-danger">{form.errors[field]}</span> : null;
  };

  let formAttr = (form, field) => ({
    onBlur: form.handleBlur,
    onChange: form.handleChange,
    value: form.values[field],
  });

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mt-3">
                <div className="set-box-head mb-4 pb-4">
                  <div className="row">
                    <div className="col-12">
                      <div className="d-md-flex d-block user-info-hdr">
                        {/* <div className="user-info-pro">
                          <img src={adminData.image ? adminData.image : Profile} alt="User Profile" />
                        </div> */}
                        <div className="ms-md-4">
                          <bdi>{adminData.fullname}</bdi>
                          <div className="user-role">{adminData.role === 4 ? "Admin" : adminData.role === 5 ? "Sub-admin" : adminData.role === 6 ? "Staff" : adminData.role === 7 && "Contributor"}</div>
                          <div className="user-info d-sm-flex">
                            {adminData.email}
                            <div className="ms-sm-4 user-info">{adminData.phone}</div>
                          </div>
                        </div>
                        <div className="ms-md-auto comn-status-class">
                          <span className={adminData.admin_status === 1 ? "active-class" : "deactive-class"}>{adminData.admin_status === 1 ? "Active" : "Deactive"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      fullname: adminData.fullname ? adminData.fullname : "",
                      lastName: "",
                      email: adminData.email ? adminData.email : "",
                      role: adminData.role ? adminData.role : "",
                      admin_status: adminData.admin_status === 1 ? "Active" : "Deactive",
                      read: adminData.read ? adminData.read : "",
                      write: adminData.write ? adminData.write : "",
                    }}
                    validationSchema={Yup.object({
                      fullname: Yup.string().required("Full name  is required."),
                      lastName: Yup.string().required("Last name is required."),
                      email: Yup.string().required("Email is required."),
                      admin_status: Yup.string().required("Status is required."),
                      role: Yup.string().required("Role is required."),
                    })}
                    onSubmit={(formData, { resetForm }) => {
                      submitFormData(formData, resetForm);
                    }}
                  >
                    {(runform) => (
                      <form onSubmit={runform.handleSubmit}>
                        <div className="row mt-3">
                          <div className="col-lg-4 col-sm-6 mb-3 comn-input-main">
                            <label className="d-inline-flex align-items-center mb-2">First name</label>
                            <input className="form-control comn-input-style px-3" type="text" name="fullname" {...formAttr(runform, "fullname")} placeholder="Enter admin’s first name" />
                            {errorContainer(runform, "fullname")}
                          </div>
                          <div className="col-lg-4 col-sm-6 mb-3 comn-input-main">
                            <label className="d-inline-flex align-items-center mb-2">Last name</label>
                            <input className="form-control comn-input-style px-3" type="text" name="lastName" {...formAttr(runform, "lastName")} placeholder="Enter admin’s last name" />
                            {errorContainer(runform, "lastName")}
                          </div>
                          <div className="col-lg-4 col-sm-6 mb-3 comn-input-main">
                            <label className="d-inline-flex align-items-center mb-2">Email address</label>
                            <input className="form-control comn-input-style px-3" type="email" name="email" {...formAttr(runform, "email")} placeholder="Enter admin’s email" />
                            {errorContainer(runform, "email")}
                          </div>
                          <div className="col-lg-4 col-sm-6 mb-3 comn-input-main">
                            <label className="d-inline-flex align-items-center mb-2">User role</label>
                            <div className="comn-gray-form-select">
                              <select className="form-select  w-100" name="role" {...formAttr(runform, "role")}>
                                <option value="">-- User role --</option>
                                <option value="4">Admin</option>
                                <option value="5">Sub-admin</option>
                                <option value="6">Staff</option>
                                <option value="7">Contributor</option>
                              </select>
                              {errorContainer(runform, "role")}
                            </div>
                          </div>
                          <div className="col-lg-4 col-sm-6 mb-3 comn-input-main">
                            <label className="d-inline-flex align-items-center mb-2">Status</label>
                            <input className={"form-control comn-input-style px-3" + " " + (adminData.admin_status === 1 ? "comn-txt-class green-txt" : "comn-txt-class red-txt")} type="text" name="admin_status" {...formAttr(runform, "admin_status")} />
                            {errorContainer(runform, "admin_status")}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 set-box-head border-0">
                            <div className="permission-table">
                              <div className="dash-part-table-hdr">
                                <span>Permissions</span>
                              </div>
                              <div className="table-responsive">
                                <table className="table table-striped mb-0">
                                  <thead>
                                    <tr>
                                      <th scope="col">Module</th>
                                      <th scope="col">Read</th>
                                      <th scope="col">Write</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <th scope="row">Admin</th>
                                      <td>
                                        <label className="cust-chk-bx">
                                          <input type="radio" id="write-1" name="write-1" />
                                          <span className="cust-chkmark"></span>
                                        </label>
                                      </td>
                                      <td>
                                        <label className="cust-chk-bx">
                                          <input type="radio" id="write-1" name="write-1" />
                                          <span className="cust-chkmark"></span>
                                        </label>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Sub admin</th>
                                      <td>
                                        <label className="cust-chk-bx">
                                          <input type="radio" id="write-2" name="write-2" />
                                          <span className="cust-chkmark"></span>
                                        </label>
                                      </td>
                                      <td>
                                        <label className="cust-chk-bx">
                                          <input type="radio" id="write-2" name="write-2" />
                                          <span className="cust-chkmark"></span>
                                        </label>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Staff</th>
                                      <td>
                                        <label className="cust-chk-bx">
                                          <input type="radio" id="write-3" name="write-3" />
                                          <span className="cust-chkmark"></span>
                                        </label>
                                      </td>
                                      <td>
                                        <label className="cust-chk-bx">
                                          <input type="radio" id="write-3" name="write-3" />
                                          <span className="cust-chkmark"></span>
                                        </label>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Contributor</th>
                                      <td>
                                        <label className="cust-chk-bx">
                                          <input type="radio" id="write-4" name="write-4" />
                                          <span className="cust-chkmark"></span>
                                        </label>
                                      </td>
                                      <td>
                                        <label className="cust-chk-bx">
                                          <input type="radio" id="write-4" name="write-4" />
                                          <span className="cust-chkmark"></span>
                                        </label>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="row mt-4">
                              <div className="col-xxl-2 col-md-3 col-sm-4 mb-3">
                                <button type="submit" className="btn-comnn-purple  w-100">
                                  Save changes
                                </button>
                              </div>
                              <div className="col-xxl-2 col-md-3 col-sm-4 mb-3" onClick={() => setResetModalShow(true)}>
                                <button type="button" className="btn-comn-class-2 w-100">
                                  Reset
                                </button>
                              </div>
                              <div className="col-xxl-2 col-md-3 col-sm-4 mb-3" onClick={() => setDeclineModalShow(true)}>
                                <button type="button" className="btn-comn-class-2 btn-red-bg w-100">
                                  Delete user
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
      <Modal show={forgotmodalShow} onHide={() => setDeclineModalShow(false)} size="sm" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header className="p-4 pb-0">
          <h4 className="w-100 text-center">Confirm to delete</h4>
        </Modal.Header>
        <Modal.Body className="p-4 pt-0">
          <div className="text-center modal-data">
            <p className="mb-0">Are you sure to do this?</p>
            <div className="row">
              <div className="col-12 d-flex mt-3">
                <button className="comn-btn-class w-100 me-2" type="submit">
                  Delete
                </button>
                <button className="comn-btn-class cancle-btn-class w-100 ms-2" type="button" onClick={() => setDeclineModalShow(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={ResetmodalShow} onHide={() => setResetModalShow(false)} size="sm" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header className="p-4 pb-0">
          <h4 className="w-100 text-center">Confirm to reset</h4>
        </Modal.Header>
        <Modal.Body className="p-4 pt-0">
          <div className="text-center modal-data">
            <p className="mb-0">Are you sure to do this?</p>
            <div className="row">
              <div className="col-12 d-flex mt-3">
                <button className="comn-btn-class w-100 me-2" type="submit">
                  Yes
                </button>
                <button className="comn-btn-class cancle-btn-class w-100 ms-2" type="button" onClick={() => setResetModalShow(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
