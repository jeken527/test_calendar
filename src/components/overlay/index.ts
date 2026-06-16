import { openOverlay } from "./overlay";
import type { OverlayWrapperProps } from "./OverlayWrapper";

export interface OverlayStackItem {
  close: () => void;
  destory: () => void;
  opts: {
    position?: OverlayWrapperProps["position"];
    backgroundColor?: string;
    enableMaskClose: boolean;
    positionType: OverlayWrapperProps["positionType"];
  };
}

/**
 * 弹窗管理器
 */
export class OverlayManager {
  public static instance = new OverlayManager();

  private _stack: OverlayStackItem[] = [];

  public open(opts: OverlayWrapperProps) {
    return openOverlay(opts);
  }

  public toggle(opts: Partial<OverlayWrapperProps>) {
    const ins = this.pop();
    this.open(Object.assign({}, ins?.opts || {}, opts as OverlayWrapperProps));
    if (!ins) return;
    setTimeout(() => {
      ins?.destory();
    }, (opts.transition?.duration || 0) * 1000);
  }

  public push(item: OverlayStackItem) {
    this._stack.push(item);
  }

  public pop() {
    return this._stack.pop();
  }

  public close() {
    const ins = this.pop();
    ins?.close();
  }
  public destroy() {
    const ins = this.pop();
    ins?.destory();
  }

  public closeAll() {
    setTimeout(() => {
      this._stack.forEach((ins) => ins.destory());
      this._stack = [];
    }, 10);
  }
}
