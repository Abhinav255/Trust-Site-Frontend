
import Dashboard from "views/Dashboard.js";
import DonorTable from "views/Donors";
import EditTrustee from "views/EditTrustees";
import Enquiries from "views/Enquiries";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Registration from "views/Registration";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import TrusteeTable from "views/Trustee";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "tim-icons icon-atom",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  {
    path: "/trustees",
    name: "Trustees",
    icon: "tim-icons icon-badge",
    component: <TrusteeTable />,
    layout: "/admin",
  },

  // {
  //   path: "/notifications",
  //   name: "Notifications",

  //   icon: "tim-icons icon-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // }, 
  {
    path: "/donors",
    name: "Donors",

    icon: "tim-icons icon-shape-star",
    component: <DonorTable/>,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",

    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },
  {
    path: "/enquiries",
    name: "Enquiries",

    icon: "tim-icons icon-puzzle-10",
    component: <Enquiries />,
    layout: "/admin",
  },
  // {
  //   path: "/trustee/edit/:id", 
  //   name: "Edit Trustee",
  //   component: <EditTrustee />, 
  //   layout: "/admin",
  // },
  {
    path: "/Sign-Up",
    name: "Sign Up",
    icon: "tim-icons icon-key-25",
    component: <Registration />,
    layout: "/admin",
  },
];
export default routes;
