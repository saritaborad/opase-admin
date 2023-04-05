import React, { useEffect, useState } from "react";
import RtdDatatable from "../components/DataTable/RtdDatatable";
import UserLayout from "../components/UserLayout";
import { Dropdown } from "react-bootstrap";
import User_Img from "../images/user.png";
import { useNavigate } from "react-router-dom";
import { GetApi } from "../api/api-service";
import { API_Path } from "../const";
import { toast } from "react-toastify";
import Moment from "react-moment";

export default function AboutPageSection(params) {
  const navigate = useNavigate();

  const homeBannerData = (id) => {
    navigate(`/edit-about-page-section`, {
      state: { id: id },
    });
  };

  const [HomePageData, setHomePageData] = useState([]);
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
      value: "img_url",
      label: "Url",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <div className="table-user-div d-flex align-items-center">{data[i].img_url ? <img src={data[i].img_url} alt="image" className="img-fluid" /> : <img src={User_Img} alt="product" className="img-fluid" width="50px" />}</div>;
        },
      },
    },
    {
      value: "heading",
      label: "Title",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "description",
      label: "Description",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "position",
      label: "Section name",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return data[i].position == 1 ? "About page main banner" : data[i].position == 2 ? "About page second banner" : data[i].position == 3 ? "About page third banner" : data[i].position == 4 && "About page fourth banner";
        },
      },
    },
    {
      value: "updatedat",
      label: "Update date",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <Moment format="DD/MM/YYYY">{data[i].updatedat}</Moment>;
        },
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
                  <Dropdown.Item>
                    <bdi
                      className="d-flex align-items-center justify-content-center"
                      onClick={() => {
                        homeBannerData(data[i].id);
                      }}
                    >
                      {/* <svg width="16" height="16" viewBox="0 0 19 20" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.41999 19.079C1.13948 19.0785 0.872062 18.9603 0.682993 18.753C0.490439 18.5475 0.394758 18.2695 0.419993 17.989L0.664993 15.295L11.983 3.98103L15.52 7.51703L4.20499 18.83L1.51099 19.075C1.47999 19.078 1.44899 19.079 1.41999 19.079ZM16.226 6.81003L12.69 3.27403L14.811 1.15303C14.9986 0.965251 15.2531 0.859741 15.5185 0.859741C15.7839 0.859741 16.0384 0.965251 16.226 1.15303L18.347 3.27403C18.5348 3.4616 18.6403 3.71612 18.6403 3.98153C18.6403 4.24694 18.5348 4.50146 18.347 4.68903L16.227 6.80903L16.226 6.81003Z" fill="#fff" />
                      </svg> */}
                      <span className="">Edit</span>
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
    getWebsiteAboutPage();
  }, []);

  let getWebsiteAboutPage = () => {
    let GetWebsiteHomePageSectionData = new Promise((resolve) => {
      resolve(GetApi(API_Path.getWebsiteAboutPage));
    });
    GetWebsiteHomePageSectionData.then((res) => {
      if (res.status === 200) {
        setHomePageData(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const tableCallBack = (option) => {
    set_option(option);
    getWebsiteAboutPage();
  };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mt-3">
                <div className="comn-table-black-bg">
                  <div className="mt-3">
                    <RtdDatatable option={option} columns={columns} data={HomePageData} tableCallBack={tableCallBack} />
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
