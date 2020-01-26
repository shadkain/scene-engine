export interface Action {
    charge(): void;
    uncharge(): void;
    run(): void;
}