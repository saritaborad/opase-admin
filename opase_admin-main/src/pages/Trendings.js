import React, { useEffect, useRef, useState } from "react";
import RtdDatatable from "../components/DataTable/RtdDatatable";
import UserLayout from "../components/UserLayout";
import User_Img from "../images/user.png";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { toast } from "react-toastify";
import Moment from "react-moment";

let temp = [];

export default function Trendings(params) {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [trendingData, setTrendingData] = useState([]);
  const [myArr, setMyArr] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [option, set_option] = useState({
    sizePerPage: 10,
    search: "",
    totalRecord: 0,
    page: 0,
    sort: "id",
    order: "DESC",
  });

  useEffect(() => {
    getTrendingHomeData();
  }, []);

  const columns = [
    {
      value: "image",
      label: "Image",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <div className="table-user-div d-flex align-items-center">{data[i].image ? <img src={data[i].image} alt="product" className="img-fluid" /> : <img src={User_Img} alt="product" className="img-fluid" />}</div>;
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
      value: "about",
      label: "Description",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "updated_at",
      label: "Update date",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <Moment format="DD/MM/YYYY">{data[i].updated_at}</Moment>;
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
            <div>
              {!myArr.includes(data[i]) ? (
                <div className="table-ed-drop">
                  <button className="comn-status-class accept-class accept border-0" onClick={() => handleAdd(data[i])}>
                    Add
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        },
      },
    },
  ];

  let getTrendingHomeData = () => {
    let data = { option: option };

    let GetWebsiteHomeTrendingData = new Promise((resolve) => {
      resolve(PostApi(API_Path.getTrendingData, data));
    });
    GetWebsiteHomeTrendingData.then((res) => {
      if (res.status === 200) {
        set_option({ ...option, totalRecord: res.data.data.totalRecord });

        // setTrendingData(res.data.data.trading);
        getUpdatedTrendingData(res.data.data.trading);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleAdd = (data) => {
    let tempArr = [];
    if (!myArr.includes(data)) {
      tempArr.push(data);
      setMyArr([...myArr, ...tempArr]);
    }
    var filteredArr = [];
    filteredArr = trendingData?.filter((x) => x.id !== data.id);
    temp = filteredArr;
    setTrendingData(filteredArr);
  };

  const handleRemove = async (data) => {
    if (!temp.includes(data)) {
      await temp.push(data);
    }
    let filtered = await myArr?.filter((item) => item.id !== data.id);
    let filter1 = trendingData.filter((item) => !trendingData.includes(item));
    await setTrendingData([...filter1, ...temp]);
    setMyArr(filtered);

    if (myArr.length > 0) {
      setShowUpdate(true);
    }
  };

  const tableCallBack = (option) => {
    set_option(option);
    getTrendingHomeData();
  };

  const handleUpdate = async () => {
    const arr1 = await myArr?.map((item) => {
      return item.id;
    });

    let data = {
      show_items: arr1,
      position: 2,
    };

    let updateTrendingData = new Promise((resolve) => {
      resolve(PostApi(API_Path.UpdateSectionData, data));
    });

    updateTrendingData.then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        getTrendingHomeData();
        getUpdatedTrendingData();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const getUpdatedTrendingData = (data1) => {
    let data = {
      position: 2,
    };

    let getTrendingData = new Promise((resolve) => {
      resolve(PostApi(API_Path.getSectionUpdatedData, data));
    });

    getTrendingData.then((res) => {
      if (res.status === 200) {
        let filtered = data1?.filter((o1) => res.data.data?.some((o2) => o1.id === o2.id));
        let filtered1 = data1.filter((item) => !filtered.includes(item));
        setTrendingData(filtered1);
        setMyArr(filtered);
        myArr.length > 0 && setShowUpdate(true);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = async () => {
    const copyListItems = [...myArr];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    await setMyArr(copyListItems);
  };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              {myArr?.length > 0 && (
                <div className="col-12 mt-3">
                  <h3>Trendings</h3>
                </div>
              )}
              <div className="col-12 mt-3">
                <div className="image-add-class">
                  {myArr?.length > 0 &&
                    myArr.map((item, i) => {
                      return (
                        <>
                          <div key={i} className="Image-edit-class" onDragStart={(e) => dragStart(e, i)} onDragEnter={(e) => dragEnter(e, i)} onDragEnd={drop} draggable>
                            <img src={item.image} alt="" />
                            <span className="close-btn-new" onClick={() => handleRemove(item)}>
                              X
                            </span>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>

              {showUpdate && (
                <div className="col-12 mt-3">
                  <button className="btn-comnn-purple" onClick={handleUpdate}>
                    Update
                  </button>
                </div>
              )}
              <div className="col-12 mt-3">
                <div className="comn-table-black-bg">
                  <div className="mt-3">
                    <RtdDatatable option={option} columns={columns} data={trendingData} tableCallBack={tableCallBack} />
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
