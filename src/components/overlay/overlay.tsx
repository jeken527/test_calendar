import ReactDOM from "react-dom/client";
import OverlayWrapper, { OverlayWrapperProps } from "@/components/overlay/OverlayWrapper";
import { ReactNode, useState } from "react";
import { ContextService } from "@/services/context";
import { OverlayContext } from "./context";
import { OverlayManager } from ".";


interface ContextBridgeProps {
  children: ReactNode;
  destory: () => void;
  opts: OverlayWrapperProps;
}

// 上下文桥接器
export const ContextBridge = ({ children, destory, opts }: ContextBridgeProps) => {
  const [visible, setVisible] = useState(true);

  OverlayManager.instance.push({
    close: () => {
      setVisible(false);
    },
    destory,
    opts: {
      position: opts.position,
      backgroundColor: opts.backgroundColor,
      enableMaskClose: !!opts.enableMaskClose,
      positionType: opts.positionType,
    },
  });

  return (
    <OverlayContext.Provider value={visible}>
      { ContextService.instance.contexts.reduceRight((acc, Context) => {
        return (
          <Context.context.Provider value={Context.value}>
            {acc}
          </Context.context.Provider>
        );
      }, children)}
    </OverlayContext.Provider>
  );
};

export const openOverlay = (opts: OverlayWrapperProps) => {
  const div = document.createElement("div");
  document.body.appendChild(div);

  const root = ReactDOM.createRoot(div);

  const destory = () => {
    root.unmount();
    div.remove();
  };

  const { children, ...rest } = opts;

  root.render(
    <ContextBridge destory={destory} opts={opts}>
      <OverlayWrapper {...rest}>
        {children}
      </OverlayWrapper>
    </ContextBridge>
  );

  return destory;
};
