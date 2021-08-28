
interface UniqueEntityId<I> {
    getId (): I
    equals (id: UniqueEntityId<I>): boolean
}

export default UniqueEntityId;
