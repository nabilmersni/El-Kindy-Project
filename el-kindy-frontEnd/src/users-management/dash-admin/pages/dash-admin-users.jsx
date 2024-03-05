import { useEffect, useState } from "react";
import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import UserItem from "../ui/UserItem";
import DashAdminUsersHeader from "../ui/dash-admin-users__header";
import userService from "../../../features/users/UserService";

const DashAdminUsers = () => {
  const [users, setUsers] = useState([{}]);

  const getAllUsers = async () => {
    const data = await userService.getAllUsers();
    setUsers(data);
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
                  <UserItem user={user} key={index} />
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
