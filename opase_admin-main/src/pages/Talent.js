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

export default function Talent(params) {
  const [declineModalShow, setDeclineModalShow] = useState(false);
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [talentData, setTalentData] = useState([]);
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [myArr, setMyArr] = useState("");
  const navigate = useNavigate();
  const [option, set_option] = useState({
    sizePerPage: 10,
    search: "",
    totalRecord: 0,
    page: 0,
    sort: "id",
    order: "DESC",
  });

  const delete_userShow = () => setDeclineModalShow(true);
  const delete_userClose = () => setDeclineModalShow(false);
  const deactive_show = () => setDeactivateModal(true);
  const deactive_close = () => setDeactivateModal(false);

  const columns = [
    {
      value: "image",
      label: "Photo",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <div className="table-user-div d-flex align-items-center">{data[i].image !== "null" && data[i].image !== "" ? <img src={data[i].image} alt="product" className="img-fluid" width="50px" /> : <img src={User_Img} alt="product" className="img-fluid" width="50px" />}</div>;
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
    // {
    //   value: "user_name",
    //   label: "Username",
    //   options: {
    //     filter: false,
    //     sort: false,
    //   },
    // },
    {
      value: "email",
      label: "Email address",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "viewProfile",
      label: "Profile views",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "viewVideo",
      label: "Video views",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          {
            return <span>{data[i].viewVideo ? data[i].viewVideo : 0}</span>;
          }
        },
      },
    },
    {
      value: "is_active",
      label: "Status",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          {
            return (
              <div
                className="comn-status-class"
                onClick={() => {
                  setId(data[i].id);
                  setStatus(data[i].admin_status);
                  deactive_show();
                }}
              >
                <span className={data[i].admin_status === 1 ? "active-class" : "decline-class"}>{data[i].admin_status === 1 ? "Active" : "Inactive"}</span>
              </div>
            );
          }
        },
      },
    },
    {
      label: "Action",
      value: "_id",
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
                <Dropdown.Menu className="">
                  <Dropdown.Item
                    onClick={() => {
                      talentDetailsData(data[i].id);
                    }}
                  >
                    <bdi className="d-flex align-items-center justify-content-center">
                      <span className="">View</span>
                    </bdi>
                  </Dropdown.Item>
                  {/* <Dropdown.Item>
                    <bdi className="d-flex align-items-center justify-content-center">
                      <span className="">Deactivate</span>
                    </bdi>
                  </Dropdown.Item> */}
                  <Dropdown.Item>
                    <div>
                      <bdi className="d-flex align-items-center justify-content-center">
                        <span
                          className=""
                          onClick={() => {
                            setId(data[i].id);
                            delete_userShow();
                          }}
                        >
                          Delete account
                        </span>
                      </bdi>
                    </div>
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
    getTalentData();
  }, []);

  const talentDetailsData = (id) => {
    navigate(`/talent-details`, {
      state: { talentId: id, pagename: "talent" },
    });
  };
  const handleDeactiveData = () => {
    let data = { talentId: id, status: status };
    // let addTalentData = new Promise((resolve) => {
    //   resolve(PostApi(API_Path.getTalentDetails, data));
    // });
    // addTalentData.then((res) => {
    //   if (res.status === 200) {
    //     toast.success(res.data.message);
    //     setDeactivateModal(false);
    //     getTalentData();
    //   } else {
    //     toast.error(res.data.message);
    //   }
    // });
  };

  const getTalentData = () => {
    let data = { option: option };
    let addTalentData = new Promise((resolve) => {
      resolve(PostApi(API_Path.getTalent, data));
    });
    addTalentData.then((res) => {
      if (res.status === 200) {
        set_option({ ...option, totalRecord: res.data.data.totalRecord });
        setTalentData(res.data.data.talent);
        setMyArr(res.data.data.talent);
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
        getTalentData();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleDeactive = (id, status) => {
    setDeactivateModal(true);
    setId(id);
  };

  const tableCallBack = (option) => {
    set_option(option);
    getTalentData();
    if (document.getElementById("allData")) {
      document.getElementById("allData").selected = true;
    }
  };

  const handleOption = (e) => {
    if (!(e.target.value === "3")) setStatus(parseInt(e.target.value));
    let arr1 = [];
    let filtered = talentData.filter((item) => item.admin_status === parseInt(e.target.value));
    arr1 = filtered;
    setMyArr(arr1);
    if (e.target.value === "3") {
      setMyArr(talentData);
    }
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
                    <h1 className="mb-0">Talent</h1>
                  </div>
                  <div className="mt-sm-0 mt-3 ms-auto comn-gray-form-select border-class">
                    <select className="form-select  w-100" name="status" onChange={handleOption}>
                      <option className="cmn-online-payment text-center" id="allData" value="3">
                        All
                      </option>
                      <option className="cmn-online-payment text-center" value="1">
                        Active
                      </option>
                      <option className="cmn-online-payment text-center" value="0">
                        Deactivate
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="comn-table-black-bg mt-3">
                  <div className="mt-3">
                    <RtdDatatable option={option} columns={columns} data={myArr} tableCallBack={tableCallBack} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>

      {/* ----------- delete talent ------- */}

      <Modal show={declineModalShow} onHide={delete_userClose} size="sm" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
        <DeleteModal headerString={"Delete talent account"} bodyString={"Are you sure you want to delete talent?"} closeModal={delete_userClose} callApi={handleDelete1} />
      </Modal>

      {/* ----------- deactivate talent ------- */}
      <Modal show={deactivateModal} onHide={deactive_close} size="sm" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
        <DeleteModal headerString={"Inactive talent"} bodyString={"Are you sure you want to inactive this talent?"} closeModal={deactive_close} callApi={handleDeactiveData} />
      </Modal>
    </>
  );
}
