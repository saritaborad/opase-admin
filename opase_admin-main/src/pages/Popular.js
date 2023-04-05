import React, { useRef, useState } from "react";
import UserLayout from "../components/UserLayout";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { toast } from "react-toastify";
import { useEffect } from "react";
import RtdDatatable from "../components/DataTable/RtdDatatable";
import User_Img from "../images/user.png";
import Moment from "react-moment";

let temp = [];

export default function Popular(params) {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [popular, setPopular] = useState([]);
  const [myArr, setMyArr] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    getPopularData();
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
      value: "user_name",
      label: "Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "headline",
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
    getPopularData();
  };

  const getPopularData = () => {
    let data = { option: option };
    let popularData = new Promise((resolve) => {
      resolve(PostApi(API_Path.getPopularData, data));
    });
    popularData.then((res) => {
      if (res.status === 200) {
        set_option({ ...option, totalRecord: res.data.data.totalRecord });
        getUpdatedPopularData(res.data.data.popular);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleAdd = async (data) => {
    let tempArr = [];
    if (!myArr.includes(data)) {
      tempArr.push(data);
      setMyArr([...myArr, ...tempArr]);
    }
    var filteredArr = [];
    filteredArr = popular?.filter((x) => x.id !== data.id);
    temp = filteredArr;
    setPopular(filteredArr);
    setShowUpdate(true);
  };

  const handleRemove = async (data) => {
    if (!temp.includes(data)) {
      await temp.push(data);
    }
    let filtered = [];
    filtered = await myArr?.filter((item) => item.id !== data.id);
    let filter1 = popular.filter((item) => !popular.includes(item));
    await setPopular([...filter1, ...temp]);
    setMyArr(filtered);
    setShowUpdate(true);
  };

  const handleUpdate = async () => {
    const arr1 = await myArr?.map((item) => {
      return item.id;
    });
    let data = { show_items: arr1, position: 4 };
    let updatePopularData = new Promise((resolve) => {
      resolve(PostApi(API_Path.UpdateSectionData, data));
    });
    updatePopularData.then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const getUpdatedPopularData = (data1) => {
    let data = {
      position: 4,
    };
    let getUpadatedPopularData = new Promise((resolve) => {
      resolve(PostApi(API_Path.getSectionUpdatedData, data));
    });
    getUpadatedPopularData.then(async (res) => {
      if (res.status === 200) {
        let filtered = await data1?.filter((o1) => res.data.data?.some((o2) => o1.id === o2.id));
        let filtered1 = data1.filter((item) => !filtered.includes(item));
        setPopular(filtered1);
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

  const drop = async (e) => {
    const copyListItems = [...myArr];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    await setMyArr(copyListItems);
  };

  return (
    <UserLayout>
      <div className="content-main-section">
        <div className="container-fluid">
          <div className="row">
            {myArr?.length > 0 && (
              <div className="col-12 mt-3">
                <h3>Popular</h3>
              </div>
            )}
            <div className="col-12 mt-3">
              <div className="image-add-class">
                {myArr?.length > 0 &&
                  myArr.map((item, i) => {
                    return (
                      <div key={i} className="Image-edit-class" onDragStart={(e) => dragStart(e, i)} onDragEnter={(e) => dragEnter(e, i)} onDragEnd={drop} draggable>
                        <img src={item.image} alt="" />
                        <span className="close-btn-new" onClick={() => handleRemove(item)}>
                          X
                        </span>
                      </div>
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
                  <RtdDatatable option={option} columns={columns} data={popular} tableCallBack={tableCallBack} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
