type DbMethod<Arg, Return> = (arg: Arg) => Promise<Return>

// Given a Union T and a type U, return all items in T which are
// a type of U
type SubUnion<T, U> = Exclude<T, Exclude<T, U>>
