import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Stack, Drawer } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import useResponsive from "hooks/useResponsive";
import { NAV } from "config";
import Logo from "components/logo";
import Scrollbar from "components/scrollbar";
import { NavSectionVertical } from "components/nav-section";
// import { IconsGenerate, PATH_ROUTE } from "./utils";
// import {
//   storepermission,
//   storeroutepermission,
// } from "redux/menusPermission/menupermission";

export default function NavVertical({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  // const dispatch = useDispatch();
  const isDesktop = useResponsive("up", "lg");
  // const { userinfo } = useSelector((state) => state.userinfo);
  const { permissionMenu } = useSelector((state) => state.menuPermission);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  // useEffect(() => {
  //   if (userinfo?.route?.length > 0) {
  //     const InfoRoute = [];
  //     const routeInfo = [];
  //     for (let route of userinfo?.route) {
  //       // CHECK IF PARENT IS AVALIABLE OR NOT
  //       if (Boolean(route.parent === "")) {
  //         // PUSH PARENT IS NOT AVALIABLE
  //         InfoRoute.push({
  //           title: route.title,
  //           path: PATH_ROUTE[route.path],
  //           icon: IconsGenerate(route.icon),
  //         });
  //       } else {
  //         // FIND PARENT INDEX
  //         const findIndex = InfoRoute.findIndex(
  //           (ev) => ev.title === route.parent
  //         );
  //         if (findIndex !== -1) {
  //           // PUSH CHILD IF PARENT EXIST
  //           InfoRoute[findIndex].children.push({
  //             title: route.title,
  //             path: PATH_ROUTE[route.path],
  //           });
  //           routeInfo.push({
  //             id: route.id,
  //             path: PATH_ROUTE[route.path],
  //             add: true,
  //             view: true,
  //             edit: true,
  //             remove: true,
  //           });
  //         } else {
  //           // PARENT PARENT IF PARENT IS NOT EXIST
  //           InfoRoute.push({
  //             title: route.parent,
  //             path: PATH_ROUTE[route.parent],
  //             icon: IconsGenerate(route.icon),
  //             children: [],
  //           });
  //           // AFTER PARENT CREATE NEED TO FIND INDEX
  //           const findIndexInner = InfoRoute.findIndex(
  //             (ev) => ev.title === route.parent
  //           );
  //           // PUSH CHILD IN PARENT
  //           InfoRoute[findIndexInner].children.push({
  //             title: route.title,
  //             path: PATH_ROUTE[route.path],
  //           });
  //           routeInfo.push({
  //             id: route.id,
  //             path: PATH_ROUTE[route.path],
  //             add: true,
  //             view: true,
  //             edit: true,
  //             remove: true,
  //           });
  //         }
  //       }
  //     }
  //     // SET ROUTE
  //     dispatch(
  //       storepermission([
  //         {
  //           subheader: "general",
  //           items: InfoRoute,
  //         },
  //       ])
  //     );
  //     dispatch(storeroutepermission(routeInfo));
  //   } else {
  //     dispatch(
  //       storepermission([
  //         {
  //           subheader: "general",
  //           items: [],
  //         },
  //       ])
  //     );
  //   }
  // }, [userinfo]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 0,
          pb: 1,
          px: 2.5,
          mt: 2,
          flexShrink: 0,
        }}
      >
        <Logo />
      </Stack>
      {permissionMenu.length > 0 && (
        <NavSectionVertical data={permissionMenu} />
      )}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  console.log("renderContent", permissionMenu)
  
  return (
    <>
      <Box
        component="nav"
        sx={{
          flexShrink: { lg: 0 },
          width: { lg: NAV.W_DASHBOARD },
        }}
      >
        {isDesktop ? (
          <Drawer
            open
            variant="permanent"
            PaperProps={{
              sx: {
                width: NAV.W_DASHBOARD,
                bgcolor: "transparent",
                borderRightStyle: "dashed",
              },
            }}
          >
            {renderContent}
          </Drawer>
        ) : (
          <Drawer
            open={openNav}
            onClose={onCloseNav}
            ModalProps={{
              keepMounted: true,
            }}
            PaperProps={{
              sx: {
                width: NAV.W_DASHBOARD,
              },
            }}
          >
            {renderContent}
          </Drawer>
        )}
      </Box>
    </>
  );
}
