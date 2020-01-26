export interface BoxUser<K> {
    on(key: K, handler: Function): void;
    off(key: K): void;
    destroy(): void;
}