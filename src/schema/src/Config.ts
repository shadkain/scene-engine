export type CollectionEntry = {
    name: string,
    proto?: Object,
}

export interface Config {
    video: string,
    collection: CollectionEntry[],
}