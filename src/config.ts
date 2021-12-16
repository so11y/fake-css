interface Config {
    unit: string;
    prefix: string;
    _skip: boolean
}
type userConfig = Partial<Pick<Config, "_skip">>;

const config_: Config = {
    unit: "px",
    prefix: "apply",
    _skip: false
}

export const useConfig = (config: userConfig = {}) => {
    if (!config_._skip) {
        config_._skip = true;
        Object.assign(config_, config)
    }
    return config_;
}