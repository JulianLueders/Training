import React from 'react';
import CmtVertical from '../../../../../@coremat/CmtNavigation/Vertical';
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {MultilineChart} from "@material-ui/icons";
import {Assessment} from "@material-ui/icons";
import {Timeline} from "@material-ui/icons";
import {Group} from "@material-ui/icons";
import {Help} from "@material-ui/icons";
import {Dashboard} from "@material-ui/icons";
import {Home} from "@material-ui/icons";
import {TableChart} from "@material-ui/icons";
import {Settings} from "@material-ui/icons";
import {ExitToApp} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  perfectScrollbarSidebar: {
    height: '100%',
    transition: 'all 0.3s ease',
    '.Cmt-sidebar-fixed &, .Cmt-Drawer-container &': {
      height: 'calc(100% - 167px)',
    },
    '.Cmt-modernLayout &': {
      height: 'calc(100% - 72px)',
    },
    '.Cmt-miniLayout &': {
      height: 'calc(100% - 91px)',
    },
    '.Cmt-miniLayout .Cmt-sidebar-content:hover &': {
      height: 'calc(100% - 167px)',
    },
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const navigationMenus = [
    {
      name: 'Auswertungen',
      type: 'section',
      children: [
        {
          name: 'Home',
          icon: <Home />,
          type: 'item',
          link: '/sample-page',
        },
        {
          name: 'Support',
          icon: <Help />,
          type: 'item',
          link: '/support',
        },
      ],
    },
    {
      name: 'Verwaltung',
      type: 'section',
      children: [
        {
          name: 'Konfiguration',
          icon: <Settings />,
          type: 'item',
          link: '/config',
        },
        {
          name: 'Login',
          icon: <ExitToApp />,
          type: 'item',
          link: '/signin',
        },
      ],
    },
  ];

  return (
    <PerfectScrollbar className={classes.perfectScrollbarSidebar}>
      <CmtVertical menuItems={navigationMenus} />
    </PerfectScrollbar>
  );
};

export default SideBar;
