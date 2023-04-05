import React, { useEffect, useRef, useState } from "react";
import UserLayout from "../components/UserLayout";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { toast } from "react-toastify";
import Moment from "react-moment";
import RtdDatatable from "../components/DataTable/RtdDatatable";
import User_Img from "../images/user.png";

let temp = [];

export default function Featured(params) {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [featured, setFeatured] = useState([]);
  const [myArr, setMyArr] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    getFeaturedData();
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
          return <div className="table-user-div d-flex align-items-center">{data[i].image ? <img src={data[i].image} alt="image1" className="img-fluid" /> : <img src={User_Img} alt="product" className="img-fluid" />}</div>;
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
    // {
    //   value: "headline",
    //   label: "Section Name",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (data, i) => {
    //       return data[i].position == 1 ? "Home Page Main Banner" : "Home Page Video Banner";
    //     },
    //   },
    // },
    {
      value: "updated_at",
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

  const tableCallBack = (option) => {
    set_option(option);
    getFeaturedData();
  };

  const getFeaturedData = () => {
    let data = { option: option };

    let featuredData = new Promise((resolve) => {
      resolve(PostApi(API_Path.getFeaturedData, data));
    });
    featuredData.then((res) => {
      if (res.status === 200) {
        set_option({ ...option, totalRecord: res.data.data.totalRecord });
        // setFeatured(res.data.data.featured);
        getUpdatedFeaturedData(res.data.data.featured);
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
    filteredArr = featured?.filter((x) => x.id !== data.id);
    temp = filteredArr;
    setFeatured(filteredArr);
  };

  const handleRemove = async (data) => {
    if (!temp.includes(data)) {
      await temp.push(data);
    }
    let filtered = [];
    filtered = await myArr?.filter((item) => item.id !== data.id);
    let filter1 = featured.filter((item) => !featured.includes(item));
    await setFeatured([...filter1, ...temp]);
    setMyArr(filtered);
    if (myArr.length > 0) {
      setShowUpdate(true);
    }
  };

  const handleUpdate = async () => {
    const arr1 = await myArr?.map((item) => {
      return item.id;
    });

    let data = {
      show_items: arr1,
      position: 3,
    };

    let updatefeaturedData = new Promise((resolve) => {
      resolve(PostApi(API_Path.UpdateSectionData, data));
    });
    updatefeaturedData.then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        getUpdatedFeaturedData();
        getFeaturedData();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const getUpdatedFeaturedData = (data1) => {
    let data = {
      position: 3,
    };

    let getFeaturedData = new Promise((resolve) => {
      resolve(PostApi(API_Path.getSectionUpdatedData, data));
    });

    getFeaturedData.then(async (res) => {
      if (res.status === 200) {
        let filtered = await data1?.filter((o1) => res.data.data?.some((o2) => o1.id === o2.id));
        let filtered1 = data1.filter((item) => !filtered.includes(item));
        await setFeatured(filtered1);
        await setMyArr(filtered);
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
                  <h3>Featured</h3>
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
                    <RtdDatatable option={option} columns={columns} data={featured} tableCallBack={tableCallBack} />
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
