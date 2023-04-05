import React, { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import { Tab, Nav, Modal } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import Moment from "react-moment";
import RtdDatatable from "../components/DataTable/RtdDatatable";
import User_Img from "../images/user.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./modals/DeleteModal";

export default function Requests() {
  const [deleteShow, setDeleteShow] = useState(false);
  const [id, setId] = useState("");
  const [video_data, set_video_Data] = useState([]);
  const [chat_data, set_chat_Data] = useState([]);
  const [option, set_option] = useState({
    sizePerPage: 10,
    search: "",
    totalRecord: 0,
    page: 0,
    sort: "id",
    order: "DESC",
  });
  const [options, set_options] = useState({
    sizePerPage: 10,
    search: "",
    totalRecord: 0,
    page: 0,
    sort: "id",
    order: "DESC",
  });
  const navigate = useNavigate();

  const delete_userShow = () => setDeleteShow(true);
  const delete_userClose = () => setDeleteShow(false);

  useEffect(() => {
    getRequestData();
  }, []);

  const videioDetailsData = (id) => {
    navigate(`/request-video`, { state: { id: id } });
  };

  const getRequestData = () => {
    let data = { option: option };
    const addRequestData = new Promise((resolve) => {
      resolve(PostApi(API_Path.addrequest, data));
    });
    addRequestData.then((res) => {
      if (res.status == 200) {
        set_option({ ...option, totalRecord: res.data.data.videoRecord });
        set_options({ ...options, totalRecord: res.data.data.chatRecord });
        set_video_Data(res.data.data.video);
        set_chat_Data(res.data.data.chat);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleDelete = () => {
    const data = { reqId: id };

    let addTalentData = new Promise((resolve) => {
      resolve(PostApi(API_Path.removeRequest, data));
    });
    addTalentData.then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        setDeleteShow(false);
        getRequestData();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const columns1 = [
    {
      value: "image",
      label: "Photo",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <div className="rtd-table-profile d-flex align-items-center">{data[i].image ? <img src={data[i].image} alt="product" className="img-fluid" width="50px" /> : <img src={User_Img} alt="product" className="img-fluid" width="50px" />}</div>;
        },
      },
    },
    // {
    //   value: "user_name",
    //   label: "Username",
    //   options: {
    //     filter: false,
    //     sort: false,
    //   },
    // },
    {
      value: "fullname",
      label: "Talent’s name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "selectoccasion",
      label: "Occasion",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "standard_price",
      label: "Amount",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <span>${data[i].standard_price}</span>;
        },
      },
    },
    {
      value: "created_at",
      label: "Submit date",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, i) => {
          return <Moment format="DD/MM/YYYY">{data[i].created_at}</Moment>;
        },
      },
    },
    // {
    //   value: "attach_video",
    //   label: "Video link",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (data, i) => {
    //       return <a href={data[i].attach_video}>{data[i].attach_video ? data[i].attach_video : "--"}</a>;
    //     },
    //   },
    // },
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
                  <Dropdown.Item>
                    <bdi
                      className="d-flex align-items-center justify-content-center"
                      onClick={() => {
                        videioDetailsData(data[i].talent_id);
                      }}
                    >
                      {/* <svg width="16" height="16" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 14C8.35987 14.0204 6.7367 13.6664 5.254 12.965C4.10469 12.4042 3.07265 11.6297 2.213 10.683C1.30243 9.7041 0.585467 8.56164 0.1 7.31598L0 6.99998L0.105 6.68398C0.590815 5.43941 1.30624 4.29725 2.214 3.31698C3.07334 2.37029 4.10504 1.59584 5.254 1.03498C6.73671 0.333567 8.35988 -0.0204101 10 -2.11214e-05C11.6401 -0.0203749 13.2633 0.333601 14.746 1.03498C15.8953 1.59571 16.9274 2.37017 17.787 3.31698C18.6993 4.29453 19.4165 5.43734 19.9 6.68398L20 6.99998L19.895 7.31598C18.3262 11.3998 14.3742 14.0693 10 14ZM10 1.99998C6.59587 1.89331 3.47142 3.87507 2.117 6.99998C3.4712 10.1251 6.59579 12.1069 10 12C13.4041 12.1064 16.5284 10.1247 17.883 6.99998C16.5304 3.87356 13.4047 1.89106 10 1.99998ZM10 9.99998C8.55733 10.0095 7.30937 8.99734 7.02097 7.58375C6.73256 6.17017 7.48427 4.75 8.81538 4.19364C10.1465 3.63728 11.6852 4.10011 12.4885 5.29849C13.2919 6.49686 13.1354 8.09606 12.115 9.11598C11.5563 9.68124 10.7948 9.99954 10 9.99998Z" fill="#fff" />
                      </svg> */}
                      <span className="">View </span>
                    </bdi>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <bdi className="d-flex align-items-center justify-content-center" onClick={() => delete_userShow()}>
                      {/* <svg width="16" height="16" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 20H4C2.89543 20 2 19.1046 2 18V5H0V3H4V2C4 0.89543 4.89543 0 6 0H12C13.1046 0 14 0.89543 14 2V3H18V5H16V18C16 19.1046 15.1046 20 14 20ZM4 5V18H14V5H4ZM6 2V3H12V2H6ZM12 16H10V7H12V16ZM8 16H6V7H8V16Z" fill="#fff" />
                      </svg> */}
                      <span
                        className=""
                        onClick={() => {
                          setId(data[i].id);
                        }}
                      >
                        Delete request
                      </span>
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

  // ============ Chat Request ============= //

  const columns2 = [
    {
      value: "image",
      label: "Photo",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <div className="table-user-div d-flex align-items-center">{data[i].image ? <img src={data[i].image} alt="product" className="img-fluid" /> : <img src={User_Img} alt="product" className="img-fluid" width="50px" />}</div>;
        },
      },
    },
    // {
    //   value: "user_name",
    //   label: "Username",
    //   options: {
    //     filter: false,
    //     sort: false,
    //   },
    // },
    {
      value: "fullname",
      label: "Talent’s name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "standard_price",
      label: "Amount",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <span>${data[i].standard_price}</span>;
        },
      },
    },
    {
      value: "created_at",
      label: "Submit date",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, i) => {
          return <Moment format="DD/MM/YYYY">{data[i].created_at}</Moment>;
        },
      },
    },
    {
      value: "requests_time",
      label: "Requests time",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return (
            <>
              <Moment format="hh:mm">{data[i].created_at}</Moment>
              <span> AM</span>
            </>
          );
        },
      },
    },
    {
      value: "_id",
      label: "Action",
      options: {
        filter: true,
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
                  <Dropdown.Item>
                    <bdi className="d-flex align-items-center justify-content-center" onClick={() => delete_userShow()}>
                      {/* <svg width="16" height="16" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 20H4C2.89543 20 2 19.1046 2 18V5H0V3H4V2C4 0.89543 4.89543 0 6 0H12C13.1046 0 14 0.89543 14 2V3H18V5H16V18C16 19.1046 15.1046 20 14 20ZM4 5V18H14V5H4ZM6 2V3H12V2H6ZM12 16H10V7H12V16ZM8 16H6V7H8V16Z" fill="#fff" />
                      </svg> */}
                      <span
                        className=""
                        onClick={() => {
                          setId(data[i].id);
                        }}
                      >
                        Delete request
                      </span>
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

  const tableCallBack = (option) => {
    set_option(option);
    getRequestData();
  };

  const tableCallBack2 = (options) => {
    set_options(options);
    getRequestData();
  };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mt-3">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <div className="d-sm-flex align-items-center ">
                    <div className="talent-tab-sec">
                      <Nav variant="pills">
                        <Nav.Item>
                          <Nav.Link eventKey="first">Video requests</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">Chat requests</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>
                    {/* <div className="mt-sm-0 mt-3 ms-auto comn-gray-form-select border-class">
                      <select className="form-select  w-100" name="all">
                        <option>All</option>
                        <option>123</option>
                        <option>456</option>
                      </select>
                    </div> */}
                  </div>
                  <div className="tab-content-sec">
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <div className="col-12 mt-3">
                          <div className="rtd-table-black-bg">
                            <div className="rtd-table-info mt-3">
                              <RtdDatatable option={option} columns={columns1} data={video_data} tableCallBack={tableCallBack} />
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div className="col-12 mt-3">
                          <div className="rtd-table-black-bg">
                            <div className="rtd-table-info mt-3">
                              <RtdDatatable option={options} columns={columns2} data={chat_data} tableCallBack={tableCallBack2} />
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
        <Modal show={deleteShow} onHide={delete_userClose} size="sm" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
          <DeleteModal headerString={"Delete request"} bodyString={"Are you sure you want to delete request?"} closeModal={delete_userClose} callApi={handleDelete} />
        </Modal>
      </UserLayout>
    </>
  );
}
