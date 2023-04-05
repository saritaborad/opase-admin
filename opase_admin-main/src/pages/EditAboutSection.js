import React, { useEffect, useState, useRef } from "react";
import UserLayout from "../components/UserLayout";
import * as Yup from "yup";
import { Formik } from "formik";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export default function EditAboutSection(params) {
  const [show_image, setImages] = useState("");
  const [HomeData, setHomeData] = useState([]);
  const imgData = useRef();
  const location = useLocation();

  const imageFile = (e) => {
    // setImages(e.target.files[0]);
    const form = new FormData();
    form.append("images", e.target.files[0]);
    form.append("about", location.state.id);
    form.append("position", HomeData.position);
    const addFileImage = new Promise((resolve) => {
      resolve(PostApi(API_Path.addImage, form));
    });
    addFileImage.then((res) => {
      if (res.status === 200) {
        setImages(res.data.data.img_url);
        if (imgData.current) {
          imgData.current.setFieldValue("img_url", res.data.data.img_url);
        }
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

  useEffect(() => {
    getEditWebBanner();
  }, []);

  const getEditWebBanner = () => {
    let data = { id: location.state.id };
    let getWebBannerData = new Promise((resolve) => {
      resolve(PostApi(API_Path.getWebsiteAboutPageById, data));
    });
    getWebBannerData.then((res) => {
      if (res.status === 200) {
        setHomeData(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const submitFormData = (formData, resetForm) => {
    let updateWebBannerData = new Promise((resolve) => {
      resolve(PostApi(API_Path.UpdateWebsiteAboutPage, formData));
    });
    updateWebBannerData.then((res) => {
      if (res.status === 200) {
        setHomeData("");
        toast.success(res.data.message);
        getEditWebBanner();
        resetForm();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <Formik
              enableReinitialize
              innerRef={imgData}
              initialValues={{
                id: HomeData.id ? HomeData.id : "",
                heading: HomeData.heading ? HomeData.heading : "",
                description: HomeData.description ? HomeData.description : "",
                img_url: HomeData.img_url ? HomeData.img_url : "",
                position: HomeData.position ? HomeData.position : "",
              }}
              validationSchema={Yup.object({
                heading: Yup.string().required("Title is required."),
                description: Yup.string().required("Description is required."),
              })}
              onSubmit={(formData, { resetForm }) => {
                submitFormData(formData, resetForm);
              }}
            >
              {(runform) => (
                <form className="row mt-3" onSubmit={runform.handleSubmit}>
                  <div className="col-12  mb-3 comn-input-main">
                    <label className="mb-2 mt-3">Title</label>
                    <input type="text" className="form-control comn-input-style" name="heading" {...formAttr(runform, "heading")} placeholder="Enter title" />
                    {errorContainer(runform, "heading")}
                  </div>

                  <div className="col-12">
                    <div className="description-div">
                      <label>Description</label>
                      <textarea className="w-100 talent-info-main mt-3" name="description" rows={4} {...formAttr(runform, "description")} placeholder="Enter description"></textarea>
                      {errorContainer(runform, "description")}
                    </div>
                  </div>

                  <div className="col-12 mt-3">
                    <div className="upload-img-txt">
                      <label>Upload image</label>
                    </div>
                    <div className="d-flex text-center align-items-center justify-content-center">
                      <div className="main-banner-div mt-3">
                        <div className="me-5 ms-3">
                          {/* data[i].img_url ? <img src={data[i].img_url} alt="image" className="img-fluid" /> : <img src={User_Img} alt="product" className="img-fluid" width="50px" /> */}
                          {/* {HomeData.position === 1 ? (
                            <img src={HomeData.img_url} alt="upload img" className="img-fluid img-details" />
                          ) : HomeData.position === 2 ? (
                            <video src={HomeData.video_url} alt="upload img" className="img-details">
                              <source type="video/mp4" />
                            </video>
                          ) : (
                            <img src={Cloud_Img} alt="upload img" className="img-fluid img-details" />
                          )} */}

                          {show_image ? <img src={show_image} alt="upload img" accept="image/*" className="img-fluid img-details" /> : <img src={HomeData.img_url} alt="upload img" accept="image/*" className="img-fluid img-details" />}
                        </div>
                        <div className="mt-3 mt-sm-0">
                          <span>Upload image</span>
                          {/* <p className="mt-1">You can upload image of max size of 5mb. Image will be cropped to 256*256px.</p> */}
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
                            <input
                              id="image-bg-upload"
                              // accept="image/*"
                              type="file"
                              onChange={imageFile}
                              name={show_image}
                              className="d-none "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 col-sm-6 mt-3">
                      <button className="comn-btn-class w-100 me-2" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </UserLayout>
    </>
  );
}
