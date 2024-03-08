import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DashLayout from "../../../../dashboard-layout/dash-layout";
import UserItem from "../../ui/UserItem";
import DashAdminUsersHeader from "../../ui/dash-admin-users__header";
import userService from "../../../../features/users/UserService";

const DashAdminUsers = () => {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <DashLayout>
      <DashAdminUsersHeader />
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
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
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
