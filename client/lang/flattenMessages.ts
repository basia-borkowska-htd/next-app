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

type KeyPaths<T extends NestedMessagesInterface> = {
  [K in keyof T]: T[K] extends NestedMessagesInterface ? `${K & string}.${KeyPaths<T[K]> & string}` : K
}[keyof T]

export type TranslationKey = KeyPaths<typeof en>
