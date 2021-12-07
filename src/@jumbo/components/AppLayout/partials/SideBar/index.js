import React from 'react';
import CmtVertical from '../../../../../@coremat/CmtNavigation/Vertical';
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {AccountBalance, Flag, Help, HighlightOff, Storage} from "@material-ui/icons";
import {Home} from "@material-ui/icons";
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
      name: 'Allgemein',
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
      name: 'Theoriefragen BZF',
      type: 'section',
      children: [
        {
          name: 'Alle Fragen',
          icon: <Storage />,
          type: 'item',
          link: '/questions/bzf/all',
        },
        {
          name: 'Markierte Fragen',
          icon: <Flag />,
          type: 'item',
          link: '/questions/bzf/flag',
        },
        {
          name: 'Falsche Fragen',
          icon: <HighlightOff />,
          type: 'item',
          link: '/questions/bzf/wrong',
        },
        {
          name: 'Prüfungsimulation',
          icon: <AccountBalance />,
          type: 'item',
          link: '/questions/bzf/simulation',
        },
      ],
    },
    {
      name: 'Theoriefragen AZF',
      type: 'section',
      children: [
        {
          name: 'Alle Fragen',
          icon: <Storage />,
          type: 'item',
          link: '/questions/azf/all',
        },
        {
          name: 'Markierte Fragen',
          icon: <Flag />,
          type: 'item',
          link: '/questions/azf/flag',
        },
        {
          name: 'Falsche Fragen',
          icon: <HighlightOff />,
          type: 'item',
          link: '/questions/azf/wrong',
        },
        {
          name: 'Prüfungsimulation',
          icon: <AccountBalance />,
          type: 'item',
          link: '/questions/azf/simulation',
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
