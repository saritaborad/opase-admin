import React, { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import Instagram from "../images/instagram (2).png";
import Twitter from "../images/Twitter(2).png";
import Youtube from "../images/youtube.png";
import snapchat from "../images/snapchat.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Moment from "react-moment";
import User_Img from "../images/user.png";
import { toast } from "react-toastify";
import DeleteModal from "./modals/DeleteModal";

export default function TalentDetails() {
  const [forgotmodalShow, setDeclineModalShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [data, setData] = useState();
  const [pageName, setPageName] = useState();
  const location = useLocation();
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const delete_userShow = () => setDeleteShow(true);
  const delete_userClose = () => setDeleteShow(false);

  useEffect(() => {
    setPageName(location.state?.pagename);
    TalentDetailsData();
  }, []);

  const handleAccept = (status) => {
    TalentDetailsData(status);
    toast.success("Talent accepted!!");
    navigate("/talent");
  };

  const TalentDetailsData = (status = 0, message = "") => {
    let id = window.location.href?.split("/")?.pop();
    let data = { talentId: location.state?.talentId, status: status, message: message };

    const addTalentData = new Promise((resolve) => {
      resolve(PostApi(API_Path.getTalentDetails, data));
    });
    addTalentData.then((res) => {
      if (res.status === 200) {
        setData(res.data.data);
        setId(res.data?.data?.id);
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

  const submitMsgData = (formData, resetForm) => {
    TalentDetailsData(0, formData.message);
    resetForm(formData);
    setDeclineModalShow(false);
    navigate("/manage-talent");
  };

  const handleDeleteShow = () => {
    const data = { talentId: id };

    let addTalentData = new Promise((resolve) => {
      resolve(PostApi(API_Path.removeTalent, data));
    });
    addTalentData.then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        delete_userClose();
        TalentDetailsData();
        navigate("/talent");
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const formatNum = (num) => {
    return String(num)?.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1,");
  };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="row mt-5">
                  <div className=" col-md-6 col-sm-7">
                    <div className="d-md-flex">
                      <div className="profile_talent">
                        <img src={data?.image != "null" && data?.image !== "" ? data?.image : User_Img} alt="talent-profile" className="img-fluid" />
                      </div>
                      <div className="ms-0  ms-md-5  mt-3 mt-md-0 profile-talent-txt">
                        <h4 className="mb-3">{data && data.fullname}</h4>
                        <p className=" pt-2">{data && data.headline}</p>
                        <div className="talent-info-sec">
                          <div className="profile-talent-icon-txt me-3 mt-3">
                            <span>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                <path d="M17.6569 16.6569C16.7202 17.5935 14.7616 19.5521 13.4138 20.8999C12.6327 21.681 11.3677 21.6814 10.5866 20.9003C9.26234 19.576 7.34159 17.6553 6.34315 16.6569C3.21895 13.5327 3.21895 8.46734 6.34315 5.34315C9.46734 2.21895 14.5327 2.21895 17.6569 5.34315C20.781 8.46734 20.781 13.5327 17.6569 16.6569Z" stroke="#7C64F8" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z" stroke="#7C64F8" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              {data && data.country}
                            </span>
                          </div>
                          <div className="profile-talent-icon-txt  mt-3">
                            <span>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="#7C64F8" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              {data && data.phone}
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

                          {data?.date_of_birth !== null && (
                            <div className="profile-talent-icon-txt  mt-3">
                              <span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                  <path d="M9.17157 14.8284C10.7337 16.3905 13.2663 16.3905 14.8284 14.8284M15 10H14.99M9 10H8.99M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z" stroke="#7C64F8" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <Moment format="DD/MM/YYYY">{data && data.date_of_birth}</Moment>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {pageName !== "talent" ? (
                    <div className=" col-md-6 col-sm-5 mt-4 mt-sm-0">
                      <div className="d-flex">
                        <div className="me-3">
                          <span className="comn-status-class decline-class-2" onClick={() => setDeclineModalShow(true)}>
                            Decline
                          </span>
                        </div>
                        <div>
                          <span className="comn-status-class accept-class-2" onClick={() => handleAccept(1)}>
                            {data?.admin_status == 1 ? "Accepted" : "Accept"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className=" col-md-6 col-sm-5 mt-4 mt-sm-0">
                      <div className="d-flex justify-content-end">
                        <div className="me-3 w-25">
                          <span
                            className="comn-btn-class "
                            onClick={() => {
                              delete_userShow();
                            }}
                          >
                            Delete
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="comn-black-bg p-3">
                  <div className="row">
                    <div className="col-xl-5  talent-deatail-bottom-left-sec">
                      <div className="talent-btm-comn-title">
                        <span>Introduction</span>
                      </div>
                      <div className="instruction-txt mt-3">
                        <p className="mb-0">{data && data.about}</p>
                      </div>
                      {data && (data?.instagram_url || data?.twitter_url || data?.youtube_url || data?.snapchat_url) && (
                        <div className="talent-btm-comn-title mt-2">
                          <span>Social media accounts</span>
                        </div>
                      )}
                      {data?.instagram_url && (
                        <>
                          <div className="d-flex mt-2 align-items-center">
                            <div className="soc-media-accounts-detail">
                              <img src={Instagram} alt="soc_icon" className="me-2" />
                              <span>{data && data.instagram_url}</span>
                            </div>
                            {/* <div className="fans-txt">
                              <bdi className="me-1">Fans </bdi>
                              <b>{data && data.instagram_friend_number}</b>
                            </div> */}
                          </div>
                        </>
                      )}

                      {data?.twitter_url && (
                        <>
                          <div className="d-flex mt-2 align-items-center">
                            <div className="soc-media-accounts-detail">
                              <img src={Twitter} alt="soc_icon" className="me-2" />
                              <span>{data && data.twitter_url}</span>
                            </div>
                          </div>
                        </>
                      )}

                      {data?.snapchat_url && (
                        <>
                          <div className="d-flex mt-2 align-items-center">
                            <div className="soc-media-accounts-detail">
                              <img src={snapchat} alt="soc_icon" className="me-2" />
                              <span>{data && data.snapchat_url}</span>
                            </div>
                          </div>
                        </>
                      )}

                      {data?.youtube_url && (
                        <>
                          <div className="d-flex mt-2 align-items-center">
                            <div className="soc-media-accounts-detail">
                              <img src={Youtube} alt="soc_icon" className="me-2" />
                              <span>{data && data.youtube_url}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="col-xl-7 mt-4 mt-xl-0">
                      <div className="row h-100">
                        <div className="col-sm-5 talent-service-bottom-left-sec">
                          <div className="talent-btm-comn-title">
                            <span>Welcome video</span>
                          </div>
                          <div className="mt-3 ">
                            <Link to="#">
                              <div className="uploaded-video-main ">
                                <div className="position-relative img-black-shadow">
                                  {data &&
                                    data?.welcomeVideo.length > 0 &&
                                    data.welcomeVideo?.map((item, i) => {
                                      return (
                                        <video src={item.video_link} className="video-poster-img" controls>
                                          <source src={item.video_link}></source>
                                        </video>
                                      );
                                    })}
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div className="mt-3 d-flex px-2">
                            <div className="d-flex flex-column talent-detail-service">
                              <div className="talent-btm-comn-title">
                                <span>Welcome video</span>
                              </div>
                              <span className="mt-3">Chat</span>
                              <span className="mt-3">Video</span>
                              <span className="mt-3">24 hours delivery</span>
                            </div>
                            <div className="ms-auto text-start d-flex flex-column talent-detail-service talent-service-sec-left-bdi">
                              <bdi className="comn-txt-class purple-txt">:</bdi>
                              <bdi className="mt-3">${data && data.chat_price ? formatNum(data.chat_price) : 0}</bdi>
                              <bdi className="mt-3">${data && data.video_price ? formatNum(data.video_price) : 0}</bdi>
                              <bdi className="mt-3">${data && data.video_price_24 ? formatNum(data.video_price_24) : 0}</bdi>
                            </div>
                          </div>
                        </div>
                        {pageName === "talent" && (
                          <div className="col-sm-7">
                            <div className=" d-flex px-2">
                              <div className="d-flex flex-column talent-detail-service">
                                <span className="mt-3">Page views</span>
                                <span className="mt-3">Video views</span>
                                <span className="mt-3">Complated requests</span>
                                <span className="mt-3">Followers</span>
                                <span className="mt-3">Earnings</span>
                                <span className="mt-3">Declined requests</span>
                                <span className="mt-3">Status</span>
                              </div>
                              <div className="ms-auto text-start d-flex flex-column talent-detail-service">
                                <bdi className="mt-3">{data && data.profileView ? formatNum(data.profileView) : 0}</bdi>
                                <bdi className="mt-3">{data && data.viewVideo ? formatNum(data.viewVideo) : 0}</bdi>
                                <bdi className="mt-3">{data && data.complatedRequests ? formatNum(data.complatedRequests) : 0}</bdi>
                                <bdi className="mt-3">{data && data.followers ? formatNum(data.followers) : 0}</bdi>
                                <bdi className="mt-3">$ {data && data.earnings ? formatNum(data.earnings) : 0}</bdi>
                                <bdi className="mt-3">{data && data.declinedRequests ? formatNum(data.declinedRequests) : 0}</bdi>
                                <bdi className="mt-3 comn-txt-class purple-txt">{data && data.admin_status == 1 ? "Active" : "Deactive"}</bdi>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={deleteShow} onHide={delete_userClose} size="sm" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
          <DeleteModal headerString={"Delete talent account"} bodyString={"Are you sure you want to delete talent?"} closeModal={delete_userClose} callApi={handleDeleteShow} />
        </Modal>
      </UserLayout>
      {/* forgot password modal */}
      <Modal show={forgotmodalShow} onHide={() => setDeclineModalShow(false)} size="md" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="pt-0">
          <div className="text-center modal-data">
            <span>Reason</span>
            <div className="row mt-4">
              <Formik
                enableReinitialize
                initialValues={{ message: "" }}
                validationSchema={Yup.object({ message: Yup.string().required("Reason is required.") })}
                onSubmit={(formData, { resetForm }) => {
                  submitMsgData(formData, resetForm);
                }}
              >
                {(runform) => (
                  <form onSubmit={runform.handleSubmit}>
                    <div className="col-12 mb-4">
                      <textarea className="w-100 talent-info-main" {...formAttr(runform, "message")} name="message" rows={4} placeholder="Enter reason to decline"></textarea>
                      {errorContainer(runform, "message")}
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button className="comn-btn-class w-100 me-2" type="submit">
                          Decline
                        </button>
                      </div>
                      <div className="col-6">
                        <button className="comn-btn-class cancle-btn-class w-100 ms-2" type="submit" onClick={() => setDeclineModalShow(false)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
