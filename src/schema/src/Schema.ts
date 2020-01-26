export interface Schema {
    id: string,
    type: string,
    props: {
        [key: string]: {
            required: boolean,
            types: string[],
            default?: any,
        }
    },
    proto?: Object,
}