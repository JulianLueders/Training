import React, { useContext } from 'react';
import AppContext from '../../../contextProvider/AppContextProvider/AppContext';
import CmtVerticalLayout from '../../../../../@coremat/CmtLayouts/Vertical';
import CmtHeader from '../../../../../@coremat/CmtLayouts/Vertical/Header';
import Header from '../../partials/Header';
import CmtSidebar from '../../../../../@coremat/CmtLayouts/Vertical/Sidebar';
import SidebarHeader from '../../partials/SidebarHeader';
import SideBar from '../../partials/SideBar';
import CmtContent from '../../../../../@coremat/CmtLayouts/Vertical/Content';
import ContentLoader from '../../../ContentLoader';
import CmtFooter from '../../../../../@coremat/CmtLayouts/Vertical/Footer';
import Footer from '../../partials/Footer';
import clsx from 'clsx';
import Customizer from "./Customizer";
import {getUserGroups} from "../../../../../util/APIUtils";
import DynamicSideBar from "../../partials/SideBar/DynamicSideBar";

export default function VerticalDefault ({ className, children }) {
    const [sideBar, setSideBar] = React.useState(<SideBar/>);
    const { drawerBreakPoint, headerType, isSidebarFixed, sidebarType, sidebarStyle, sidebarSize, showFooter } = useContext(
    AppContext,
  );
    //setSideBar(<SideBar/>)
    React.useEffect(() => {
        getUserGroups().then(response => setSideBar(<DynamicSideBar data={response}/>))
    }, [])

  return (
    <CmtVerticalLayout
      drawerBreakPoint={drawerBreakPoint}
      className={clsx('verticalDefaultLayout', className)}
      sidebarWidth={sidebarSize}>
      <CmtHeader type={headerType}>
        <Header />
      </CmtHeader>
      <CmtSidebar isSidebarFixed={isSidebarFixed} type={sidebarType} {...sidebarStyle}>
        <SidebarHeader />
          {sideBar}
      </CmtSidebar>
      <CmtContent>
        {children}
          <Customizer />
          <ContentLoader />
      </CmtContent>
      {showFooter && (
        <CmtFooter type="static">
          <Footer />
        </CmtFooter>
      )}
    </CmtVerticalLayout>
  );
};
