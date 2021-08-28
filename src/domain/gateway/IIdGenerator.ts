
export interface IIdGenerator<T> {
    generate(): Promise<T>
}
