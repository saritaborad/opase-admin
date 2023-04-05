import React, { useState } from "react";
import UserLayout from "../components/UserLayout";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

export default function RequestVideo(params) {
  const [videoRequest, setVideoRequest] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [deletemodalShow, setDeclineModalShow] = useState(false);
  const [id, setId] = useState("");

  const location = useLocation();

  useEffect(() => {
    getVideoData();
  }, []);

  const getVideoData = () => {
    let data = { id: location.state.id };
    const addVideoData = new Promise((resolve) => {
      resolve(PostApi(API_Path.videoDetails, data));
    });
    addVideoData.then((res) => {
      if (res.status === 200) {
        setVideoRequest(res.data.data.video);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleVideoClick = (id) => {
    setPlaying(true);
    if (document.getElementById(id)) {
      document.getElementById(id).play();
    }
    // vidRef.current?.play();
  };

  const handleDelete = () => {
    let data = { deleteId: id };

    const removeVideo = new Promise((resolve) => {
      resolve(PostApi(API_Path.removeVideo, data));
    });

    removeVideo.then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        getVideoData();
        setDeclineModalShow(false);
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
            <div className="row">
              <div className="col-12 mt-3">
                <div className="d-sm-flex align-items-center">
                  <div className="comn-title-main d-block  d-sm-flex justify-content-between">
                    <h1 className="mb-0">Uploaded videos</h1>
                  </div>
                  {/* <div className="mt-sm-0 mt-3 ms-auto comn-gray-form-select border-class">
                    <select className="form-select  w-100" name="all">
                      <option>Today</option>
                      <option>YesterDay</option>
                      <option>Last 1 Month</option>
                    </select>
                  </div> */}
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="comn-table-black-bg">
                  <div className="row">
                    {videoRequest?.map((item, i) => {
                      return (
                        <div className="col-xl-2 fix-col col-lg-4 col-sm-6 mb-3" key={i}>
                          <div className="video-fix-col h-100 position-relative">
                            {/* <div className="delete-rou-po" onClick={() => { setId(item.id); setDeclineModalShow(true) }}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="11.25" fill="#7C64F8" stroke="#59586c" stroke-width="1.5" />
                                <path d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" fill="white" />
                              </svg>
                            </div> */}
                            <div className="uploaded-video-main img-black-shadow">
                              {/* <img src={item?.thubnail || Video_1} className="video-poster-img" alt="video Error" /> */}
                              <div>
                                {/* <span>{item.fullname}</span> */}
                                <video src={item?.video_link} id={`video-${item.id}`} poster={item?.thubnail} controls>
                                  <source type="video/*" />
                                </video>
                              </div>

                              {/* <bdi>{item.fullname}</bdi> */}
                              {/* <p>{item.fullname}</p> */}
                              {/* <div className="video-play-btn" onClick={() => handleVideoClick(`video-${item.id}`)}>
                                  {!playing && (
                                    <svg width="35" height="35" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M13.2814 26.4079C6.19764 26.4079 0.455078 20.5837 0.455078 13.3993C0.455078 6.21479 6.19764 0.390625 13.2814 0.390625C20.3652 0.390625 26.1078 6.21479 26.1078 13.3993C26.1 20.5804 20.362 26.4 13.2814 26.4079ZM3.02035 13.623C3.08104 19.3484 7.69057 23.9487 13.336 23.918C18.9814 23.8871 23.5419 19.2369 23.5419 13.5111C23.5419 7.78538 18.9814 3.13515 13.336 3.10422C7.69057 3.0736 3.08104 7.67384 3.02035 13.3993V13.623ZM10.7162 19.2531V7.54537L18.412 13.3993L10.7162 19.2531Z" fill="white" />
                                    </svg>
                                  )}
                                </div> */}
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
