
export default abstract class ValueObject <V> {
    constructor (private value: V) {}

    public getValue (): V { return this.value; }
    
    abstract isEqual (object?: ValueObject<V>): boolean
}
