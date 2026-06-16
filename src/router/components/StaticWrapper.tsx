import { Route, Routes, useLocation } from "react-router";
import { routes } from "../routes";
import { useEffect } from "react";
import { useContextBridge } from "@/services/context/hook";
import { OverlayManager } from "@/components/overlay";

const RouterView = () => {
  const location = useLocation();
  
  useContextBridge();

  useEffect(() => {
    return () => {
      OverlayManager.instance.closeAll();
    };
  }, [location]);
  return (
    <Routes location={location} key={location.pathname}>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
    </Routes>
  );
};

export default RouterView;
