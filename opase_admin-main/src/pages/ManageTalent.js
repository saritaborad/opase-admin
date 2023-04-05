import React, { useState, useMemo, useEffect, useRef } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import UserLayout from "../components/UserLayout";
import { Tab, Nav } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Instagram from "../images/instagram.png";
import Twitter from "../images/twitter.png";
import Youtube from "../images/youtube.png";
import snapchat from "../images/snapchat.png";
import tiktok from "../images/tiktok.png";
import Cloud_Img from "../images/cloud-upload.svg";
import RtdDatatable from "../components/DataTable/RtdDatatable";
import { Formik } from "formik";
import * as Yup from "yup";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { useNavigate } from "react-router-dom";
import User_Img from "../images/user.png";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ManageTalent(params) {
  const [key, Setkey] = useState("first");
  const [submitkey, setsubmitkey] = useState(false);
  const [forgotmodalShow, setDeclineModalShow] = useState(false);
  const [country, setCountry] = useState("");
  const [images, setImages] = useState(null);
  const [video, setVideo] = useState(null);
  const [youtubeurl, setYoutubeurl] = useState("");
  const [twitterurl, setTwitterurl] = useState("");
  const [linkedinurl, setLinkedinurl] = useState("");
  const [snapchaturl, setSnapchaturl] = useState("");
  const [instagramurl, setInstagramurl] = useState("");
  const [tiktokurl, setTiktokurl] = useState("");
  const [facebookFriendnumber, setFacebookFriendnumber] = useState("");
  const [twitterFriendnumber, setTwitterFriendnumber] = useState("");
  const [linkedinFriendnumber, setLinkedinFriendnumber] = useState("");
  const [snapchatFriendnumber, setSnapchatFriendnumber] = useState("");
  const [instagramFriendnumber, setInstagramFriendnumber] = useState("");
  const [tiktokurlFriendnumber, setTiktokurlFriendnumber] = useState("");
  const [talent, setTalent] = useState([]);
  const [resion, setResion] = useState("");
  const [phone, setPhone] = useState("");
  const [CountryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [id, setId] = useState("");
  const [video24hr, setVideo24hr] = useState("");
  const [urlerror, seturlerror] = useState(false);
  const [submit_state, setsubmitstate] = useState(false);
  const [opencard, setOpenCard] = useState(true);
  const [highlight, setHighlight] = useState(false);
  const [videoPrice, setVideoPrice] = useState("");
  const [textAreaCount, ChangeTextAreaCount] = useState(0);
  const telentForm = useRef();
  const navigate = useNavigate();
  let countryOptions = useMemo(() => countryList().getData(), []);

  const [option, set_option] = useState({
    sizePerPage: 10,
    search: "",
    totalRecord: 0,
    page: 0,
    sort: "id",
    order: "DESC",
  });

  const changeHandler = (country) => {
    setCountry(country);
    telentForm.current.setFieldValue("country", country);
  };

  const talentDetailsData = (id) => {
    navigate(`/talent-details`, { state: { talentId: id, pagename: "managetalent" } });
  };

  const handleAccept = () => {
    toast.success("Talent Accepted!!");
    navigate("/talent");
  };

  const checkDefault = (e) => {
    if (e.target.checked) {
      setOpenCard(true);
    } else {
      setOpenCard(false);
    }
  };

  const columns = [
    {
      value: "image",
      label: "Photo",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, i) => {
          return (
            <div
              className="table-user-div d-flex align-items-center"
              onClick={() => {
                talentDetailsData(data[i].id);
              }}
            >
              {data[i].image !== "null" && data[i].image !== "" ? <img src={data[i].image} alt="product" className="img-fluid" width="50px" /> : <img src={User_Img} alt="product" className="img-fluid" width="50px" />}
            </div>
          );
        },
      },
    },
    {
      value: "fullname",
      label: "Name",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      value: "email",
      label: "Email address",
      options: {
        filter: false,
        sort: true,
      },
    },

    {
      value: "chat_price",
      label: "Chat price",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, i) => {
          return <a href={data[i].chat_price}>{data[i].chat_price ? data[i].chat_price : "0"}</a>;
        },
      },
    },
    {
      value: "video_price",
      label: "Video price",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, i) => {
          return <a href={data[i].video_price}>{data[i].video_price ? data[i].video_price : "0"}</a>;
        },
      },
    },
    {
      label: "Action",
      value: "Action",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, i) => {
          setId(data[i].id);
          return (
            <div className="d-flex  text-start">
              <div onClick={() => getmanageData(data[i].id, 1)}>
                <span className="comn-status-class accept-class accept" onClick={() => handleAccept()}>
                  Accept
                </span>
              </div>
              <div className="comn-status-class ms-3" onClick={() => getmanageData(data[i].id, 0)}>
                <span className="decline-class" onClick={() => setDeclineModalShow(true)}>
                  Decline
                </span>
              </div>
            </div>
          );
        },
      },
    },
  ];

  useEffect(() => {
    getmanageData();
  }, []);

  const tableCallBack = (option) => {
    set_option(option);
    getmanageData();
  };

  const getmanageData = (id, status, resion) => {
    let data = { userId: id, status: status, message: resion, option: option };
    let manageverifyData = new Promise((resolve) => {
      resolve(PostApi(API_Path.managetalentStatus, data));
    });
    manageverifyData.then((res) => {
      if (res.status === 200) {
        set_option({ ...option, totalRecord: res.data.data.totalRecord });
        setTalent(res.data.data.talent);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const videoFile = (e) => {
    setVideo(() => e.target.files[0]);
    telentForm.current.setFieldValue("video", e.target.files[0].name);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const imageFile = (e) => {
    const image = e.target.files[0];
    if (image.size < 5242880) {
      const image = new Image();
      let fr = new FileReader();
      fr.onload = function () {
        if (fr !== null && typeof fr.result == "string") {
          image.src = fr.result;
        }
      };
      fr.readAsDataURL(e.target.files[0]);
      image.onload = () => {
        if (image.width < 257 && image.height < 257) {
          setImages(e.target.files[0]);
        } else {
          toast.error("Please upload your image less than or equal to 256px * 256px ");
          e.target.value = null;
        }
      };
    } else {
      toast.error("Please upload image of size less than 5MB");
      e.target.value = null;
    }
  };

  const errorContainer = (form, field) => {
    ChangeTextAreaCount(form.values.about?.length);
    return form.touched[field] && form.errors[field] ? <span className="error text-danger">{form.errors[field]}</span> : null;
  };

  const formAttr = (form, field) => ({
    onBlur: form.handleBlur,
    onChange: form.handleChange,
    value: form.values[field],
  });

  const submitFormData = (formData, resetForm) => {
    submitForm();
    ChangeTextAreaCount(formData.about?.length);
    setsubmitkey(false);

    let data = new FormData();
    data.append("username", "e5454");
    data.append("fullname", formData.fullname);
    data.append("phone", phone);
    data.append("email", formData.email);
    data.append("country", country.label);
    data.append("about", formData.about);
    data.append("headline", formData.headline);
    data.append("video", video);
    data.append("images", images);
    data.append("youtubeurl", youtubeurl);
    data.append("facebookurl", "");
    data.append("youtubeFriendnumber", "");
    data.append("facebookFriendnumber", "");
    data.append("twitterurl", twitterurl);
    data.append("twitterFriendnumber", twitterFriendnumber);
    data.append("linkedinurl", "");
    data.append("linkedinFriendnumber", linkedinFriendnumber);
    data.append("snapchaturl", snapchaturl);
    data.append("snapchatFriendnumber", snapchatFriendnumber);
    data.append("instagramurl", instagramurl);
    data.append("instagramFriendnumber", instagramFriendnumber);
    data.append("tiktokurl", tiktokurl);
    data.append("tiktokFriendnumber", tiktokurlFriendnumber);
    data.append("chatPrice", formData.chatPrice);
    data.append("chatTime", formData.chatTime);
    data.append("videoPrice", formData.videoPrice);
    data.append("videoTime", formData.videoTime);
    data.append("video24hr", formData.video24hr);
    data.append("countrycode", CountryCode);
    data.append("countrysurname", countryName);
    let manageTalentData = new Promise((resolve) => {
      resolve(PostApi(API_Path.registerTalent, data));
    });
    manageTalentData.then((res) => {
      getmanageData();
      if (res.status === 200) {
        resetForm(formData);
        toast.success(res.data.message);
        navigate("/talent");
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const submitMsgData = (formData, resetForm) => {
    resetForm(formData);
    getmanageData(id, 0, formData.resion);
    setResion(formData.resion);
    setDeclineModalShow(false);
  };

  const customStyles = {
    option: (provided, state) => ({
      color: state.isSelected ? "#fff" : "#7c64f8",
      backgroundColor: state.isSelected ? "#7c64f8" : "#212529",
      padding: 10,
      cursor: "pointer",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
  };

  const handlePhone = (phone, country) => {
    setCountryCode(country.dialCode);
    setCountryName(country.countryCode);
    setPhone(phone);
    if (phone > 9) {
      telentForm.current.setFieldValue("phone", phone);
    }
  };

  const isValidUrl = (urlString) => {
    var res = urlString.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return res !== null;
  };

  const setsocialurl = (e, type) => {
    if (isValidUrl(e.target.value)) {
      for (let i = 1; i < 6; i++) {
        document.getElementById(`url-error-${i}`).classList.remove("active");
      }
    } else {
      for (let i = 1; i < 6; i++) {
        document.getElementById(`url-error-${i}`).classList.add("active");
      }
      seturlerror(true);
    }
    if (type === "youtubeurl") {
      setYoutubeurl(e.target.value);
    }
    if (type === "instagramurl") {
      setInstagramurl(e.target.value);
    }
    if (type === "twitterurl") {
      setTwitterurl(e.target.value);
    }
    // if (type === "linkedinurl") {
    //   setLinkedinurl(e.target.value);
    // }
    if (type === "snapchaturl") {
      setSnapchaturl(e.target.value);
    }
    if (type === "tiktokurl") {
      setTiktokurl(e.target.value);
    }
  };

  const submitForm = () => {
    setsubmitstate(true);
    if (key === "first") {
      if (youtubeurl === "") {
        for (let i = 1; i < 6; i++) {
          document.getElementById(`url-error-${i}`).classList.add("active");
        }
        setsubmitkey(false);
      } else {
        if (isValidUrl(youtubeurl)) {
          for (let i = 1; i < 6; i++) {
            document.getElementById(`url-error-${i}`).classList.remove("active");
          }
          setsubmitkey(true);
        } else {
          for (let i = 1; i < 6; i++) {
            document.getElementById(`url-error-${i}`).classList.add("active");
          }
          setsubmitkey(false);
        }
      }
    } else if (key === "second") {
      if (instagramurl === "") {
        for (let i = 1; i < 6; i++) {
          document.getElementById(`url-error-${i}`).classList.add("active");
        }
        setsubmitkey(false);
      } else {
        if (isValidUrl(instagramurl)) {
          for (let i = 1; i < 6; i++) {
            document.getElementById(`url-error-${i}`).classList.remove("active");
          }
          setsubmitkey(true);
        } else {
          for (let i = 1; i < 6; i++) {
            document.getElementById(`url-error-${i}`).classList.add("active");
          }
          setsubmitkey(false);
        }
      }
    } else if (key === "third") {
      if (twitterurl === "") {
        for (let i = 1; i < 6; i++) {
          document.getElementById(`url-error-${i}`).classList.add("active");
        }
        setsubmitkey(false);
      } else {
        if (isValidUrl(twitterurl)) {
          for (let i = 1; i < 6; i++) {
            document.getElementById(`url-error-${i}`).classList.remove("active");
          }
          setsubmitkey(true);
        } else {
          for (let i = 1; i < 6; i++) {
            document.getElementById(`url-error-${i}`).classList.add("active");
          }
          setsubmitkey(false);
        }
      }
    } else if (key === "four") {
      if (snapchaturl === "") {
        for (let i = 1; i < 6; i++) {
          document.getElementById(`url-error-${i}`).classList.add("active");
        }
        setsubmitkey(false);
      } else {
        if (isValidUrl(snapchaturl)) {
          for (let i = 1; i < 6; i++) {
            document.getElementById(`url-error-${i}`).classList.remove("active");
          }
          setsubmitkey(true);
        } else {
          for (let i = 1; i < 6; i++) {
            document.getElementById(`url-error-${i}`).classList.add("active");
          }
          setsubmitkey(false);
        }
      }
    } else if (key === "five") {
      if (tiktokurl === "") {
        for (let i = 1; i < 6; i++) {
          document.getElementById(`url-error-${i}`).classList.add("active");
        }
        setsubmitkey(false);
      } else {
        if (isValidUrl(tiktokurl)) {
          for (let i = 1; i < 6; i++) {
            document.getElementById(`url-error-${i}`).classList.remove("active");
          }
          setsubmitkey(true);
        } else {
          for (let i = 1; i < 6; i++) {
            document.getElementById(`url-error-${i}`).classList.add("active");
          }
          setsubmitkey(false);
        }
      }
    }
  };

  const setSocialKey = (e) => {
    seturlerror(false);
    setsubmitkey(false);
    Setkey(e);
    if (e === "first") {
      if (youtubeurl !== "") {
        if (!isValidUrl(youtubeurl)) {
          seturlerror(true);
          setsubmitkey(true);
        } else {
          document.getElementById(`url-error-1`).classList.remove("active");
        }
      } else {
        if (submit_state) {
          for (let i = 1; i < 6; i++) {
            document.getElementById(`url-error-${i}`).classList.add("active");
          }
        }
      }
    }
    if (e === "second") {
      if (instagramurl !== "") {
        if (!isValidUrl(instagramurl)) {
          seturlerror(true);
          setsubmitkey(true);
        } else {
          document.getElementById(`url-error-2`).classList.remove("active");
        }
      } else {
        if (submit_state) {
          for (let i = 1; i < 6; i++) {
            document.getElementById(`url-error-${i}`).classList.add("active");
          }
        }
      }
    }
    if (e === "third") {
      if (twitterurl !== "") {
        if (!isValidUrl(twitterurl)) {
          seturlerror(true);
          setsubmitkey(true);
        } else {
          document.getElementById(`url-error-3`).classList.remove("active");
        }
      } else {
        if (submit_state) {
          for (let i = 1; i < 6; i++) {
            document.getElementById(`url-error-${i}`).classList.add("active");
          }
        }
      }
    }
    if (e === "four") {
      if (snapchaturl !== "") {
        if (!isValidUrl(snapchaturl)) {
          seturlerror(true);
          setsubmitkey(true);
        } else {
          document.getElementById(`url-error-4`).classList.remove("active");
        }
      } else {
        if (submit_state) {
          for (let i = 1; i < 6; i++) {
            document.getElementById(`url-error-${i}`).classList.add("active");
          }
        }
      }
    }
    if (e === "five") {
      if (tiktokurl !== "") {
        if (!isValidUrl(tiktokurl)) {
          setsubmitkey(true);
          seturlerror(true);
        } else {
          document.getElementById(`url-error-5`).classList.remove("active");
        }
      } else {
        if (submit_state) {
          for (let i = 1; i < 6; i++) {
            document.getElementById(`url-error-${i}`).classList.add("active");
          }
        }
      }
    }
  };

  const handlehighlight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(true);
  };

  const handleunhighlight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);

    let dt = e.dataTransfer;
    let files = dt.files;
    setVideo(() => files[0]);
  };

  const handlePrice = (e) => {
    setVideoPrice(e.target.value);
    if (e.target.value === "") {
      setVideo24hr(0);
    } else {
      let videoPrice = parseInt(e.target.value) + (parseInt(e.target.value) * 40) / 100;
      setVideo24hr(videoPrice);
    }
  };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 my-3">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <div className="col-12 mt-3">
                    <div className="d-sm-flex align-items-center">
                      <div className="talent-tab-sec">
                        <Nav variant="pills">
                          <Nav.Item>
                            <Nav.Link eventKey="first">Verify talent</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="second">Onboard talent</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>
                      <div className="mt-sm-0 mt-3 ms-auto comn-gray-form-select border-class">
                        <select className="form-select  w-100" name="all">
                          <option className="cmn-online-payment" value="">
                            All
                          </option>
                          <option value="dec">Decline</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="tab-content-sec">
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <div className="col-12 mt-3">
                          <div className="comn-table-black-bg">
                            <div className="mt-3">
                              <RtdDatatable option={option} columns={columns} data={talent} tableCallBack={tableCallBack} />
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Formik
                          innerRef={telentForm}
                          initialValues={{
                            fullname: "",
                            phone: phone,
                            email: "",
                            headline: "",
                            about: "",
                            video: "",
                            // username: "",
                            videoPrice: videoPrice,
                            chatPrice: "",
                            chatTime: "",
                            videoTime: "",
                            video24hr: video24hr,
                            country: country,
                          }}
                          validationSchema={Yup.object({
                            // username: Yup.string().required("Username is required"),
                            fullname: Yup.string().required("Full name is required."),
                            email: Yup.string().email().required("Email is required."),
                            phone: Yup.string().required("Phone number is required.").nullable(),
                            country: Yup.object().required("Country is required.").nullable(),
                            headline: Yup.string().required("Headline is required."),
                            about: Yup.string().required("About is required."),
                            video: Yup.string().required("Video is required.").nullable(),
                            videoPrice: Yup.string().required("Video price is required."),
                            chatPrice: Yup.string().required("Chat price is required."),
                            chatTime: Yup.string().required("Chat time is required."),
                            videoTime: Yup.string().required("Video time is required."),
                          })}
                          onSubmit={
                            submitkey
                              ? (formData, { resetForm }) => submitFormData(formData, resetForm)
                              : () => {
                                  submitForm();
                                }
                          }
                        >
                          {(runform) => (
                            <form className="row" onSubmit={runform.handleSubmit}>
                              <div className="col-12 mt-3">
                                <div className="comn-black-bg p-3">
                                  <div className="row justify-content-between">
                                    <div className="col-12 mb-4 mt-5 manage-talent-black-bg">
                                      <div className="upload-talent-profile">
                                        <div className="me-5 ms-3">
                                          <img src={images !== null ? URL.createObjectURL(images) : User_Img} alt="talent-profile" className="img-fluid img-details" />
                                        </div>
                                        <div className="mt-3 mt-sm-0">
                                          <span>Upload your profile</span>
                                          <p className="mt-1">You can upload image of max size of 5mb. Image will be cropped to 256*256px.</p>
                                          <div className="mt-3">
                                            <label className="upload-btn-file" htmlFor="image-bg-upload">
                                              <div className="d-flex">
                                                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-1">
                                                  <path d="M12.6268 13H10.3372C9.70617 13 9.19239 12.5589 9.19239 12.0172V7.49607H6.67383C6.07029 7.49607 5.76074 6.87334 6.17744 6.49907L10.9856 2.17455C11.2448 1.94182 11.7201 1.94182 11.9793 2.17455L16.7874 6.49907C17.2032 6.87334 16.8937 7.49607 16.2901 7.49607H13.7716V12.0172C13.7716 12.5589 13.2578 13 12.6268 13Z" fill="white" />
                                                  <path d="M18.7507 18H4.22982C3.54628 18 2.99023 17.4112 2.99023 16.6875V16.3125C2.99023 15.5888 3.54628 15 4.22982 15H18.7507C19.4342 15 19.9902 15.5888 19.9902 16.3125V16.6875C19.9902 17.4112 19.4342 18 18.7507 18Z" fill="white" />
                                                </svg>
                                                Upload image
                                              </div>
                                            </label>
                                            <input id="image-bg-upload" accept="image/*" name={images} onChange={imageFile} type="file" className="d-none " />
                                            {errorContainer(runform, "images")}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6  my-3 comn-input-main service-fix-box ">
                                      <label className="d-inline-flex align-items-center mb-2">Full name</label>
                                      <input className="form-control comn-input-style px-3" type="text" {...formAttr(runform, "fullname")} placeholder="Enter talent’s full name" name="fullname" />
                                      {errorContainer(runform, "fullname")}
                                      <label className="d-inline-flex align-items-center mb-2 mt-3">Phone number</label>
                                      <div className=" position-relative">
                                        <PhoneInput
                                          name="phone"
                                          country="us"
                                          type="number"
                                          CountryCode
                                          className="marginBottom country-tel-div"
                                          value={phone}
                                          onChange={(value, country) => {
                                            handlePhone(value, country);
                                          }}
                                        />
                                        {errorContainer(runform, "phone")}
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6  my-3 comn-input-main service-fix-box">
                                      <label className="d-inline-flex align-items-center mb-2">Headline</label>
                                      <div className="position-relative">
                                        <input className="form-control comn-input-style px-3" type="text" {...formAttr(runform, "headline")} placeholder="youtuber" name="headline" />
                                        {errorContainer(runform, "headline")}
                                      </div>
                                      <label className="d-inline-flex align-items-center mb-2 mt-3  ">Country</label>
                                      <div className="comn-gray-form-select">
                                        <Select options={countryOptions} name="country" className="new-select-class" classNamePrefix="classNamePrefix" styles={customStyles} value={country} onChange={changeHandler} />
                                        {errorContainer(runform, "country")}
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 my-3 comn-input-main service-fix-box">
                                      <label className="d-inline-flex align-items-center mb-2">Email</label>
                                      <input className="form-control comn-input-style px-3" type="email" {...formAttr(runform, "email")} name="email" placeholder="Enter talent’s email" />
                                      {errorContainer(runform, "email")}
                                    </div>
                                  </div>
                                </div>
                                <div className="comn-black-bg p-3 pb-0 mt-3">
                                  <div className="row">
                                    <div className="col-12 mb-3 manage-talent-black-bg">
                                      <label className="comn-label-class">Where can we find you</label>

                                      <Tab.Container
                                        id="social-tabs"
                                        activeKey={key}
                                        onSelect={(e) => {
                                          setSocialKey(e);
                                        }}
                                      >
                                        <div className="soc-icon-cust-check">
                                          <Nav variant="pills">
                                            <Nav.Item>
                                              <Nav.Link eventKey="first">
                                                <div className="soc-icon-main">
                                                  <label className="cust-chk-bx p-0">
                                                    <span className="cust-chkbox">
                                                      <img src={Youtube} alt="soc_icon" width="48px" />
                                                    </span>
                                                  </label>
                                                </div>
                                              </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                              <Nav.Link eventKey="second">
                                                <div className="soc-icon-main">
                                                  <label className="cust-chk-bx p-0">
                                                    <span className="cust-chkbox">
                                                      <img src={Instagram} alt="soc_icon" />
                                                    </span>
                                                  </label>
                                                </div>
                                              </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                              <Nav.Link eventKey="third">
                                                <div className="soc-icon-main">
                                                  <label className="cust-chk-bx p-0">
                                                    <span className="cust-chkbox">
                                                      <img src={Twitter} alt="soc_icon" />
                                                    </span>
                                                  </label>
                                                </div>
                                              </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                              <Nav.Link eventKey="four">
                                                <div className="soc-icon-main">
                                                  <label className="cust-chk-bx p-0">
                                                    <span className="cust-chkbox">
                                                      <img src={snapchat} alt="soc_icon" />
                                                    </span>
                                                  </label>
                                                </div>
                                              </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                              <Nav.Link eventKey="five">
                                                <div className="soc-icon-main">
                                                  <label className="cust-chk-bx p-0">
                                                    <span className="cust-chkbox">
                                                      <img src={tiktok} width="50px" alt="soc_icon" />
                                                    </span>
                                                  </label>
                                                </div>
                                              </Nav.Link>
                                            </Nav.Item>
                                          </Nav>
                                        </div>
                                        <Tab.Content>
                                          <Tab.Pane eventKey="first">
                                            <div className="row">
                                              <div className="col-lg-4 col-md-6  mb-3 comn-input-main service-fix-box">
                                                <label className="d-inline-flex align-items-center mb-2 mt-3">Youtube URL</label>
                                                <input type="text" className="form-control comn-input-style" placeholder="Enter youtube account URL" onChange={(e) => setsocialurl(e, "youtubeurl")} name="youtubeurl" value={youtubeurl} />
                                                <span className="error-new" id="url-error-1">
                                                  {urlerror ? "write proper url" : "Youtube  URL is required."}
                                                </span>
                                              </div>
                                            </div>
                                          </Tab.Pane>
                                          <Tab.Pane eventKey="second">
                                            <div className="row">
                                              <div className="col-lg-4 col-md-6  mb-3 comn-input-main service-fix-box">
                                                <label className="d-inline-flex align-items-center mb-2 mt-3">Instagram URL</label>
                                                <input type="text" className="form-control comn-input-style" placeholder="Enter instagram account URL" onChange={(e) => setsocialurl(e, "instagramurl")} name="instagramurl" value={instagramurl} />
                                                <span className="error-new" id="url-error-2">
                                                  {urlerror ? "write proper url" : "Instagram URL is required."}
                                                </span>
                                              </div>
                                            </div>
                                          </Tab.Pane>
                                          <Tab.Pane eventKey="third">
                                            <div className="row">
                                              <div className="col-lg-4 col-md-6  mb-3 comn-input-main service-fix-box">
                                                <label className="d-inline-flex align-items-center mb-2 mt-3">Twitter URL</label>
                                                <input type="text" className="form-control comn-input-style" placeholder="Enter twitter account URL" onChange={(e) => setsocialurl(e, "twitterurl")} name="twitterurl" value={twitterurl} />
                                                <span className="error-new" id="url-error-3">
                                                  {urlerror ? "write proper url" : "Twitter URL is required."}
                                                </span>
                                              </div>
                                            </div>
                                          </Tab.Pane>
                                          <Tab.Pane eventKey="four">
                                            <div className="row">
                                              <div className="col-lg-4 col-md-6  mb-3 comn-input-main service-fix-box">
                                                <label className="d-inline-flex align-items-center mb-2 mt-3">Snapchat URL</label>
                                                <input type="text" className="form-control comn-input-style" placeholder="Enter snapchat account URL" onChange={(e) => setsocialurl(e, "snapchaturl")} name="snapchaturl" value={snapchaturl} />
                                                <span className="error-new" id="url-error-4">
                                                  {urlerror ? "write proper url" : "Snapchat URL is required."}
                                                </span>
                                              </div>
                                            </div>
                                          </Tab.Pane>
                                          <Tab.Pane eventKey="five">
                                            <div className="row">
                                              <div className="col-lg-4 col-md-6  mb-3 comn-input-main service-fix-box">
                                                <label className="d-inline-flex align-items-center mb-2 mt-3">Tiktok URL</label>
                                                <input type="text" className="form-control comn-input-style" placeholder="Enter tiktok account URL" onChange={(e) => setsocialurl(e, "tiktokurl")} name="tiktokurl" value={tiktokurl} />
                                                <span className="error-new" id="url-error-5">
                                                  {urlerror ? "write proper url" : "Tiktok URL is required."}
                                                </span>
                                              </div>
                                            </div>
                                          </Tab.Pane>
                                        </Tab.Content>
                                      </Tab.Container>
                                    </div>
                                  </div>
                                </div>
                                <div className="comn-black-bg p-3 pb-0 mt-3">
                                  <div className="row justify-content-between">
                                    <div className="col-12 mb-3 manage-talent-black-bg">
                                      <span>Service details</span>
                                    </div>
                                    <div className="col-lg-4 col-md-6  mb-3 comn-input-main service-fix-box">
                                      <div className="comn-purple-txt d-flex align-items-center mb-3">
                                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                          <path d="M6 9H6.01M10 9H10.01M14 9H14.01M19 9C19 13.4183 14.9706 17 10 17C8.46073 17 7.01172 16.6565 5.74467 16.0511L1 17L2.39499 13.28C1.51156 12.0423 1 10.5743 1 9C1 4.58172 5.02944 1 10 1C14.9706 1 19 4.58172 19 9Z" stroke="#7C64F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Chat
                                      </div>
                                      <label className="d-inline-flex align-items-center mb-2">Price</label>
                                      <div className="position-relative">
                                        <input className="form-control comn-input-style pe-3 ps-4 remove-number-arrow" type="number" {...formAttr(runform, "chatPrice")} name="chatPrice" placeholder="Enter your chat price" />
                                        <span className="dollar-fix">$</span>
                                      </div>
                                      {errorContainer(runform, "chatPrice")}
                                      <label className="d-inline-flex align-items-center mb-2 mt-3 ">Response time</label>
                                      <div className=" mb-3 comn-gray-form-select">
                                        <select className="form-select  w-100" {...formAttr(runform, "chatTime")} name="chatTime">
                                          <option value="0">-- Select days --</option>
                                          <option value="day2"> 2 Day</option>
                                          <option value="day3"> 3 day</option>
                                          <option value="day4"> 4 Day</option>
                                          <option value="day5"> 5 Day</option>
                                          <option value="day6"> 6 Day</option>
                                          <option value="day7"> 7 Day</option>
                                        </select>
                                        {errorContainer(runform, "chatTime")}
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6  mb-3 comn-input-main service-fix-box">
                                      <div className="comn-purple-txt d-flex align-items-center mb-3">
                                        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                          <path d="M12 2V10H2V2H12ZM13 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H13C13.55 12 14 11.55 14 11V7.5L18 11.5V0.5L14 4.5V1C14 0.45 13.55 0 13 0Z" fill="#7C64F8" />
                                        </svg>
                                        Video (standerd)
                                      </div>
                                      <label className="d-inline-flex align-items-center mb-2">Price</label>
                                      <div className="position-relative">
                                        <input className="form-control comn-input-style pe-3 ps-4 remove-number-arrow " type="number" name="videoPrice" placeholder="Enter your video price" onChangeCapture={handlePrice} value={videoPrice} />
                                        <span className="dollar-fix">$</span>
                                      </div>
                                      {errorContainer(runform, "videoPrice")}
                                      <label className="d-inline-flex align-items-center mb-2 mt-3">Response time</label>
                                      <div className=" mb-3 comn-gray-form-select">
                                        <select className="form-select  w-100" {...formAttr(runform, "videoTime")} name="videoTime">
                                          <option value="0">-- Select days --</option>
                                          <option value="day2"> 2 Day</option>
                                          <option value="day3"> 3 day</option>
                                          <option value="day4"> 4 Day</option>
                                          <option value="day5"> 5 Day</option>
                                          <option value="day6"> 6 Day</option>
                                          <option value="day7"> 7 Day</option>
                                        </select>
                                        {errorContainer(runform, "videoTime")}
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 mb-3 comn-input-main service-fix-box">
                                      <div className="comn-purple-txt d-flex align-items-center mb-3">
                                        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                          <path d="M12 2V10H2V2H12ZM13 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H13C13.55 12 14 11.55 14 11V7.5L18 11.5V0.5L14 4.5V1C14 0.45 13.55 0 13 0Z" fill="#7C64F8" />
                                        </svg>
                                        Video (24 hours delivery)
                                      </div>

                                      <div>
                                        <label className="d-flex align-items-center mb-1">
                                          Price
                                          <span className="position-relative ms-auto">
                                            <div className="custm-toggel-switch diff-switch">
                                              <div className="form-check form-switch">
                                                <input className="form-check-input mt-0" type="checkbox" id="offer-status" onChange={(e) => checkDefault(e)} defaultChecked />
                                              </div>
                                            </div>
                                          </span>
                                        </label>
                                        {opencard ? (
                                          <div className="mb-3 position-relative">
                                            <input className="form-control comn-input-style ps-4 pe-3 remove-number-arrow" type="number" name="video24hr" value={video24hr} disabled placeholder="24 hours eelivery" />
                                            <span className="dollar-fix">$</span>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="comn-black-bg p-3 pb-0 mt-3">
                                  <div className="row justify-content-between">
                                    <div className="col-12 mb-3 manage-talent-black-bg">
                                      <span>Welcome video</span>
                                    </div>
                                    <div>
                                      <div className={highlight ? "custom-file-drop-area highlight" : "custom-file-drop-area"} onDragEnter={handlehighlight} onDragOver={handlehighlight} onDragLeave={handleunhighlight} onDrop={handleDrop}>
                                        <label className="video-bg-select video-select" htmlFor="video-bg-upload">
                                          {video ? (
                                            <div>
                                              {video && (
                                                <div className="video-upload-fix m-auto">
                                                  <video>
                                                    <source src={URL.createObjectURL(video)} />
                                                  </video>
                                                </div>
                                              )}
                                            </div>
                                          ) : (
                                            <>
                                              <img src={Cloud_Img} alt="Upload File" className="img-fluid" />
                                              <div className="upload-text mb-4">Choose file or Drag file here</div>
                                            </>
                                          )}
                                          <span className="choose-file">Choose file</span>
                                        </label>
                                        <input id="video-bg-upload" type="file" name="video" onChange={(e) => videoFile(e)} className="d-none" accept="video/*" />
                                      </div>
                                      {errorContainer(runform, "video")}
                                    </div>
                                    <div className="col-12 my-3 manage-talent-black-bg">
                                      <label className="mb-2">
                                        <span>Talent’s information </span>
                                      </label>
                                      <div className="col-12">
                                        <textarea className="w-100 talent-info-main" name="about" rows={4} maxLength={250} {...formAttr(runform, "about")} placeholder="Say something about you..." />
                                        <p>{textAreaCount}/250</p>
                                        {errorContainer(runform, "about")}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 col-sm-4">
                                <button className="comn-btn-class w-100" type="submit" onClick={submitkey ? (formData, { resetForm }) => submitFormData(formData, resetForm) : () => submitForm()}>
                                  Add talent
                                </button>
                              </div>
                            </form>
                          )}
                        </Formik>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>

      {/* ---------- forgot password modal -------------*/}

      <Modal show={forgotmodalShow} onHide={() => setDeclineModalShow(false)} size="md" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="pt-0">
          <div className="text-center modal-data">
            <span>Reason</span>

            <div className="row mt-4">
              <Formik
                enableReinitialize
                initialValues={{
                  resion: resion,
                }}
                validationSchema={Yup.object({
                  resion: Yup.string().required("Reason is required."),
                })}
                onSubmit={(formData, { resetForm }) => {
                  submitMsgData(formData, resetForm);
                }}
              >
                {(runform) => (
                  <form onSubmit={runform.handleSubmit}>
                    <div className="col-12 mb-4">
                      <textarea className="w-100 talent-info-main" {...formAttr(runform, "resion")} name="resion" rows={4} placeholder="Enter reason."></textarea>
                      {errorContainer(runform, "resion")}
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
