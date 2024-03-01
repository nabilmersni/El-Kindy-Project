import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import UserItem from "../ui/UserItem";
import DashAdminUsersHeader from "../ui/dash-admin-users__header";

const DashAdminUsers = () => {
  const participants = [
    {
      id: 1,
      fullname: "Mersni nabil",
      email: "nabil.mersni@esprit.tn",
      level: "4Twin",
      grade: "-",
      assign: true,
    },
    {
      id: 2,
      fullname: "Mersni nabil",
      email: "nabil.mersni@esprit.tn",
      level: "4Twin",
      grade: "-",
      assign: true,
    },
    {
      id: 3,
      fullname: "Mersni nabil",
      email: "nabil.mersni@esprit.tn",
      level: "4Twin",
      grade: "-",
      assign: true,
    },
    {
      id: 4,
      fullname: "Mersni nabil",
      email: "nabil.mersni@esprit.tn",
      level: "4Twin",
      grade: "-",
      assign: true,
    },
  ];
  return (
    <DashLayout>
      <DashAdminUsersHeader />
      <div className="dash__content__container__courses-list">
        {/* {courses.map((item, index) => (
          <CourseCard key={index} data={item} />
        ))} */}

        <div className="model__card--students-list__container">
          <div className="model__card--students-list__header">
            <div className="model__card--students-list__header-fullname">
              Fullname
            </div>
            <div className="model__card--students-list__header-email">
              Email
            </div>
            <div className="model__card--students-list__header-level">
              Level
            </div>
            <div className="model__card--students-list__header-grade">
              Grade
            </div>
            <div className="model__card--students-list__header-status">
              Status
            </div>
            <div className="model__card--students-list__header-delete">#</div>
          </div>
          <div className="model__card--students-list">
            {participants.map((item, index) => (
              <UserItem key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </DashLayout>
  );
};

export default DashAdminUsers;
