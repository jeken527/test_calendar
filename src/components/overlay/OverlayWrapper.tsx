import { motion, AnimatePresence } from "motion/react";
import { useOverlayContext } from "./context";
import { OverlayManager } from ".";
import { withStopPropagation } from "@/utils/utils";

interface TransitionProps {
  initial: Record<string, string | number>;
  animate: Record<string, string | number>;
  exit: Record<string, string | number>;
}

export const transitionTypeMap: Record<string, TransitionProps> = {
  DISSOLVE: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  MOVE_FROM_RIGHT: {
    initial: { x: "100%" },
    animate: { x: "0%" },
    exit: { x: "100%" },
  },
  MOVE_FROM_LEFT: {
    initial: { x: "-100%" },
    animate: { x: "0%" },
    exit: { x: "-100%" },
  },
  MOVE_FROM_BOTTOM: {
    initial: { y: "100%" },
    animate: { y: "0%" },
    exit: { y: "100%" },
  },
  MOVE_FROM_TOP: {
    initial: { y: "-100%" },
    animate: { y: "0%" },
    exit: { y: "-100%" },
  },
}

const getTransitionProps = (transitionType?: string) => {
  return transitionTypeMap[transitionType || "DISSOLVE"];
}

const positionStyle: Record<string, Record<string, string | number>> = {
  center: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  topLeft: {
    top: 0,
    left: 0,
  },
  topCenter: {
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
  },
  topRight: {
    top: 0,
    right: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
  },
  bottomCenter: {
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
  },
  bottomRight: {
    bottom: 0,
    right: 0,
  },
};

const getPositionStyle = (position?: string) => {
  return positionStyle[position || "center"];
};

export interface OverlayWrapperProps {
  children: any;
  positionType?: string;
  position?: {
    top: number;
    left: number;
  };
  backgroundColor?: string;
  enableMaskClose?: boolean;
  transition?: {
    duration?: number;
    timing?: number[];
  };
  transitionType: string;
}
export default function OverlayWrapper(props: OverlayWrapperProps) {
  const visible = useOverlayContext();
  const positionStyle = props.position || getPositionStyle(props.positionType);
  const transitionProps = getTransitionProps(props.transitionType);

  return (
    <AnimatePresence onExitComplete={() => {
      OverlayManager.instance.destroy();
    }}>
      {visible && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: props.backgroundColor,
            zIndex: 1000,
          }}
          transition={props.transition}
        ></motion.div>
      )}
      {visible && (
        <motion.div
          key="overlay-content"
          initial={transitionProps.initial}
          animate={transitionProps.animate}
          exit={transitionProps.exit}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1001,
          }}
          transition={props.transition}
          onClick={withStopPropagation(() => {
            if (!props.enableMaskClose) return;
            OverlayManager.instance.close();
          })}
        >
          <div
            style={{
              position: "fixed",
              zIndex: 1002,
              ...positionStyle,
            }}
            onClick={withStopPropagation()}
          >
            {props.children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
