import React, { useState } from "react";
import UserLayout from "../components/UserLayout";
import VideoPoster from "../images/About-Cameo-video.png";

export default function LandingPageBuilder() {
  const [txtColor, setTxtColor] = useState("#0E0E0E");
  const [bgColor, setBgColor] = useState("#4318FF");

  const handleTxtChange = (e) => {
    setTxtColor(e.target.value);
  };

  const handleBgChange = (e) => {
    setBgColor(e.target.value);
  };

  return (
    <UserLayout>
      <div className="content-main-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 mt-3">
              <div className="d-sm-flex">
                <div className="comn-title-main d-block  d-sm-flex justify-content-between">
                  <h1 className="mb-0">Landing page update</h1>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-12 mt-3">
              <div className="page-left-builder-sec">
                <div className="builder-page-title">
                  <h4 className="p-3">Landing page edits</h4>
                  <div className="builder-page-upload-info p-3">
                    <span className="d-block">Appearance</span>
                    <bdi className="d-block">Image/Video</bdi>

                    <div className="mt-3">
                      <label htmlFor="video-bg-upload" className="video-bg-select mx-auto">
                        {/* <video src={upload} alt="Upload File" className="img-fluid" width="100" height="100"></video> */}
                        <div className="mb-3">
                          <svg width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31.6667 27.3334H10C4.79064 27.3365 0.451511 23.3398 0.027294 18.1477C-0.396923 12.9556 3.2359 8.30759 8.37669 7.46503C10.7429 3.26984 15.1835 0.672546 20 0.666598C23.0034 0.655246 25.9208 1.66886 28.27 3.54003C30.5768 5.36979 32.2169 7.90832 32.9367 10.7634C37.2432 11.4251 40.313 15.2926 39.9801 19.6369C39.6471 23.9812 36.0237 27.3357 31.6667 27.3334ZM20 4.00001C16.3862 4.00428 13.0545 5.95353 11.28 9.10169L10.5 10.5L8.91835 10.7584C5.50216 11.3307 3.09337 14.4239 3.37538 17.8762C3.65738 21.3285 6.53623 23.9897 10 24H31.6667C34.281 24.0027 36.456 21.991 36.657 19.3845C36.8581 16.7779 35.0172 14.4565 32.4334 14.0584L30.24 13.725L29.7034 11.5717C28.5955 7.11637 24.591 3.99162 20 4.00001ZM22.4167 20.6667H17.5834V15.6667H13.3334L20 9.00003L26.6667 15.6667H22.4167V20.6667Z" fill="white" />
                          </svg>
                        </div>
                        <div className="upload-text">Upload image/video</div>
                        <span className="choose-file">Choose file</span>
                      </label>
                      <input type="file" id="video-bg-upload" name="video" accept="video/*" hidden />
                    </div>

                    <div className="mt-4">
                      <button className="btn-comnn-purple px-5">Update</button>
                    </div>
                  </div>
                </div>

                <div className="builder-page-info mt-3 p-3">
                  <h4>Information</h4>

                  <div className="d-flex align-items-center mb-3">
                    <span>Headline1</span>
                    <input type="text" className="w-100 ms-2" placeholder="Enter Headline Number 1" />
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <span>Headline2</span>
                    <input type="text" className="w-100 ms-2" placeholder="Enter Headline Number 2" />
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <span>Address</span>
                    <textarea type="text" rows={3} className="w-100 ms-2" placeholder="Enter Headline Number 2" />
                  </div>
                </div>

                <div className="builder-page-button my-3">
                  <div className="d-flex align-items-center build-page-txt">
                    <h4 className="p-3">Button</h4>
                    <div className="ms-auto landing-box-hdr-btn">
                      <button type="button">
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M10.2629 14H14.6892C15.1829 14 15.5873 13.61 15.5873 13.134V12.866C15.5873 12.39 15.1829 12 14.6892 12H10.2629C9.76819 12 9.36476 12.39 9.36476 12.866V13.134C9.36476 13.61 9.76819 14 10.2629 14ZM18.6984 18C18.6984 18.551 18.2338 19 17.6613 19H7.29035C6.71891 19 6.25326 18.551 6.25326 18V9H18.6984V18ZM6.25326 5H18.6984C19.2709 5 19.7355 5.449 19.7355 6C19.7355 6.551 19.2709 7 18.6984 7H6.25326C5.68182 7 5.21616 6.551 5.21616 6C5.21616 5.449 5.68182 5 6.25326 5ZM21.8097 6C21.8097 4.346 20.4138 3 18.6984 3H6.25326C4.5379 3 3.14197 4.346 3.14197 6C3.14197 6.883 3.54747 7.67 4.17906 8.22V18C4.17906 19.654 5.575 21 7.29035 21H17.6613C19.3767 21 20.7726 19.654 20.7726 18V8.22C21.4042 7.67 21.8097 6.883 21.8097 6Z" fill="#828282" />
                        </svg>
                      </button>
                      <button type="button" className="mx-3">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.25647 16L8.51615 9L15.7758 16M15.7758 2L8.51476 9L1.25647 2" stroke="#828282" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="color-picker-main">
                      <div className="mt-4">
                        <label className="form-label">Text color</label>
                        <div className="input-group mb-3">
                          <span className="input-group-text px-3" id="basic-addon3">
                            <input type="color" value={txtColor} name="txtColor" className="" onChangeCapture={handleTxtChange} />
                          </span>
                          <input type="text" className="form-control" id="basic-url" readOnly value={txtColor} />
                        </div>
                      </div>
                      Name
                      <div className="mt-4">
                        <label className="form-label">Background color</label>
                        <div className="input-group mb-3">
                          <span className="input-group-text px-3" id="basic-addon3">
                            <input type="color" value={bgColor} name="txtColor" className="" onChangeCapture={handleBgChange} />
                          </span>
                          <input type="text" className="form-control" id="basic-url" readOnly value={bgColor} />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label class="form-label">Action type</label>
                        <div className="input-group mb-3">
                          <span className="input-group-text px-3" id="basic-addon3">
                            URL
                          </span>
                          <input type="text" className="form-control" id="basic-url" placeholder="www.givingx.com" aria-describedby="basic-addon3" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <button className="btn-comnn-purple px-5">Update</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-12 mt-3">
              <div className="page-right-builder-sec">
                <div className="builder-page-title pb-3">
                  <h4 className="p-3">Page preview</h4>
                  <div className="builder-prev-body text-center mx-3 mt-5 px-3 mx-xl-5 px-xl-5 ">
                    <h5 className="mb-4">Opase is where you connect with your favorite stars</h5>
                    <div>
                      <p className="px-5">Access thousands of celebrities and request a personalized video message for any occasion.</p>
                      <div className="mt-4">
                        <div className="prev-video-div mx-auto p-0">
                          <img src={VideoPoster} alt="" />
                        </div>
                        <div className="mt-3">
                          <button className="btn-comnn-purple px-5">Request</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
