// @flow
export type Book = $ReadOnly<{
    id: string,
    name: string
}>;

export type Books = $ReadOnlyArray<Book>;