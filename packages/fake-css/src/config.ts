import { Register } from "./module";

interface Config {
    unit: string;
    prefix: string;
    globalModuleKey: string;
    register?:Register
    _skip: boolean
}
type userConfig = Partial<Omit<Config, "_skip">>;

const config_: Config = {
    unit: "px",
    prefix: "apply",
    globalModuleKey: "global",
    _skip: false
}

export const useConfig = (config: userConfig = {}) => {
    if (!config_._skip) {
        config_._skip = true;
        Object.assign(config_, config)
    }
    return config_;
}
