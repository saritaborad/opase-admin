import React, { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import { Dropdown } from "react-bootstrap";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { useNavigate } from "react-router-dom";
import RtdDatatable from "../components/DataTable/RtdDatatable";
import { Modal } from "react-bootstrap";
import User_Img from "../images/user.png";
import { toast } from "react-toastify";
import DeleteModal from "./modals/DeleteModal";

export default function User(params) {
  const navigate = useNavigate();
  const [declineModal, setDeclineModalShow] = useState(false);
  const [userData, setUserData] = useState([]);
  const [id, setId] = useState();
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
      value: "image",
      label: "Photo",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return (
            <div className="table-user-div d-flex align-items-center" onClick={() => handleuserData(data[i].id)}>
              {/* {data[i] ? <img src={data[i].image} alt="product" className="img-fluid" /> : <img src={User_Img} alt="product" className="img-fluid" width="50px" />} */}
              <img src={data[i].image !== "null" && data[i].image !== "" ? data[i].image : User_Img} alt="product" referrerPolicy="no-referrer" className="img-fluid" />
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
      value: "phone",
      label: "Phone number",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          {
            return <span>+{data[i].phone}</span>;
          }
        },
      },
    },
    {
      value: "video",
      label: "Video requests",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "chat",
      label: "Chat requests",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "_id",
      name: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return (
            <div className="table-ed-drop">
              <Dropdown drop="left">
                <Dropdown.Toggle className="table-dropdown-btn" id="dropdown-basic">
                  <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 2C4 3.10457 3.10457 4 2 4C0.89543 4 0 3.10457 0 2C0 0.895431 0.89543 0 2 0C2.53043 0 3.03914 0.210714 3.41421 0.585787C3.78929 0.960859 4 1.46957 4 2ZM4 8C4 9.10457 3.10457 10 2 10C0.89543 10 0 9.10457 0 8C0 6.89543 0.89543 6 2 6C2.53043 6 3.03914 6.21071 3.41421 6.58579C3.78929 6.96086 4 7.46957 4 8ZM4 14C4 15.1046 3.10457 16 2 16C0.89543 16 0 15.1046 0 14C0 12.8954 0.89543 12 2 12C2.53043 12 3.03914 12.2107 3.41421 12.5858C3.78929 12.9609 4 13.4696 4 14Z" fill="white" />
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleuserData(data[i].id)}>
                    <bdi className="d-flex align-items-center justify-content-center">
                      {/* <svg width="16" height="16" viewBox="0 0 20 15" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 14C8.35987 14.0204 6.7367 13.6664 5.254 12.965C4.10469 12.4042 3.07265 11.6297 2.213 10.683C1.30243 9.7041 0.585467 8.56164 0.1 7.31598L0 6.99998L0.105 6.68398C0.590815 5.43941 1.30624 4.29725 2.214 3.31698C3.07334 2.37029 4.10504 1.59584 5.254 1.03498C6.73671 0.333567 8.35988 -0.0204101 10 -2.11214e-05C11.6401 -0.0203749 13.2633 0.333601 14.746 1.03498C15.8953 1.59571 16.9274 2.37017 17.787 3.31698C18.6993 4.29453 19.4165 5.43734 19.9 6.68398L20 6.99998L19.895 7.31598C18.3262 11.3998 14.3742 14.0693 10 14ZM10 1.99998C6.59587 1.89331 3.47142 3.87507 2.117 6.99998C3.4712 10.1251 6.59579 12.1069 10 12C13.4041 12.1064 16.5284 10.1247 17.883 6.99998C16.5304 3.87356 13.4047 1.89106 10 1.99998ZM10 9.99998C8.55733 10.0095 7.30937 8.99734 7.02097 7.58375C6.73256 6.17017 7.48427 4.75 8.81538 4.19364C10.1465 3.63728 11.6852 4.10011 12.4885 5.29849C13.2919 6.49686 13.1354 8.09606 12.115 9.11598C11.5563 9.68124 10.7948 9.99954 10 9.99998Z" fill="#fff" />
                      </svg> */}
                      <span>View</span>
                    </bdi>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <bdi
                      className="d-flex align-items-center justify-content-center"
                      onClick={() => {
                        setId(data[i].id);
                        delete_userShow();
                        // setDeclineModalShow(true);
                      }}
                    >
                      {/* <svg width="16" height="16" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 20H4C2.89543 20 2 19.1046 2 18V5H0V3H4V2C4 0.89543 4.89543 0 6 0H12C13.1046 0 14 0.89543 14 2V3H18V5H16V18C16 19.1046 15.1046 20 14 20ZM4 5V18H14V5H4ZM6 2V3H12V2H6ZM12 16H10V7H12V16ZM8 16H6V7H8V16Z" fill="#fff" />
                      </svg> */}
                      <span>Delete account</span>
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

  useEffect(() => {
    getUsersData();
  }, []);

  let getUsersData = () => {
    let data = { option: option };
    let addUesrData = new Promise((resolve) => {
      resolve(PostApi(API_Path.getUsers, data));
    });
    addUesrData.then((res) => {
      if (res.status === 200) {
        set_option({ ...option, totalRecord: res.data.data.totalRecord });
        setUserData(res.data.data.user);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleDelete1 = () => {
    const data = { talentId: id };

    let addTalentData = new Promise((resolve) => {
      resolve(PostApi(API_Path.removeTalent, data));
    });
    addTalentData.then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        setDeclineModalShow(false);
        getUsersData();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleuserData = (id) => {
    navigate(`/user-details`, { state: { id: id } });
  };

  const tableCallBack = (option) => {
    set_option(option);
    getUsersData();
  };

  const delete_userShow = () => {
    setDeclineModalShow(true);
  };

  const delete_userClose = () => {
    setDeclineModalShow(false);
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
                    <h1 className="mb-0">Users</h1>
                  </div>
                  {/* <div className="mt-sm-0 mt-3 ms-auto comn-gray-form-select border-class">
                    <select className="form-select  w-100" name="all">
                      <option>All</option>
                      <option>123</option>
                      <option>456</option>
                    </select>
                  </div> */}
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="comn-table-black-bg">
                  <div className="mt-3">
                    <RtdDatatable option={option} columns={columns} data={userData} tableCallBack={tableCallBack} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={declineModal} onHide={delete_userClose} size="sm" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
          <DeleteModal headerString={"Delete user account"} bodyString={"Are you sure you want to delete user?"} closeModal={delete_userClose} callApi={handleDelete1} />
        </Modal>
      </UserLayout>
    </>
  );
}
