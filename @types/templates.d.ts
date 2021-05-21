type DbMethod<Arg, Return> = (arg: Arg) => Promise<Return>

// Given a Union T and a type U, return all items in T which are
// a type of U. Requires subtypes to be mutually exclusive
type SubUnion<Union, SubType> = Exclude<Union, Exclude<Union, SubType>>
