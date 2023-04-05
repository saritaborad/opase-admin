import React, { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import RtdDatatable from "../components/DataTable/RtdDatatable";
import { Dropdown, Offcanvas } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./modals/DeleteModal";

export default function Admin(params) {
  const navigate = useNavigate();
  const [forgotmodalShow, setDeclineModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [admin, setAdmin] = useState([]);
  const [option, set_option] = useState({
    sizePerPage: 10,
    search: "",
    totalRecord: 0,
    page: 0,
    sort: "id",
    order: "DESC",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const delete_userShow = () => setDeclineModalShow(true);
  const delete_userClose = () => setDeclineModalShow(false);

  const columns = [
    // {
    //   value: "photo",
    //   label: "Photo",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (data, i) => {
    //       return (
    //         <div className="table-user-div d-flex align-items-center">
    //           <img src={User_Img} alt="product" className="img-fluid" />
    //         </div>
    //       );
    //     },
    //   },
    // },
    {
      value: "fullname",
      label: "Full name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "email",
      label: "Email address",
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      value: "role",
      label: "Role",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return (
            <div className="table-user-div d-flex align-items-center">
              <span>{data[i].role === 4 ? "admin" : data[i].role === 5 ? "sub-admin" : data[i].role === 6 ? "Staff" : data[i].role === 7 && "cancelled"}</span>
            </div>
          );
        },
      },
    },
    {
      value: "admin_status",
      label: "Status",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return (
            <div>
              <span className="comn-status-class">
                <p className={data[i].admin_status === 1 ? "active-class" : "deactive-class"}>{data[i].admin_status === 1 ? "Active" : "Inactive"}</p>
              </span>
            </div>
          );
        },
      },
    },
    {
      value: "_id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return (
            <div className="table-ed-drop">
              <Dropdown drop="left">
                <Dropdown.Toggle className="table-dropdown-btn" id="dropdown-basic">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* <Dropdown.Item href="/adminedit">
                    <bdi className="d-flex align-items-center">
                      <svg width="16" height="16" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 14C8.35987 14.0204 6.7367 13.6664 5.254 12.965C4.10469 12.4042 3.07265 11.6297 2.213 10.683C1.30243 9.7041 0.585467 8.56164 0.1 7.31598L0 6.99998L0.105 6.68398C0.590815 5.43941 1.30624 4.29725 2.214 3.31698C3.07334 2.37029 4.10504 1.59584 5.254 1.03498C6.73671 0.333567 8.35988 -0.0204101 10 -2.11214e-05C11.6401 -0.0203749 13.2633 0.333601 14.746 1.03498C15.8953 1.59571 16.9274 2.37017 17.787 3.31698C18.6993 4.29453 19.4165 5.43734 19.9 6.68398L20 6.99998L19.895 7.31598C18.3262 11.3998 14.3742 14.0693 10 14ZM10 1.99998C6.59587 1.89331 3.47142 3.87507 2.117 6.99998C3.4712 10.1251 6.59579 12.1069 10 12C13.4041 12.1064 16.5284 10.1247 17.883 6.99998C16.5304 3.87356 13.4047 1.89106 10 1.99998ZM10 9.99998C8.55733 10.0095 7.30937 8.99734 7.02097 7.58375C6.73256 6.17017 7.48427 4.75 8.81538 4.19364C10.1465 3.63728 11.6852 4.10011 12.4885 5.29849C13.2919 6.49686 13.1354 8.09606 12.115 9.11598C11.5563 9.68124 10.7948 9.99954 10 9.99998Z" fill="#1A202C" />
                      </svg>
                      <span className="ms-2">View </span>
                    </bdi>
                  </Dropdown.Item> */}
                  <Dropdown.Item
                    onClick={() => {
                      adminDetailsData(data[i].id);
                    }}
                  >
                    <bdi className="d-flex align-items-center justify-content-center">
                      {/* <svg width="16" height="16" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.41999 19.079C1.13948 19.0785 0.872062 18.9603 0.682993 18.753C0.490439 18.5475 0.394758 18.2695 0.419993 17.989L0.664993 15.295L11.983 3.98103L15.52 7.51703L4.20499 18.83L1.51099 19.075C1.47999 19.078 1.44899 19.079 1.41999 19.079ZM16.226 6.81003L12.69 3.27403L14.811 1.15303C14.9986 0.965251 15.2531 0.859741 15.5185 0.859741C15.7839 0.859741 16.0384 0.965251 16.226 1.15303L18.347 3.27403C18.5348 3.4616 18.6403 3.71612 18.6403 3.98153C18.6403 4.24694 18.5348 4.50146 18.347 4.68903L16.227 6.80903L16.226 6.81003Z" fill="#fff" />
                      </svg> */}
                      <span className="">Edit</span>
                    </bdi>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <bdi className="d-flex align-items-center justify-content-center" onClick={delete_userShow}>
                      {/* <svg width="16" height="16" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 20H4C2.89543 20 2 19.1046 2 18V5H0V3H4V2C4 0.89543 4.89543 0 6 0H12C13.1046 0 14 0.89543 14 2V3H18V5H16V18C16 19.1046 15.1046 20 14 20ZM4 5V18H14V5H4ZM6 2V3H12V2H6ZM12 16H10V7H12V16ZM8 16H6V7H8V16Z" fill="#fff" />
                      </svg> */}
                      <span className="">Delete</span>
                    </bdi>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          );
        },
      },
    },
  ];

  const adminDetailsData = (id) => {
    navigate(`/admin-edit`, { state: { id: id } });
  };

  useEffect(() => {
    getAdminData();
  }, []);

  const getAdminData = () => {
    let data = { option: option };
    let addAdminData = new Promise((resolve) => {
      resolve(PostApi(API_Path.getAdmin, data));
    });
    addAdminData.then((res) => {
      if (res.status === 200) {
        set_option({ ...option, totalRecord: res.data.data.totalRecord });
        setAdmin(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const submitFormData = (formData, resetForm) => {
    const data = {
      fullname: formData.firstName,
      email: formData.email,
      user_role: formData.role,
      password: formData.password,
    };
    const addAdminUser = new Promise((resolve) => {
      resolve(PostApi(API_Path.addAdmin, data));
    });
    addAdminUser.then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        resetForm(formData);
        getAdminData();
      } else {
        toast.error(res.data.message);
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

  const tableCallBack = (option) => {
    set_option(option);
    getAdminData();
  };

  const handleDelete1 = () => {
    delete_userClose();
  };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mt-3">
                <div className="d-sm-flex align-items-center">
                  <div className="comn-title-main d-block  d-sm-flex justify-content-between">
                    <h1 className="mb-0">Admin</h1>
                  </div>
                  <div className="mt-sm-0 mt-3 ms-auto comn-gray-form-select">
                    <button className="btn-comnn-purple" onClick={handleShow}>
                      Add admin
                    </button>

                    <Offcanvas className="admin-offcanvase-main" show={show} onHide={handleClose} placement="end">
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Add new admin</Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <Formik
                          enableReinitialize
                          initialValues={{
                            firstName: "",
                            lname: "",
                            email: "",
                            role: "",
                            password: "",
                          }}
                          validationSchema={Yup.object({
                            firstName: Yup.string().required("First name is required."),
                            lname: Yup.string().required("Last name is required."),
                            email: Yup.string().required("Email is required."),
                            password: Yup.string().required("Password is required."),
                            role: Yup.string().required("Role is required."),
                          })}
                          onSubmit={(formData, { resetForm }) => {
                            submitFormData(formData, resetForm);
                          }}
                        >
                          {(runform) => (
                            <form className="row" onSubmit={runform.handleSubmit}>
                              <div className="col-12 mb-3">
                                <label className="d-inline-flex align-items-center mb-2">First name</label>
                                <input className="form-control comn-input-style px-3" type="text" {...formAttr(runform, "firstName")} placeholder="Jone" name="firstName" />
                                {errorContainer(runform, "firstName")}
                              </div>
                              <div className="col-12 mb-3">
                                <label className="d-inline-flex align-items-center mb-2">Last name</label>
                                <input className="form-control comn-input-style px-3" type="text" {...formAttr(runform, "lname")} placeholder="Doe" name="lname" />
                                {errorContainer(runform, "lname")}
                              </div>
                              <div className="col-12 mb-3">
                                <label className="d-inline-flex align-items-center mb-2">Email address</label>
                                <input className="form-control comn-input-style px-3" type="email" {...formAttr(runform, "email")} placeholder="Jonedoe@gmail.com" name="email" />
                                {errorContainer(runform, "email")}
                              </div>
                              <div className="col-12 mb-3">
                                <label className="d-inline-flex align-items-center mb-2">Role</label>
                                <div className="comn-gray-form-select">
                                  <select className="form-select  w-100" name="role" {...formAttr(runform, "role")}>
                                    <option value="0">User role</option>
                                    <option value="4">Admin</option>
                                    <option value="5">Sub-Admin</option>
                                    <option value="6">Staff</option>
                                    <option value="7">Contributor</option>
                                  </select>
                                </div>
                                {errorContainer(runform, "role")}
                              </div>
                              <div className="col-12 mb-3">
                                <label className="d-inline-flex align-items-center mb-2">Default password</label>
                                <input className="form-control comn-input-style px-3" type="password" {...formAttr(runform, "password")} placeholder="********" name="password" />
                                {errorContainer(runform, "password")}
                              </div>
                              <div className="col-lg-12 my-4 d-flex justify-content-center">
                                <div className="col-6">
                                  <button className="comn-btn-class w-100 me-2" type="submit">
                                    Add admin
                                  </button>
                                </div>
                                <div className="col-6" onClick={() => handleClose()}>
                                  <button className="comn-btn-class cancle-btn-class w-100 ms-2" type="button">
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </form>
                          )}
                        </Formik>
                      </Offcanvas.Body>
                    </Offcanvas>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="comn-table-black-bg">
                  <div className="mt-3">
                    <RtdDatatable option={option} data={admin} columns={columns} tableCallBack={tableCallBack} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={forgotmodalShow} onHide={delete_userClose} size="sm" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
          <DeleteModal headerString={"Delete admin account"} bodyString={"Are you sure you want to delete admin account?"} closeModal={delete_userClose} callApi={handleDelete1} />
        </Modal>
      </UserLayout>
    </>
  );
}
