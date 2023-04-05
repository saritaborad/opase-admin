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
  const [recommendData, setRecommendData] = useState([]);
  const [myArr, setMyArr] = useState([]);

  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    getRecommendForYouHomeData();
  }, []);

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

  let getRecommendForYouHomeData = () => {
    let data = { option: option };

    let GetWebsiteHomeRecommendData = new Promise((resolve) => {
      resolve(PostApi(API_Path.getRecommendData, data));
    });
    GetWebsiteHomeRecommendData.then((res) => {
      if (res.status === 200) {
        set_option({ ...option, totalRecord: res.data.data.totalRecord });
        // setRecommendData(res.data.data.recommended);
        getUpdatedReccomendedData(res.data.data.recommended);
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
    filteredArr = recommendData?.filter((x) => x.id !== data.id);
    temp = filteredArr;
    setRecommendData(filteredArr);
    setShowUpdate(true);
  };

  const handleRemove = async (data) => {
    if (!temp.includes(data)) {
      await temp.push(data);
    }

    let filtered = await myArr?.filter((item) => item.id !== data.id);
    let filter1 = recommendData?.filter((item) => !recommendData.includes(item));

    await setRecommendData([...filter1, ...temp]);
    setMyArr(filtered);

    if (myArr.length > 0) {
      setShowUpdate(true);
    }
  };

  const tableCallBack = (option) => {
    set_option(option);
    getRecommendForYouHomeData();
  };

  const handleUpdate = async () => {
    const arr1 = await myArr?.map((item) => {
      return item.id;
    });

    let data = {
      show_items: arr1,
      position: 1,
    };

    let updateRecommendedData = new Promise((resolve) => {
      resolve(PostApi(API_Path.UpdateSectionData, data));
    });
    updateRecommendedData.then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        getUpdatedReccomendedData();
        getRecommendForYouHomeData();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const getUpdatedReccomendedData = (data1) => {
    let data = {
      position: 1,
    };

    let getReccomendedData = new Promise((resolve) => {
      resolve(PostApi(API_Path.getSectionUpdatedData, data));
    });

    getReccomendedData.then((res) => {
      if (res.status === 200) {
        let filtered = data1?.filter((o1) => res.data.data?.some((o2) => o1.id === o2.id));
        let filtered1 = data1.filter((item) => !filtered.includes(item));
        setRecommendData(filtered1);
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
    let arr2 = [];
    const copyListItems = [...myArr];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    await setMyArr(copyListItems);
    copyListItems.map((item) => {
      arr2.push(item.id);
    });
  };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              {myArr?.length > 0 && (
                <div className="col-12 mt-3">
                  <h3>Recommend for you</h3>
                </div>
              )}
              <div className="col-12 mt-3">
                <div className="image-add-class">
                  {myArr?.length > 0 &&
                    myArr.map((item, i) => {
                      return (
                        <>
                          <div key={item.id} className="Image-edit-class" onDragStart={(e) => dragStart(e, i)} onDragEnter={(e) => dragEnter(e, i)} onDragEnd={drop} draggable>
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
                    <RtdDatatable option={option} columns={columns} data={recommendData} tableCallBack={tableCallBack} />
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
