declare module "dompurify" {
  export interface Config {
    ADD_ATTR?: string[] | ((attributeName: string, tagName: string) => boolean);
    ADD_DATA_URI_TAGS?: string[];
    ALLOWED_URI_REGEXP?: RegExp;
    ALLOWED_ATTR?: string[];
    ALLOWED_TAGS?: string[];
    ALLOW_DATA_ATTR?: boolean;
    FORBID_TAGS?: string[];
    FORBID_ATTR?: string[];
    ADD_TAGS?: string[];
  }

  interface DOMPurifyInstance {
    sanitize(dirty: string, config?: Config): string;
    setConfig(config: Config): void;
    clearConfig(): void;
    isValidAttribute(tag: string, attr: string, value: string): boolean;
    addHook(hook: string, cb: (...args: unknown[]) => void): void;
    removeHook(hook: string): void;
    removeHooks(): void;
    removeAllHooks(): void;
  }

  const dompurify: DOMPurifyInstance;
  export default dompurify;
}
