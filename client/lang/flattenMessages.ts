import en from '@/lang/en.json'

export interface NestedMessagesInterface {
  [key: string]: string | NestedMessagesInterface
}
export const flattenMessages = (nestedMessages: NestedMessagesInterface, prefix = ''): Record<string, string> =>
  Object.keys(nestedMessages).reduce((messages: Record<string, string>, key) => {
    const value = nestedMessages[key]
    const prefixedKey = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'string') {
      // eslint-disable-next-line no-param-reassign
      messages[prefixedKey] = value
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey))
    }

    return messages
  }, {})

// Define a TypeScript type called KeyPaths that takes in an object type T as its generic type parameter.
// KeyPaths is defined as a mapped type, which produces a new type by iterating over the keys of T.
type KeyPaths<T extends NestedMessagesInterface> = {
  // For each key K in T, create a mapped type that checks whether the value of that key T[K] extends INestedMessages,
  // i.e., whether the value is an object that has string keys and unknown values.
  [K in keyof T]: T[K] extends NestedMessagesInterface
    ? // If the value of the key is an object, create a string literal type that represents the path to that object.
      // The path is constructed by combining the current key K with a dot separator and the key paths of the nested object T[K].
      // The & string is used to ensure that TypeScript recognizes this string literal as a string.

      `${K & string}.${KeyPaths<T[K]> & string}`
    : // If the value of the key is not an object, simply return the key name K.
      K
  // Finally, index the KeyPaths type by keyof T, which returns a union of all the key paths in the object type T.
  // This means that KeyPaths<T> is a union of all the possible key paths in the object type T.
}[keyof T]

export type TranslationKey = KeyPaths<typeof en>
