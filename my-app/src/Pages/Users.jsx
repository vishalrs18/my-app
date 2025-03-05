import { useEffect, useState } from "react";
import Widget from "../Components/Widget/Widget";
import { fetchApi } from "../utils/fetchWrapper";
import { userData } from "../store/store";

const Users = () => {
  const [allUsersData, setAllUsersData] = useState([]);
  const [permissionData, setPermissionData] = useState();

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        fetchApi({ url: "/auth/all-users", isProtected: true }).then((res) => {
          setAllUsersData(res?.data);
        });
      } catch (error) {
        console.error("Error fetching Users List:", error);
      }
    };
    fetchAllUser();
  }, []);

  const userPermissions = ["all", "view", "update"];

  const permissionHandler = (e, user_id) => {
    const data = allUsersData.filter((i) => i.user_id === user_id);
    fetchApi({
      url: "/auth/user",
      method: "PATCH",
      body: {
        user_id: user_id,
        permission: data[0].permission,
      },
      isProtected: true,
    }).then(res => console.log(res))
  };

  const checkBoxHandler = (e, j, user_id) => {
    const idx = allUsersData.findIndex((i) => i.user_id === user_id);
    const userData = structuredClone(allUsersData)[idx];
    if (userData) {
      const oldPermission = userData.permission;
      let newP;
      if (e.target.checked) {
        newP = [...new Set([...oldPermission, j])];
      } else {
        newP = oldPermission.filter((i) => i !== j);
      }
      setAllUsersData((prev) => {
        const temp = prev;
        temp[idx].permission = newP;
        return temp;
      });
    }
  };

  return (
    <Widget>
      <div className="container">
        {allUsersData?.map((i) => {
          return (
            <div
              style={{
                background: "gray",
                padding: "10px",
                borderRadius: "6px",
              }}
            >
              <>
                <div>User Id: {i.user_id}</div>
                <div>Email: {i.email}</div>
                <div>Is Admin: {i.is_admin ? "true" : "false"}</div>
                <div>
                  {" "}
                  Permissions:
                  {userPermissions.map((j) => {
                    return (
                      <>
                        <span style={{ marginLeft: "4px" }}>
                          {j.toLocaleUpperCase()}
                        </span>
                        <input
                          type="checkbox"
                          defaultChecked={i.permission.includes(j)}
                          onClick={(e) => checkBoxHandler(e, j, i.user_id)}
                        ></input>
                      </>
                    );
                  })}
                </div>
                <button type="submit" onClick={(e) => permissionHandler(e, i.user_id)}>
                  Apply
                </button>
              </>
            </div>
          );
        })}
        {/* <table>
          <thead>
            {allUsersData?.length ? (
              <tr>
                {Object.keys(allUsersData[0]).map((i, idx) => {
                  return <th key={idx}>{i}</th>;
                })}
              </tr>
            ) : null}
          </thead>
          <tbody>
            {allUsersData?.length
              ? allUsersData?.map((i) => {
                  return (
                    <tr key={i.user_id}>
                      {Object.entries(i).map(([key, val], idx) => {
                        return (
                          <td
                            style={{ textAlign: "center" }}
                            key={`user-${i.user_id}-${idx}`}
                          >
                            {key === "is_admin"
                              ? val.toString()
                              : key === "permission"
                              ? val.join(", ")
                              : val}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table> */}
      </div>
    </Widget>
  );
};

export default Users;
