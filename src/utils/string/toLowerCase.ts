export const toLowerCase = <T extends string | string[]>(data: T): T => {
    if (typeof data === 'string') {
        return data.toLowerCase() as T
    }

    if (Array.isArray(data)) {
        return data.map(str => str.toLowerCase()) as T
    }

    return data
}
