import { Link } from "react-router-dom";

import "../../../../public/assets/css/style.css";

const UserItem = ({ user }) => {
  return (
    <tr className=" one-user">
      <td className="fullname-td">
        <div className="fullname-td__container">
          <div className="fullname-td__img-container">
            <img
              src="../../../../public/assets/img/user-1.svg"
              alt=""
              className="fullname-td__img-container__img"
            />
          </div>
          <div className="fullname-td__fullname-username">
            <p className="fullname-td__fullname-username__fullname">
              {user.fullname}
            </p>
            <p className="fullname-td__fullname-username__username"></p>
          </div>
        </div>
      </td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
        {/* {% if oneUser.getRoles()[0] == "ROLE_USER" %} */}
        {user.role}
        {/* {% else %}
    association
    {% endif %} */}
      </td>
      <td className="stet-td">
        {user.state === true ? (
          <span className="p-[1rem] px-[2.5rem] rounded-full bg-[#CDFAD5] text-[#153462] font-bold">
            active
          </span>
        ) : (
          <span className="p-[1rem] px-[2.5rem] rounded-full bg-[#FF6D60] text-[#153462] font-bold">
            unactive
          </span>
        )}
      </td>

      <td className="btn-td gap-4">
        {user.state === true ? (
          <Link
            to={`/dash-admin-add-new-course`}
            className="p-[1.8rem] rounded-full bg-[#F3F8FC] hover:bg-[#bed9f4] transition-all ease-in duration-75"
          >
            <img src="img/lock-icon.png" alt="" className="w-[2.2rem] " />
          </Link>
        ) : (
          <Link
            to={`/dash-admin-add-new-course`}
            className="p-[2rem] rounded-full bg-[#F3F8FC] hover:bg-[#bed9f4] transition-all ease-in duration-75"
          >
            <img src="img/unlock-icon.png" alt="" className="w-[2.2rem] " />
          </Link>
        )}

        <Link
          to={`/dash-admin-add-new-course`}
          className="p-[1.6rem] rounded-full bg-[#F3F8FC] hover:bg-[#bed9f4] transition-all ease-in duration-75"
        >
          <img src="img/edit-icon.svg" alt="" className="w-[2.7rem] " />
        </Link>
      </td>
    </tr>
  );
};

export default UserItem;
