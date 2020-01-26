export interface Config {
    paths: PathConfig,
}

export interface PathConfig {
    assets: string,
    video: {
        resource: string,
        description: string,
        schema: string,
    }
}