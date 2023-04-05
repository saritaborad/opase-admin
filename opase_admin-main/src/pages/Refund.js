import React, { useState } from "react";
import UserLayout from "../components/UserLayout";
import { Dropdown, Modal } from "react-bootstrap";
import User_Img from "../images/table profile img.png";
import { Tab, Nav } from "react-bootstrap";
import RtdDatatable from "../components/DataTable/RtdDatatable";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Moment from "react-moment";

export default function Refund(params) {
  const [ReasonModal, setDeclineModal] = useState(false);
  const [refundData, setRefundData] = useState([]);
  const [option, set_option] = useState({
    sizePerPage: 10,
    search: "",
    totalRecord: 0,
    page: 0,
    sort: "id",
    order: "DESC",
  });

  useEffect(() => {
    refundRewardData();
  }, []);

  const refundRewardData = () => {
    let data = { option: option };
    let addUesrData = new Promise((resolve) => {
      resolve(PostApi(API_Path.refundReward, data));
    });
    addUesrData.then((res) => {
      if (res.status === 200) {
        set_option({ ...option, totalRecord: res.data.data.totalRecord });
        setRefundData(res.data.data.refundReq);
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
          return (
            <div className="table-user-div d-flex align-items-center">
              <img src={data[i].image} alt="product" className="img-fluid" />
            </div>
          );
        },
      },
    },
    {
      value: "fullname",
      label: "Username",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "fullname",
      label: "Talent’s name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "amount",
      label: "Amount",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <span>${data[i].amount}</span>;
        },
      },
    },
    {
      value: "updated_at",
      label: "Request date",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <Moment format="DD/MM/YYYY">{data[i].updated_at}</Moment>;
        },
      },
    },
    {
      value: "updated_at",
      label: "Cancel date",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <Moment format="DD/MM/YYYY">{data[i].updated_at}</Moment>;
        },
      },
    },
    {
      label: "Action",
      value: "Action",
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
                  <Dropdown.Item>
                    <bdi className="d-flex align-items-center justify-content-center">
                      <span className="">Approve</span>
                    </bdi>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setDeclineModal(true);
                    }}
                  >
                    <div>
                      <bdi className="d-flex align-items-center justify-content-center">
                        <span className="">Decline</span>
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

  // ======= Reward ====== //

  const Reward_Info = [
    {
      UserName: "Santa Maria",
      Type: "Invitation",
      Amount: "$5.00",
      Request_Date: "10/10/2021",
    },
    {
      UserName: "Santa Maria",
      Type: "Invitation",
      Amount: "$5.00",
      Request_Date: "10/10/2021",
    },
    {
      UserName: "Santa Maria",
      Type: "Invitation",
      Amount: "$5.00",
      Request_Date: "10/10/2021",
    },
    {
      UserName: "Santa Maria",
      Type: "Invitation",
      Amount: "$5.00",
      Request_Date: "10/10/2021",
    },
    {
      UserName: "Santa Maria",
      Type: "Invitation",
      Amount: "$5.00",
      Request_Date: "10/10/2021",
    },
    {
      UserName: "Santa Maria",
      Type: "Invitation",
      Amount: "$5.00",
      Request_Date: "10/10/2021",
    },
    {
      UserName: "Santa Maria",
      Type: "Invitation",
      Amount: "$5.00",
      Request_Date: "10/10/2021",
    },
    {
      UserName: "Santa Maria",
      Type: "Invitation",
      Amount: "$5.00",
      Request_Date: "10/10/2021",
    },
  ];
  const columns2 = [
    {
      value: "Photo",
      label: "Photo",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, dataIndex, rowIndex) => {
          return (
            <div className="table-user-div d-flex align-items-center">
              <img src={User_Img} alt="product" className="img-fluid" />
            </div>
          );
        },
      },
    },
    {
      value: "UserName",
      label: "Username",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "Type",
      label: "Type",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "Amount",
      label: "Amount",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "Request_Date",
      label: "Request date",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "Action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return (
            <div className="d-flex align-items-center">
              <div>
                <span className="comn-status-class accept-class">Accept</span>
              </div>
              <div className="comn-status-class">
                <span className=" decline-class ms-3">Decline</span>
              </div>
            </div>
          );
        },
      },
    },
  ];

  const tableCallBack = (option) => {
    set_option(option);
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
                          <Nav.Link eventKey="first">Refunds</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">Rewards</Nav.Link>
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
                          <div className="comn-table-black-bg">
                            <div className="mt-3">
                              <RtdDatatable option={option} columns={columns1} data={refundData} tableCallBack={tableCallBack} />
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div className="col-12 mt-3">
                          <div className="comn-table-black-bg">
                            <div className="mt-3">
                              <RtdDatatable option={option} columns={columns2} data={Reward_Info} tableCallBack={tableCallBack} />
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
      </UserLayout>
      <Modal show={ReasonModal} onHide={() => setDeclineModal(false)} size="md" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header className="p-4 pb-0">
          <h4 className="w-100 text-center">Reason</h4>
        </Modal.Header>
        <Modal.Body className="p-4 pt-0">
          <div className="text-center modal-data">
            <div className="col-12 mb-4">
              <textarea className="w-100 talent-info-main" name="resion" rows={4} placeholder="Enter reason."></textarea>
            </div>
            <div className="row">
              <div className="col-12 d-flex mt-3">
                <button className="comn-btn-class w-100 me-2" type="submit">
                  Yes
                </button>
                <button className="comn-btn-class cancle-btn-class w-100 ms-2" type="button" onClick={() => setDeclineModal(false)}>
                  No
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
