import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DashLayout from "../../../../dashboard-layout/dash-layout";
import UserItem from "../../ui/UserItem";
import DashAdminUsersHeader from "../../ui/dash-admin-users__header";
import userService from "../../../../features/users/UserService";

const DashAdminUsers = () => {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [stateFilter, setStateFilter] = useState("any");
  const [cvFilter, setCvFilter] = useState("any");

  const getAllUsers = async () => {
    if (!users.length) {
      const data = await userService.getAllUsers(loggedInUser._id);
      setUsers(data);
    }
  };

  const updateLocalUser = (userId, updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, ...updatedUser } : user
      )
    );
  };

  const addNewUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) => {
    const searchTermMatch =
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    let cvFilterMatch;
    if (cvFilter === "true") {
      cvFilterMatch = user.isCvAccepted === true && user.role === "teacher";
    } else if (cvFilter === "false") {
      cvFilterMatch = user.isCvAccepted === false && user.role === "teacher";
    } else {
      cvFilterMatch = true;
    }

    if (stateFilter === "any") {
      return searchTermMatch && cvFilterMatch;
    } else if (stateFilter === "active") {
      return searchTermMatch && user.state === true && cvFilterMatch;
    } else if (stateFilter === "unactive") {
      return searchTermMatch && user.state === false && cvFilterMatch;
    } else {
      return searchTermMatch && cvFilterMatch;
    }
  });

  return (
    <DashLayout>
      <DashAdminUsersHeader
        addNewUser={addNewUser}
        setSearchTerm={setSearchTerm}
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
        cvFilter={cvFilter}
        setCvFilter={setCvFilter}
      />
      <div className="userss">
        <div className="users-list">
          <div className="users-list__body tableFixHead">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Full name</th>
                  <th>email</th>
                  <th>phone</th>
                  <th>role</th>
                  <th>account state</th>
                  <th>#Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <UserItem
                    user={user}
                    updateLocalUser={updateLocalUser}
                    key={user?._id || index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashLayout>
  );
};

export default DashAdminUsers;
