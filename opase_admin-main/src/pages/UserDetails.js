import React, { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import Download_icon from "../images/download icon.svg";
import { useLocation } from "react-router-dom";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import Moment from "react-moment";
import RtdDatatable from "../components/DataTable/RtdDatatable";
import User_Img from "../images/user.png";
import { toast } from "react-toastify";

export default function UserDetails(params) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [paymentData, setpaymentData] = useState([]);
  const [option, set_option] = useState({
    sizePerPage: 10,
    search: "",
    totalRecord: 0,
    page: 0,
    sort: "id",
    order: "DESC",
  });
  const columns = [
    {
      value: "invoice",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <span>#{data[i].invoice}</span>;
        },
      },
    },
    {
      value: "fullname",
      label: "Talent name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "created_at",
      label: "Date",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <Moment format="DD/MM/YYYY">{data[i].created_at}</Moment>;
        },
      },
    },

    {
      value: "chat_request",
      label: "Plan",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <span className="comn-txt-class">{data[i].chat_request === 1 ? "Chat request" : "Video request"}</span>;
        },
      },
    },
    {
      value: "amount",
      label: "Amount",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <span>${data[i].amount ? data[i].amount : "0"}</span>;
        },
      },
    },
    {
      value: "payment_type",
      label: "Status",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <span className={data[i].payment_type === 1 ? "comn-txt-class green-txt" : "comn-txt-class red-txt"}>{data[i].payment_type === 1 ? "paid" : "Unpaid"}</span>;
        },
      },
    },
    {
      value: "Payment_Receipt",
      label: "Payment receipt",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({ className: "text-center" }),
        setCellHeaderProps: () => ({ className: "text-center" }),
        customBodyRender: (data, i) => {
          return (
            <div>
              <a to="#">
                <img src={Download_icon} />
              </a>
            </div>
          );
        },
      },
    },
  ];

  const location = useLocation();
  let id = location.state.id;

  useEffect(() => {
    getUserDetailsData();
    getPayment();
  }, []);

  let getUserDetailsData = () => {
    let data = { id: id, option: option };
    const addUserDetail = new Promise((resolve) => {
      resolve(PostApi(API_Path.getUsersDetails, data));
    });
    addUserDetail.then((res) => {
      if (res.status === 200) {
        setData(res.data.data);
        setpaymentData(res.data.data?.paymentHistory);
        set_option({ ...option, totalRecord: res.data.data.totalRecord });
        // toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const getPayment = () => {
    let data = { orderId: id };
    const addPaymentReceipt = new Promise((resolve) => {
      resolve(PostApi(API_Path.getPaymentReceipt, data));
    });
    addPaymentReceipt.then((res) => {
      if (res.status === 200) {
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const tableCallBack = (option) => {
    set_option(option);
    getUserDetailsData();
  };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="row mt-5">
                  <div className=" col-xl-6">
                    <div className="d-sm-flex">
                      <div className="profile_talent">
                        <img src={data?.image !== "null" && data?.image !== "" ? data?.image : User_Img} alt="talent-profile" className="img-fluid" name="image" />
                      </div>
                      <div className="ms-0 ms-sm-5 mt-3 mt-md-0 profile-talent-txt">
                        <h4 className="mb-3">{data && data.user_name}</h4>
                        <p className="pt-2">
                          <span className="comn-status-class">
                            <bdi className={data && data?.admin_status === 1 ? "active-class " : "deactive-class"}>{data && data?.admin_status === 1 ? "Active" : "Inactive"}</bdi>
                          </span>
                        </p>
                        <div className="talent-info-sec">
                          <div className="profile-talent-icon-txt me-3 mt-3">
                            <span>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="#7C64F8" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              {data && data.phone}
                            </span>
                          </div>
                          <div className="profile-talent-icon-txt mt-3">
                            <span>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 4H0V18C0 19.1 0.9 20 2 20H16V18H2V4ZM18 0H6C4.9 0 4 0.9 4 2V14C4 15.1 4.9 16 6 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H6V2H18V14ZM10 3.5V12.5L16 8L10 3.5Z" fill="#7C64F8" />
                              </svg>
                              {data && data.video}
                            </span>
                          </div>
                        </div>
                        <div className="talent-info-sec">
                          <div className="profile-talent-icon-txt me-3 mt-3">
                            <span>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="#7C64F8" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              {data && data.email}
                            </span>
                          </div>
                          <div className="profile-talent-icon-txt mt-3">
                            <span>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 2V16L4.8 12.4C5.14582 12.1396 5.56713 11.9992 6 12H14C15.1046 12 16 11.1046 16 10V2C16 0.89543 15.1046 0 14 0H2C0.89543 0 0 0.89543 0 2ZM2 12V2H14V10H5.334C4.90107 9.99884 4.47964 10.1393 4.134 10.4L2 12Z" fill="#7C64F8" />
                                <path d="M20 20V7C20 5.89543 19.1046 5 18 5V16L15.866 14.4C15.5204 14.1393 15.0989 13.9988 14.666 14H5C5 15.1046 5.89543 16 7 16H14C14.4329 15.9992 14.8542 16.1396 15.2 16.4L20 20Z" fill="#7C64F8" />
                              </svg>
                              {data && data.chat}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" col-xl-6"></div>
                </div>
              </div>
              {data?.about && (
                <div className="col-12">
                  <div className="user-instruction-class my-3">
                    <bdi>Instruction</bdi>

                    <p>{data && data.about}</p>
                  </div>
                </div>
              )}
              <div className="col-12 mt-3">
                <div>
                  <h4>Payment history</h4>
                </div>
                <div className="comn-table-black-bg">
                  <div className="mt-3">
                    <RtdDatatable option={option} columns={columns} data={paymentData} tableCallBack={tableCallBack} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
}
