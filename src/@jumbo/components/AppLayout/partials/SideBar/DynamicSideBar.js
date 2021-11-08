import React from 'react';
import CmtVertical from '../../../../../@coremat/CmtNavigation/Vertical';
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {GroupWork, MultilineChart} from "@material-ui/icons";
import {Assessment} from "@material-ui/icons";
import {Timeline} from "@material-ui/icons";
import {Group} from "@material-ui/icons";
import {Help} from "@material-ui/icons";
import {Dashboard} from "@material-ui/icons";
import {Home} from "@material-ui/icons";
import {TableChart} from "@material-ui/icons";
import {Settings} from "@material-ui/icons";
import {ExitToApp} from "@material-ui/icons";
import {AuhMethods} from "../../../../../services/auth";
import {CurrentAuthMethod} from "../../../../constants/AppConstants";
import {useDispatch} from "react-redux";
import SideBar from "./index";

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

const DynamicSideBar = (data) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    let groups = [];
    console.log(data)
    const user = dispatch(AuhMethods[CurrentAuthMethod].getCurrentAuthUser()).payload;
    console.log("USER")
    console.log(user)
    data.data.map(e => groups.push({
        name: e.group_name,
        icon: <Group />,
        type: 'item',
        link: '/group/'+e.id,
    }))
    let navigationMenus = [
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
                    name: 'Dashboard',
                    icon: <MultilineChart />,
                    type: 'item',
                    link: '/dashboard',
                },
                {
                    name: 'Analyse',
                    icon: <Timeline />,
                    type: 'item',
                    link: '/analytics',
                },
                {
                    name: 'Projektionen',
                    icon: <Assessment />,
                    type: 'item',
                    link: '/projections',
                },
                {
                    name: 'Tabelle',
                    icon: <TableChart />,
                    type: 'item',
                    link: '/table',
                },
                {
                    name: 'Gruppen',
                    icon: <Group />,
                    type: 'item',
                    link: '/groups',
                },
                {
                    name: 'Support',
                    icon: <Help />,
                    type: 'item',
                    link: '/support',
                },
                {
                    name: 'Wallboard-Live',
                    icon: <Dashboard />,
                    type: 'item',
                    link: '/live',
                },
                {
                    name: 'Gruppen-Wallboard',
                    icon: <GroupWork />,
                    type: 'collapse',
                    link: '/live',
                    children: groups,
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
                    name: 'Logout',
                    icon: <ExitToApp />,
                    type: 'item',
                    link: '/logout',
                },
            ],
        },
    ];
    if(user != null){
        console.log("User not  NULL")
       let group = null;
       for(let i = 0; i < data.data.length; i++){
           if(data.data[i].id == user.name){
               group = data.data[i]
           }
       }
        if(group != null) {
            navigationMenus = [
                {
                    name: 'Auswertungen',
                    type: 'section',
                    children: [
                        {
                            name: 'Home',
                            icon: <Home/>,
                            type: 'item',
                            link: '/sample-page',
                        },
                        {
                            name: 'Gruppen-Wallboard',
                            icon: <GroupWork/>,
                            type: 'collapse',
                            link: '/live',
                            children: [{
                                name: "Gruppenansicht: "+group.group_name,
                                icon: <Group/>,
                                type: 'item',
                                link: '/group/' + user.name,
                            }],
                        },
                    ],
                }
            ];
        }
    }else{
        console.log("USER-NULL")
       return <SideBar/>
    }

    return (
        <PerfectScrollbar className={classes.perfectScrollbarSidebar}>
            <CmtVertical menuItems={navigationMenus} />
        </PerfectScrollbar>
    );
};

export default DynamicSideBar;
