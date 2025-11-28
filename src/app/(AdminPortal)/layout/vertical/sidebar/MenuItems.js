import { uniqueId } from 'lodash';

import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdFormatListBulleted } from "react-icons/md";
import { BiCalendarEvent } from "react-icons/bi";

const Menuitems = [

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: RiDashboardHorizontalFill,
    href: '/',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Classes',
    icon: MdFormatListBulleted,
    href: '/classes',
  },
  {
    id: uniqueId(),
    title: 'Events',
    icon: BiCalendarEvent,
    href: '/events',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Frontend pages',
  //   icon: IconAppWindow,
  //   href: '/frontend-pages/',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Homepage',
  //       icon: IconPoint,
  //       href: '/frontend-pages/homepage',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'About Us',
  //       icon: IconPoint,
  //       href: '/frontend-pages/about',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Blog',
  //       icon: IconPoint,
  //       href: '/frontend-pages/blog',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Blog Details',
  //       icon: IconPoint,
  //       href: '/frontend-pages/blog/Blog_1',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Contact',
  //       icon: IconPoint,
  //       href: '/frontend-pages/contact',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Portfolio',
  //       icon: IconPoint,
  //       href: '/frontend-pages/portfolio',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Pricing',
  //       icon: IconPoint,
  //       href: '/frontend-pages/pricing',
  //     },
  //   ],
  // },
];

export default Menuitems;
