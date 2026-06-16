import {
  UNSAFE_LocationContext,
  UNSAFE_RouteContext,
  UNSAFE_DataRouterContext,
  UNSAFE_NavigationContext,
} from "react-router";
import { useContext } from "react";
import { ContextService } from "./";

/**
 * 上下文透传
 */
export const useContextBridge = () => {
  const locationContext = useContext(UNSAFE_LocationContext);
  const routeContext = useContext(UNSAFE_RouteContext);
  const dataRouterContext = useContext(UNSAFE_DataRouterContext);
  const navigationContext = useContext(UNSAFE_NavigationContext);

  ContextService.instance.contexts = [
      {
        value: locationContext,
        context: UNSAFE_LocationContext,
      },
      {
        value: routeContext,
        context: UNSAFE_RouteContext,
      },
      {
        value: dataRouterContext,
        context: UNSAFE_DataRouterContext,
      },
      {
        value: navigationContext,
        context: UNSAFE_NavigationContext,
      },
  ];
};
