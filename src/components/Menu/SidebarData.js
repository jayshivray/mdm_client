import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Settings',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    compN : 'EnterpriseId'    
  },
  {
    title: 'Managed Mobile',
    path: '/ManagedMobile',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    compN : 'ManagedMobile'
  },
  {
    title: 'Anti Theft',
    path: '/AntiTheft',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text',
    compN : 'AntiTheft'
  }
];
