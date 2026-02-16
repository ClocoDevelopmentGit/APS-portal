import { uniqueId } from "lodash";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdFormatListBulleted, MdStickyNote2 } from "react-icons/md";
import { BiCalendarEvent } from "react-icons/bi";
import { IoMdPricetag, IoIosGlobe } from "react-icons/io";
import { TbPointFilled } from "react-icons/tb";
import { GiCheckMark } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import { IoReceipt } from "react-icons/io5";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: RiDashboardHorizontalFill,
    href: "/admin",
    chipColor: "secondary",
  },
  {
    id: uniqueId(),
    title: "Classes",
    icon: MdFormatListBulleted,
    href: "/admin/classes",
  },
  {
    id: uniqueId(),
    title: "Workshops",
    icon: BiCalendarEvent,
    href: "/admin/events",
  },
  {
    id: uniqueId(),
    title: "Category",
    icon: IoMdPricetag,
    href: "/admin/category",
  },
  {
    id: uniqueId(),
    title: "Leads",
    icon: FaUserFriends,
    href: "/admin/leads",
  },
  {
    id: uniqueId(),
    title: "Enrollments",
    icon: MdStickyNote2,
    href: "/admin/enrollment",
  },
  {
    id: uniqueId(),
    title: "Attendance",
    icon: GiCheckMark,
    href: "/admin/attendance",
  },
  {
    id: uniqueId(),
    title: "Invoices",
    icon: IoReceipt,
    href: "/admin/invoices",
  },
  {
    id: uniqueId(),
    title: 'APS CMS',
    icon: IoIosGlobe,
    href: '/admin/cms/',
    children: [
      {
        id: uniqueId(),
        title: 'Homepage',
        icon: TbPointFilled,
        href: '/admin/cms/homepage',
      },
      // {
      //   id: uniqueId(),
      //   title: 'About Us',
      //   icon: IconPoint,
      //   href: '/frontend-pages/about',
      // },
      // {
      //   id: uniqueId(),
      //   title: 'Blog',
      //   icon: IconPoint,
      //   href: '/frontend-pages/blog',
      // },
      // {
      //   id: uniqueId(),
      //   title: 'Blog Details',
      //   icon: IconPoint,
      //   href: '/frontend-pages/blog/Blog_1',
      // },
      // {
      //   id: uniqueId(),
      //   title: 'Contact',
      //   icon: IconPoint,
      //   href: '/frontend-pages/contact',
      // },
      // {
      //   id: uniqueId(),
      //   title: 'Portfolio',
      //   icon: IconPoint,
      //   href: '/frontend-pages/portfolio',
      // },
      // {
      //   id: uniqueId(),
      //   title: 'Pricing',
      //   icon: IconPoint,
      //   href: '/frontend-pages/pricing',
      // },
    ],
  },
];

export default Menuitems;
