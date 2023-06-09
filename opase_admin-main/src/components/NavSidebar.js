import React, { useState } from "react";
// import OpaseLogo from "../images/opase logo.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { Modal } from "react-bootstrap";

export default function NavSidebar(params) {
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutModel, setLogoutModel] = useState(false);

  const sidebar_change = (name) => {
    if (name) {
      navigate(name);
      document.getElementById("root").classList.remove("dash-main-class-add");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("opad_token");
    navigate("/login");
  };

  return (
    <React.Fragment>
      <div className="sidebar-main-section">
        <div className="sidebar-main-section-inner">
          <div className="sidebar-logo-top">
            <Link to="/dashboard">
              {/* <img src={OpaseLogo} className="img-fluid" alt="Opase" /> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 219.98 79.09">
                <defs></defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path class="cls-1" d="M36.84,0a36.84,36.84,0,0,0-6.3,73.14V58.69h-4V54a19.53,19.53,0,0,1-9.37-16.29A11.19,11.19,0,0,1,29.09,26.39c13.93.59,27.05-2.24,27.05,11A19.44,19.44,0,0,1,46.81,54v4.72h-4V73.2A36.84,36.84,0,0,0,36.84,0ZM40.5,22H31.93a3.1,3.1,0,0,1-2.61-4.79l1.9-3a5.94,5.94,0,0,1,10,0l1.91,3A3.11,3.11,0,0,1,40.5,22Z" />
                    <path fill="none" class="cls-2" d="M40.5,22H31.93a3.1,3.1,0,0,1-2.61-4.79l1.9-3a5.94,5.94,0,0,1,10,0l1.91,3A3.11,3.11,0,0,1,40.5,22Z" />
                    <path class="cls-1" d="M96.81,40.4c0-.31,0-.61,0-.92a66.89,66.89,0,0,1,1.09-9,29.06,29.06,0,0,1,2.16-7.93c1-2.11,2.48-3.94,4.92-4.28a5.51,5.51,0,0,1,2.14.07,17.1,17.1,0,0,0,2.19.85c1.11.15,2.28-.27,3.44-.18a10.17,10.17,0,0,1,3.12.75c7.32,3,9.51,11.91,9.56,19.05a68.68,68.68,0,0,1-.77,9.83c-.47,3.45-.87,7.05-2.49,10.18-2.91,5.61-10,7.65-15.64,5.1a13.59,13.59,0,0,1-6.9-6.77,35.31,35.31,0,0,1-2.24-8.84A52.1,52.1,0,0,1,96.81,40.4Zm20.66-1.64c0-5.39-.9-14.07-7.53-14.95a1.59,1.59,0,0,0-1.19.25c-.84.68-1,2.3-1.27,3.28-.33,1.34-.6,2.7-.83,4.06-1.23,7.33-1.68,15.07.48,22.28A12.81,12.81,0,0,0,109.27,58c.85,1,2.45,2,3.74,1.11s1.69-2.36,2.12-3.65c.84-2.51,1-5.11,1.4-7.69a55.55,55.55,0,0,0,.93-8.63C117.47,39,117.47,38.89,117.47,38.76Z" />
                    <path class="cls-1" d="M133.42,79a5.57,5.57,0,0,1-1.29-.42,3.46,3.46,0,0,1-1.55-1.89,6.38,6.38,0,0,1-.29-1c-.75-3.51-1.33-7.06-1.83-10.61A81.1,81.1,0,0,1,127.78,48c.19-2.67,0-5.36.09-8,.09-2.39.36-4.78.54-7.17.07-.91.54-1.46,1.46-1.43a16,16,0,0,1,4.63.44c1.07.38,1.82,1.65,2.82,2.63a2.82,2.82,0,0,0,.58-.35c2.62-2.09,5.66-2.18,8.76-1.78a5.55,5.55,0,0,1,3.79,2.45,7.79,7.79,0,0,1,1.07,2.3,12,12,0,0,1,.3,3.15c0,2.3,0,4.59-.19,6.88-.08,1.14-.21,2.27-.39,3.4-.08.55-.18,1.09-.31,1.63-.06.27-.13.55-.21.82l-.12.4a1.38,1.38,0,0,0-.13.39c-.1.31-.22.61-.34.91l-.2.45c-.05.11-.21.33-.21.44a11.92,11.92,0,0,1-3.34,4.12,4.48,4.48,0,0,1-2.55,1.19,10.21,10.21,0,0,1-2-.46,10.09,10.09,0,0,1-2-.45,4.73,4.73,0,0,1-1.26-.8,8.52,8.52,0,0,1-1.7-2.33l-.14-.25a.29.29,0,0,1,0-.13c0-.37,1.77-.41,2.06-.45a3.45,3.45,0,0,0,2.27-1.22,12.46,12.46,0,0,0,2.24-5.84,37.21,37.21,0,0,0,.47-4.2c.08-1.15.13-2.31.16-3.47s.11-2.19.05-3.27a4.1,4.1,0,0,0-.21-1.15.91.91,0,0,0-.33-.46.73.73,0,0,0-.5-.09c-1.56.1-2.44,1.54-3.28,2.66a30,30,0,0,1-2.29,2.62,4.63,4.63,0,0,0-1,1.35A4.64,4.64,0,0,0,136,44.4q-.15,3.52-.24,7c-.06,2.32-.12,4.64-.12,7,0,1.36,0,2.73.15,4.09.33,4.24,1,8.47,1.63,12.69a4.56,4.56,0,0,1,0,2.43c-.58,1.28-2.12,1.59-3.39,1.47Q133.74,79,133.42,79Z" />
                    <path class="cls-1" d="M219.89,38.64c0,.13,0,.24-.08.36a6.15,6.15,0,0,1-2.67,3.84A14.54,14.54,0,0,1,213,44.4,2.56,2.56,0,0,0,211,46.31c-.82,3.39-1.74,6.77-1.07,10.37a4.44,4.44,0,0,0,3.1,3.59c.47.18,1.23-.23,1.78-.52,1.61-.84,2.71-.49,3.34,1.13a1.81,1.81,0,0,1-.59,2.31,8,8,0,0,1-5.73,1.73,9,9,0,0,1-6.86-4.71c-2.58-4.3-2.73-9.06-2-14a31.79,31.79,0,0,1,4.09-11.13c1.41-2.46,3.35-4,6.32-4a5.48,5.48,0,0,1,2,.52A10,10,0,0,1,217.53,33a3.69,3.69,0,0,1,.92,1c.33.56.5,1.2.84,1.76a6.53,6.53,0,0,1,.45.82A3.51,3.51,0,0,1,219.89,38.64Zm-3.84-1.25c-.07,0-.39-.33-.73-.65a1,1,0,0,0-1.55.21L213.08,38a1,1,0,0,0,.16,1.28c.41.38.87.82.93.86Z" />
                    <path class="cls-1" d="M107.45,2l2.81,1.05c2.72,1.06,2.95,3.82,4,6,.47.94.84,1.93,1.3,2.88.55,1.11,1,2.24.06,3.33a3.27,3.27,0,0,1-3.87.43,7.47,7.47,0,0,1-2.56-2.43c-1.49-2.67-2.72-5.48-4.07-8.22-.64-1.3-.45-2.31.85-3Z" />
                    <path class="cls-1" d="M168.63,42.65c-.13-1.37-.18-2.7-.41-4-.17-1-.91-1.31-1.85-.86-.77.38-1.5.83-2.24,1.25a4.14,4.14,0,0,1-4.62-.17,8.1,8.1,0,0,1-1.29-1.13c-1.55-1.6-1.32-3.48.75-4.45,2.31-1.1,4.72-2.18,7.39-1.7,4.54.83,8.06,3.62,9.25,7.57,1.33,4.44,1,8.91.2,13.38q-.76,4.08-1.47,8.17c-.42,2.38-1.22,3.09-3.61,3.15a3.88,3.88,0,0,0-1.41.15c-4.47,2-8.32.65-11.81-2.28a9.79,9.79,0,0,1-3.1-6.64c-.53-4.48,1.47-7.78,4.78-10.74C162,41.82,165.07,42.39,168.63,42.65ZM168.16,48l-.37-.4c-.75.44-1.53.84-2.25,1.31a8.64,8.64,0,0,0-1.3,1.12c-1.87,2-3.61,4-3,7a2.7,2.7,0,0,0,2.3,2.23c.95.07,2.89-.81,3-1.42C167.06,54.59,167.6,51.3,168.16,48Z" />
                    <path class="cls-1" d="M192.58,39.26c-1.73-.6-6.16,1.13-7.59,3.15,1.21.4,2.38.73,3.53,1.16a15.93,15.93,0,0,1,9.18,7.82c2.62,5.19.41,11.14-5.23,12.68a14.4,14.4,0,0,1-8.9.1A6.9,6.9,0,0,1,179,55.53,2,2,0,0,1,180,54.4c.25-.11.87.26,1.12.58a4.1,4.1,0,0,0,3.55,1.56c2.59-.07,5.22.15,7.44-1.62,1.23-1,1.18-1.77-.33-2.35a47,47,0,0,0-5-1.61c-5.45-1.4-7.92-5.06-7.31-10.65a9.33,9.33,0,0,1,2.27-5.64c2.79-3,9.13-5.15,12.87-2.68,3.14,2.08,5.58,4.68,5.78,8.77.09,1.87-2.26,5.32-4,5.68-1,.21-2.92-1.11-3.18-2.46S192.76,41,192.58,39.26Z" />
                    <path class="cls-1" d="M162.07,25.94a15.16,15.16,0,0,1,.72-1.81c1.14-2.11,2.34-4.17,3.48-6.27.71-1.31,1.22-1.42,2.42-.52a12.82,12.82,0,0,0,1.63.9c1.76.93,2.46,2.4,1.6,4.18-1.23,2.52-2.7,4.94-4.15,7.35a1.81,1.81,0,0,1-1.36.51C164.9,30.3,162.24,27.52,162.07,25.94Z" />
                    <path class="cls-1" d="M190.1,71.25a2.51,2.51,0,0,1,2.37,2.55A2.43,2.43,0,0,1,190,76.1a2.49,2.49,0,0,1-2.39-2.54A2.52,2.52,0,0,1,190.1,71.25Z" />
                    <path class="cls-1" d="M109.3,73.49a2.45,2.45,0,0,1,2.55-2.23,2.42,2.42,0,1,1-.4,4.83A2.37,2.37,0,0,1,109.3,73.49Z" />
                    <path class="cls-1" d="M214.44,73.6a2.44,2.44,0,1,1-4.88.1,2.6,2.6,0,0,1,2.4-2.45A2.55,2.55,0,0,1,214.44,73.6Z" />
                  </g>
                </g>
              </svg>
            </Link>
          </div>
          <ul className="sidebar-main-inner-menu">
            <li
              onClick={() => {
                sidebar_change("/dashboard");
              }}
            >
              <bdi className={location.pathname === "/dashboard" ? "active" : ""}>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.4998 22.9164C10.9249 22.9208 9.36982 22.5645 7.95396 21.8747C7.43578 21.6226 6.9393 21.3282 6.46958 20.9945L6.32687 20.8903C5.03502 19.9368 3.97882 18.6999 3.23937 17.2747C2.4745 15.7995 2.07781 14.1613 2.08306 12.4997C2.08306 6.74671 6.74683 2.08301 12.4998 2.08301C18.2528 2.08301 22.9166 6.74671 22.9166 12.4997C22.9218 14.1605 22.5254 15.798 21.7613 17.2726C21.0229 18.697 19.9682 19.9334 18.678 20.8872C18.1912 21.2434 17.6748 21.5571 17.1342 21.8247L17.0509 21.8663C15.6341 22.5598 14.0772 22.919 12.4998 22.9164ZM12.4998 17.708C10.9388 17.705 9.50778 18.5768 8.79459 19.9653C11.1294 21.1217 13.8702 21.1217 16.205 19.9653V19.9601C15.491 18.5731 14.0598 17.7032 12.4998 17.708ZM12.4998 15.6247C14.7562 15.6276 16.8367 16.8435 17.9467 18.808L17.9623 18.7945L17.9769 18.782L17.9592 18.7976L17.9488 18.8059C20.5832 16.53 21.5251 12.8563 20.3109 9.59354C19.0967 6.3308 15.9822 4.16667 12.5009 4.16667C9.0195 4.16667 5.90499 6.3308 4.69078 9.59354C3.47656 12.8563 4.41854 16.53 7.05292 18.8059C8.16361 16.8424 10.2439 15.6274 12.4998 15.6247ZM12.4998 14.583C10.1986 14.583 8.33313 12.7175 8.33313 10.4163C8.33313 8.11515 10.1986 6.24967 12.4998 6.24967C14.801 6.24967 16.6665 8.11515 16.6665 10.4163C16.6665 11.5214 16.2275 12.5812 15.4461 13.3626C14.6647 14.144 13.6049 14.583 12.4998 14.583ZM12.4998 8.33301C11.3492 8.33301 10.4165 9.26575 10.4165 10.4163C10.4165 11.5669 11.3492 12.4997 12.4998 12.4997C13.6504 12.4997 14.5832 11.5669 14.5832 10.4163C14.5832 9.26575 13.6504 8.33301 12.4998 8.33301Z" fill="#828282" />
                </svg>

                <span>Dashboard</span>
              </bdi>
            </li>
            <li
              onClick={() => {
                sidebar_change("/user");
              }}
            >
              <bdi className={location.pathname === "/user" || location.pathname === "/user-details" ? "active" : ""}>
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.99963 0C4.23821 0 1.99963 2.23858 1.99963 5C1.99963 7.76142 4.23821 10 6.99963 10C9.76106 10 11.9996 7.76142 11.9996 5C11.9996 2.23858 9.76106 0 6.99963 0ZM3.99963 5C3.99963 3.34315 5.34278 2 6.99963 2C8.65649 2 9.99963 3.34315 9.99963 5C9.99963 6.65685 8.65649 8 6.99963 8C5.34278 8 3.99963 6.65685 3.99963 5Z" fill="#828282" />
                  <path d="M14.9081 5.21828C14.6267 5.07484 14.3154 5.00006 13.9996 5.00006V3.00006C14.6312 3.00006 15.2538 3.14956 15.8165 3.43645C15.8785 3.46805 15.9396 3.50121 15.9996 3.5359C16.485 3.81614 16.9068 4.19569 17.2369 4.65055C17.6079 5.16172 17.8526 5.75347 17.9509 6.37737C18.0492 7.00126 17.9984 7.63958 17.8026 8.24005C17.6068 8.84053 17.2715 9.38611 16.8244 9.83213C16.3772 10.2782 15.8307 10.6119 15.2297 10.8062C14.6949 10.979 14.1305 11.037 13.5732 10.9772C13.5042 10.9698 13.4353 10.9606 13.3666 10.9496C12.7434 10.8497 12.1527 10.6038 11.6428 10.2319L11.6417 10.2311L12.8207 8.61557C13.0758 8.80172 13.3713 8.92477 13.6832 8.97474C13.995 9.02471 14.3142 9.00014 14.6147 8.90302C14.9151 8.80591 15.1884 8.63903 15.4119 8.41602C15.6355 8.19302 15.8031 7.92024 15.901 7.62001C15.9989 7.31978 16.0243 7.00063 15.9752 6.68869C15.926 6.37675 15.8037 6.08089 15.6182 5.82531C15.4328 5.56974 15.1894 5.36172 14.9081 5.21828Z" fill="#828282" />
                  <path d="M17.9977 18C17.9977 17.475 17.8943 16.9551 17.6934 16.47C17.4925 15.9849 17.198 15.5442 16.8267 15.1729C16.4555 14.8017 16.0147 14.5072 15.5296 14.3062C15.0446 14.1053 14.5247 14.0019 13.9996 14.0019V12C14.6817 12 15.358 12.1163 15.9996 12.3431C16.0992 12.3783 16.1979 12.4162 16.2957 12.4567C17.0237 12.7583 17.6851 13.2002 18.2423 13.7574C18.7994 14.3145 19.2414 14.9759 19.5429 15.7039C19.5834 15.8017 19.6213 15.9004 19.6565 16C19.8833 16.6416 19.9996 17.3179 19.9996 18H17.9977Z" fill="#828282" />
                  <path d="M13.9996 18H11.9996C11.9996 15.2386 9.76106 13 6.99963 13C4.23821 13 1.99963 15.2386 1.99963 18H-0.000366211C-0.000366211 14.134 3.13364 11 6.99963 11C10.8656 11 13.9996 14.134 13.9996 18Z" fill="#828282" />
                </svg>

                <span>User</span>
              </bdi>
            </li>
            <li
              onClick={() => {
                sidebar_change("/talent");
              }}
            >
              <bdi className={location.pathname === "/talent" || location.pathname === "/talent-details" ? "active" : ""}>
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 16H2C0.930516 16.032 0.0364164 15.1933 0 14.124V1.875C0.0364132 0.805809 0.930683 -0.0325688 2 2.24984e-06H18C19.0693 -0.0325688 19.9636 0.805809 20 1.875V14.125C19.963 15.1939 19.0691 16.032 18 16ZM2 2V13.989L18 14V2.011L2 2ZM11.43 12H4C4.07353 11.1721 4.46534 10.4049 5.093 9.86C5.79183 9.16672 6.73081 8.76921 7.715 8.75C8.69919 8.76921 9.63817 9.16672 10.337 9.86C10.9645 10.4051 11.3563 11.1721 11.43 12ZM16 11H13V9H16V11ZM7.715 8C7.17907 8.01863 6.65947 7.8139 6.28029 7.43471C5.9011 7.05553 5.69638 6.53593 5.715 6C5.69668 5.46416 5.9015 4.94474 6.28062 4.56562C6.65974 4.1865 7.17916 3.98168 7.715 4C8.25084 3.98168 8.77026 4.1865 9.14938 4.56562C9.5285 4.94474 9.73332 5.46416 9.715 6C9.73362 6.53593 9.5289 7.05553 9.14971 7.43471C8.77053 7.8139 8.25093 8.01863 7.715 8ZM16 7H12V5H16V7Z" fill="#828282" />
                </svg>
                <span>Talent</span>
              </bdi>
            </li>
            <li
              onClick={() => {
                sidebar_change("/manage-talent");
              }}
            >
              <bdi className={location.pathname === "/manage-talent" ? "active" : ""}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.5 0.500031C7.02357 0.500031 5 2.52363 5 5.00003C5 7.47643 7.02357 9.50003 9.5 9.50003C11.9764 9.50003 14 7.47643 14 5.00003C14 2.52363 11.9764 0.500031 9.5 0.500031ZM9.5 2.00003C11.1657 2.00003 12.5 3.33429 12.5 5.00003C12.5 6.66576 11.1657 8.00003 9.5 8.00003C7.83425 8.00003 6.5 6.66576 6.5 5.00003C6.5 3.33429 7.83425 2.00003 9.5 2.00003ZM7.25 11C3.52348 11 0.5 14.0235 0.5 17.75V19.25C0.50002 19.4489 0.579044 19.6397 0.719692 19.7803C0.86034 19.921 1.05109 20 1.25 20H9.38577C9.48516 20.0014 9.58383 19.9831 9.67606 19.946C9.76828 19.909 9.85222 19.8539 9.923 19.7841C9.99377 19.7144 10.05 19.6312 10.0883 19.5395C10.1267 19.4478 10.1465 19.3494 10.1465 19.25C10.1465 19.1506 10.1267 19.0522 10.0883 18.9605C10.05 18.8688 9.99377 18.7857 9.923 18.7159C9.85222 18.6461 9.76828 18.5911 9.67606 18.554C9.58383 18.517 9.48516 18.4986 9.38577 18.5H2V17.75C2 14.8286 4.32853 12.5 7.25 12.5H10.2617C10.3611 12.5014 10.4598 12.4831 10.552 12.446C10.6442 12.409 10.7281 12.3539 10.7989 12.2841C10.8697 12.2144 10.9259 12.1312 10.9643 12.0395C11.0026 11.9478 11.0224 11.8494 11.0224 11.75C11.0224 11.6506 11.0026 11.5522 10.9643 11.4605C10.9259 11.3688 10.8697 11.2857 10.7989 11.2159C10.7281 11.1461 10.6442 11.0911 10.552 11.054C10.4598 11.017 10.3611 10.9986 10.2617 11H7.25ZM16.2401 11C15.8218 11.0067 15.4917 11.3466 15.4974 11.7602V12.5761C15.0201 12.6744 14.5753 12.8663 14.182 13.1283L13.6063 12.5526C13.4295 12.3708 13.2289 12.3023 13.0395 12.3124C12.4713 12.3427 12.0003 13.0829 12.5458 13.6131L13.1244 14.1918C12.8638 14.5856 12.672 15.0297 12.5751 15.5071H11.7607C10.7464 15.4928 10.7464 17.0214 11.7607 17.0071H12.578C12.6761 17.48 12.867 17.9203 13.1259 18.3107L12.5428 18.8937C11.8155 19.6007 12.8964 20.6815 13.6034 19.9542L14.1849 19.3727C14.5776 19.6337 15.0211 19.8253 15.4974 19.9235V20.7393C15.4832 21.7535 17.0117 21.7535 16.9974 20.7393V19.9249C17.4732 19.8277 17.9158 19.6355 18.3084 19.3756L18.8944 19.9615C19.1892 20.2647 19.677 20.2647 19.9681 19.9645C20.259 19.6641 20.2517 19.1896 19.9545 18.9011L19.3716 18.3181C19.6327 17.9261 19.8237 17.4827 19.9223 17.0071H20.7397C21.1624 17.0131 21.5065 16.668 21.4999 16.2498C21.4924 15.8317 21.1533 15.5015 20.7397 15.5072H19.9252C19.8277 15.0272 19.636 14.5799 19.3731 14.1845L19.9515 13.6059C20.2548 13.3112 20.2549 12.8233 19.9515 12.5322C19.8022 12.3875 19.6097 12.3165 19.4184 12.3184C19.2272 12.3221 19.0374 12.3979 18.894 12.5454L18.3139 13.1255C17.9206 12.8646 17.4769 12.6722 16.9999 12.5747V11.7603C17.0074 11.3375 16.6608 10.9935 16.2427 11.0001L16.2401 11ZM16.2506 13.9999C17.5021 13.9999 18.5005 14.9983 18.5005 16.2498C18.5005 17.5012 17.5021 18.4997 16.2506 18.4997C14.999 18.4997 14.0006 17.5012 14.0006 16.2498C14.0006 14.9983 14.999 13.9999 16.2506 13.9999Z" fill="#828282" />
                </svg>

                <span>Manage talent</span>
              </bdi>
            </li>
            <li
              onClick={() => {
                sidebar_change("/requests");
              }}
            >
              <bdi className={location.pathname === "/requests" || location.pathname === "/request-video" ? "active" : ""}>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 9C7.44772 9 7 9.44771 7 10C7 10.5523 7.44772 11 8 11V9ZM11 11C11.5523 11 12 10.5523 12 10C12 9.44771 11.5523 9 11 9V11ZM8 13C7.44772 13 7 13.4477 7 14C7 14.5523 7.44772 15 8 15V13ZM11 15C11.5523 15 12 14.5523 12 14C12 13.4477 11.5523 13 11 13V15ZM5 9C4.44772 9 4 9.44771 4 10C4 10.5523 4.44772 11 5 11V9ZM5.01 11C5.56228 11 6.01 10.5523 6.01 10C6.01 9.44771 5.56228 9 5.01 9V11ZM5 13C4.44772 13 4 13.4477 4 14C4 14.5523 4.44772 15 5 15V13ZM5.01 15C5.56228 15 6.01 14.5523 6.01 14C6.01 13.4477 5.56228 13 5.01 13V15ZM14 5V17H16V5H14ZM13 18H3V20H13V18ZM2 17V5H0V17H2ZM3 4H5V2H3V4ZM11 4H13V2H11V4ZM3 18C2.44772 18 2 17.5523 2 17H0C0 18.6569 1.34315 20 3 20V18ZM14 17C14 17.5523 13.5523 18 13 18V20C14.6569 20 16 18.6569 16 17H14ZM16 5C16 3.34315 14.6569 2 13 2V4C13.5523 4 14 4.44772 14 5H16ZM2 5C2 4.44772 2.44772 4 3 4V2C1.34315 2 0 3.34315 0 5H2ZM8 11H11V9H8V11ZM8 15H11V13H8V15ZM7 2H9V0H7V2ZM9 4H7V6H9V4ZM7 4C6.44772 4 6 3.55228 6 3H4C4 4.65685 5.34315 6 7 6V4ZM10 3C10 3.55228 9.55228 4 9 4V6C10.6569 6 12 4.65685 12 3H10ZM9 2C9.55228 2 10 2.44772 10 3H12C12 1.34315 10.6569 0 9 0V2ZM7 0C5.34315 0 4 1.34315 4 3H6C6 2.44772 6.44772 2 7 2V0ZM5 11H5.01V9H5V11ZM5 15H5.01V13H5V15Z" fill="#828282" />
                </svg>

                <span>Requests</span>
              </bdi>
            </li>
            <li
              onClick={() => {
                sidebar_change("/refund");
              }}
            >
              <bdi className={location.pathname === "/refund" ? "active" : ""}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_2983_10922)">
                    <path d="M21 7.28V5C21 3.9 20.1 3 19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V16.72C21.59 16.37 22 15.74 22 15V9C22 8.26 21.59 7.63 21 7.28ZM20 9V15H13V9H20ZM5 19V5H19V7H13C11.9 7 11 7.9 11 9V15C11 16.1 11.9 17 13 17H19V19H5Z" fill="#828282" />
                    <path d="M16 13.5C16.8284 13.5 17.5 12.8284 17.5 12C17.5 11.1716 16.8284 10.5 16 10.5C15.1716 10.5 14.5 11.1716 14.5 12C14.5 12.8284 15.1716 13.5 16 13.5Z" fill="#828282" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2983_10922">
                      <rect width="24" height="23.9999" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span>Refund & Rewards</span>
              </bdi>
            </li>

            <li>
              <Accordion defaultActiveKey="0" className={location.pathname === "/settings" || location.pathname === "/admin" || location.pathname === "/change-password" ? "open-sidebar" : "close-sidebar"}>
                <Accordion.Item eventKey="1">
                  <Accordion.Header className={location.pathname === "/settings" || location.pathname === "/admin" || location.pathname === "/change-password" ? "active" : ""}>
                    <bdi>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.8194 22H10.1794C9.70955 22 9.30299 21.673 9.20243 21.214L8.79543 19.33C8.25248 19.0921 7.73765 18.7946 7.26043 18.443L5.42343 19.028C4.97543 19.1709 4.48842 18.9823 4.25343 18.575L2.42943 15.424C2.19702 15.0165 2.27709 14.5025 2.62243 14.185L4.04743 12.885C3.98263 12.2961 3.98263 11.7019 4.04743 11.113L2.62243 9.816C2.27658 9.49837 2.19648 8.98372 2.42943 8.576L4.24943 5.423C4.48442 5.0157 4.97143 4.82714 5.41943 4.97L7.25643 5.555C7.50049 5.37416 7.75456 5.20722 8.01743 5.055C8.26977 4.91269 8.52947 4.78385 8.79543 4.669L9.20343 2.787C9.3035 2.32797 9.70962 2.00049 10.1794 2H13.8194C14.2892 2.00049 14.6954 2.32797 14.7954 2.787L15.2074 4.67C15.4882 4.79352 15.7617 4.93308 16.0264 5.088C16.2734 5.23081 16.5121 5.38739 16.7414 5.557L18.5794 4.972C19.0271 4.82967 19.5135 5.01816 19.7484 5.425L21.5684 8.578C21.8008 8.98548 21.7208 9.49951 21.3754 9.817L19.9504 11.117C20.0152 11.7059 20.0152 12.3001 19.9504 12.889L21.3754 14.189C21.7208 14.5065 21.8008 15.0205 21.5684 15.428L19.7484 18.581C19.5135 18.9878 19.0271 19.1763 18.5794 19.034L16.7414 18.449C16.5089 18.6203 16.2672 18.7789 16.0174 18.924C15.7553 19.0759 15.4848 19.2131 15.2074 19.335L14.7954 21.214C14.695 21.6726 14.2889 21.9996 13.8194 22ZM7.61943 16.229L8.43943 16.829C8.62428 16.9652 8.81694 17.0904 9.01643 17.204C9.20413 17.3127 9.3974 17.4115 9.59543 17.5L10.5284 17.909L10.9854 20H13.0154L13.4724 17.908L14.4054 17.499C14.8127 17.3194 15.1993 17.0961 15.5584 16.833L16.3794 16.233L18.4204 16.883L19.4354 15.125L17.8524 13.682L17.9644 12.67C18.0136 12.2274 18.0136 11.7806 17.9644 11.338L17.8524 10.326L19.4364 8.88L18.4204 7.121L16.3794 7.771L15.5584 7.171C15.1992 6.90671 14.8127 6.68175 14.4054 6.5L13.4724 6.091L13.0154 4H10.9854L10.5264 6.092L9.59543 6.5C9.39724 6.58704 9.20395 6.68486 9.01643 6.793C8.81817 6.90633 8.62652 7.03086 8.44243 7.166L7.62143 7.766L5.58143 7.116L4.56443 8.88L6.14743 10.321L6.03543 11.334C5.98623 11.7766 5.98623 12.2234 6.03543 12.666L6.14743 13.678L4.56443 15.121L5.57943 16.879L7.61943 16.229ZM11.9954 16C9.78629 16 7.99543 14.2091 7.99543 12C7.99543 9.79086 9.78629 8 11.9954 8C14.2046 8 15.9954 9.79086 15.9954 12C15.9927 14.208 14.2034 15.9972 11.9954 16ZM11.9954 10C10.9028 10.0011 10.0133 10.8788 9.99766 11.9713C9.98201 13.0638 10.846 13.9667 11.9381 13.9991C13.0302 14.0315 13.9463 13.1815 13.9954 12.09V12.49V12C13.9954 10.8954 13.1 10 11.9954 10Z" fill="#828282" />
                      </svg>
                      <span>Settings</span>
                    </bdi>
                  </Accordion.Header>
                  <Accordion.Body>
                    <li
                      onClick={() => {
                        sidebar_change("/admin");
                      }}
                    >
                      <bdi className={location.pathname === "/admin" || location.pathname === "/admin-edit" ? "active" : ""}>
                        <span>Admin</span>
                      </bdi>
                    </li>
                    <li
                      onClick={() => {
                        sidebar_change("/change-password");
                      }}
                    >
                      <bdi className={location.pathname === "/change-password" ? "active" : ""}>
                        <span>Change password</span>
                      </bdi>
                    </li>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </li>

            <li>
              <Accordion defaultActiveKey="0" className={location.pathname === "/home-page-section" || location.pathname === "/home-about-section" || location.pathname === "/popular" || location.pathname === "/recommend-for-you" || location.pathname === "/featured" || location.pathname === "/trendings" ? "open-sidebar" : "close-sidebar"}>
                <Accordion.Item eventKey="3">
                  <Accordion.Header className={location.pathname === "/website" || location.pathname === "/main-banner-section" || location.pathname === "/home-page-section" || location.pathname === "/home-about-section" ? "active" : ""}>
                    <bdi>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.8194 22H10.1794C9.70955 22 9.30299 21.673 9.20243 21.214L8.79543 19.33C8.25248 19.0921 7.73765 18.7946 7.26043 18.443L5.42343 19.028C4.97543 19.1709 4.48842 18.9823 4.25343 18.575L2.42943 15.424C2.19702 15.0165 2.27709 14.5025 2.62243 14.185L4.04743 12.885C3.98263 12.2961 3.98263 11.7019 4.04743 11.113L2.62243 9.816C2.27658 9.49837 2.19648 8.98372 2.42943 8.576L4.24943 5.423C4.48442 5.0157 4.97143 4.82714 5.41943 4.97L7.25643 5.555C7.50049 5.37416 7.75456 5.20722 8.01743 5.055C8.26977 4.91269 8.52947 4.78385 8.79543 4.669L9.20343 2.787C9.3035 2.32797 9.70962 2.00049 10.1794 2H13.8194C14.2892 2.00049 14.6954 2.32797 14.7954 2.787L15.2074 4.67C15.4882 4.79352 15.7617 4.93308 16.0264 5.088C16.2734 5.23081 16.5121 5.38739 16.7414 5.557L18.5794 4.972C19.0271 4.82967 19.5135 5.01816 19.7484 5.425L21.5684 8.578C21.8008 8.98548 21.7208 9.49951 21.3754 9.817L19.9504 11.117C20.0152 11.7059 20.0152 12.3001 19.9504 12.889L21.3754 14.189C21.7208 14.5065 21.8008 15.0205 21.5684 15.428L19.7484 18.581C19.5135 18.9878 19.0271 19.1763 18.5794 19.034L16.7414 18.449C16.5089 18.6203 16.2672 18.7789 16.0174 18.924C15.7553 19.0759 15.4848 19.2131 15.2074 19.335L14.7954 21.214C14.695 21.6726 14.2889 21.9996 13.8194 22ZM7.61943 16.229L8.43943 16.829C8.62428 16.9652 8.81694 17.0904 9.01643 17.204C9.20413 17.3127 9.3974 17.4115 9.59543 17.5L10.5284 17.909L10.9854 20H13.0154L13.4724 17.908L14.4054 17.499C14.8127 17.3194 15.1993 17.0961 15.5584 16.833L16.3794 16.233L18.4204 16.883L19.4354 15.125L17.8524 13.682L17.9644 12.67C18.0136 12.2274 18.0136 11.7806 17.9644 11.338L17.8524 10.326L19.4364 8.88L18.4204 7.121L16.3794 7.771L15.5584 7.171C15.1992 6.90671 14.8127 6.68175 14.4054 6.5L13.4724 6.091L13.0154 4H10.9854L10.5264 6.092L9.59543 6.5C9.39724 6.58704 9.20395 6.68486 9.01643 6.793C8.81817 6.90633 8.62652 7.03086 8.44243 7.166L7.62143 7.766L5.58143 7.116L4.56443 8.88L6.14743 10.321L6.03543 11.334C5.98623 11.7766 5.98623 12.2234 6.03543 12.666L6.14743 13.678L4.56443 15.121L5.57943 16.879L7.61943 16.229ZM11.9954 16C9.78629 16 7.99543 14.2091 7.99543 12C7.99543 9.79086 9.78629 8 11.9954 8C14.2046 8 15.9954 9.79086 15.9954 12C15.9927 14.208 14.2034 15.9972 11.9954 16ZM11.9954 10C10.9028 10.0011 10.0133 10.8788 9.99766 11.9713C9.98201 13.0638 10.846 13.9667 11.9381 13.9991C13.0302 14.0315 13.9463 13.1815 13.9954 12.09V12.49V12C13.9954 10.8954 13.1 10 11.9954 10Z" fill="#828282" />
                      </svg>
                      <span>Website</span>
                    </bdi>
                  </Accordion.Header>
                  <Accordion.Body>
                    <li>
                      <Accordion defaultActiveKey="1" className={location.pathname === "/popular" || location.pathname === "/recommend-for-you" || location.pathname === "/featured" || location.pathname === "/trendings" ? "open-sidebar" : "close-sidebar"}>
                        <Accordion.Item eventKey="2">
                          <Accordion.Header>
                            <li
                              onClick={() => {
                                sidebar_change("/home-page-section");
                              }}
                            >
                              <bdi className={location.pathname === "/home-page-section" ? "active" : ""}>
                                <span>Website home page</span>
                              </bdi>
                            </li>
                          </Accordion.Header>
                          <Accordion.Body>
                            <li
                              onClick={() => {
                                sidebar_change("/popular");
                              }}
                            >
                              <bdi className={location.pathname === "/popular" ? "active" : ""}>
                                <span>Popular</span>
                              </bdi>
                            </li>
                            <li
                              onClick={() => {
                                sidebar_change("/featured");
                              }}
                            >
                              <bdi className={location.pathname === "/featured" ? "active" : ""}>
                                <span>Featured</span>
                              </bdi>
                            </li>
                            <li
                              onClick={() => {
                                sidebar_change("/trendings");
                              }}
                            >
                              <bdi className={location.pathname === "/trendings" ? "active" : ""}>
                                <span>Trendings</span>
                              </bdi>
                            </li>
                            <li
                              onClick={() => {
                                sidebar_change("/recommend-for-you");
                              }}
                            >
                              <bdi className={location.pathname === "/recommend-for-you" ? "active" : ""}>
                                <span>Recommend for you</span>
                              </bdi>
                            </li>
                            {/* <li
                              onClick={() => {
                                sidebar_change("/landing-page-builder");
                              }}
                            >
                              <bdi className={location.pathname === "/landing-page-builder" ? "active" : ""}>
                                <span>Landing Page Builder</span>
                              </bdi>
                            </li>
                            <li
                              onClick={() => {
                                sidebar_change("/landing-page-content");
                              }}
                            >
                              <bdi className={location.pathname === "/landing-page-content" ? "active" : ""}>
                                <span>Landing Page Content</span>
                              </bdi>
                            </li> */}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </li>
                    {/* <li>
                      <bdi className={location.pathname === "/home-page-section" ? "active" : ""}>
                        <span>Website Home Page</span>
                      </bdi>
                    </li> */}
                    <li
                      onClick={() => {
                        sidebar_change("/home-about-section");
                      }}
                    >
                      <bdi className={location.pathname === "/home-about-section" ? "active" : ""}>
                        <span>Website about page</span>
                      </bdi>
                    </li>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </li>
          </ul>

          <div
            className="logout-div"
            onClick={() => setLogoutModel(true)}
          >
            <bdi className={location.pathname.includes("login") ? "active" : ""}>
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5558 0H2.44421C1.79597 0 1.17427 0.257515 0.715894 0.715894C0.257515 1.17427 0 1.79597 0 2.44421L0 7.33368H2.44421V2.44421H19.5558V19.5558H2.44421V14.6674H0V19.5558C0 20.204 0.257515 20.8257 0.715894 21.2841C1.17427 21.7425 1.79597 22 2.44421 22H19.5558C20.204 22 20.8257 21.7425 21.2841 21.2841C21.7425 20.8257 22 20.204 22 19.5558V2.44421C22 1.79597 21.7425 1.17427 21.2841 0.715894C20.8257 0.257515 20.204 0 19.5558 0V0Z" fill="#7C64F8" />
                <path d="M8.65974 15.3823L10.3892 17.1118L16.5003 11.0007L10.3892 4.88965L8.65974 6.61911L11.8187 9.77911H0V12.2233H11.8187L8.65974 15.3823Z" fill="#7C64F8" />
              </svg>
              <span className="comn-txt-class purple-txt">Logout</span>
            </bdi>
          </div>
        </div>
      </div>
      {/* ---------- logout ------------- */}

      <Modal show={logoutModel} onHide={() => setLogoutModel(false)} size="sm" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header className="p-4 pb-0">
          <h4>Logout</h4>
        </Modal.Header>
        <Modal.Body className="p-4 pt-0">
          <div className="text-start modal-data">
            <p className="mb-0">Are you sure you want to logout?</p>
            <div className="row">
              <div className="col-12 d-flex mt-3">
                <button className="comn-btn-class w-100 me-2" type="submit" onClick={() => handleLogout()}>
                  Yes
                </button>
                <button className="comn-btn-class cancle-btn-class w-100 ms-2" type="submit" onClick={() => setLogoutModel(false)}>
                  No
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
