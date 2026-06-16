import { Context } from "react";

export interface ContextInfo {
    context: Context<any>;
    value: any;
}

/**
 * 上下文服务
 */
export class ContextService {
    private static _instance: ContextService;
    private constructor() { }
    public static get instance() {
        if (!ContextService._instance) {
            ContextService._instance = new ContextService();
        }
        return ContextService._instance;
    }

    public contexts: ContextInfo[] = [];
}