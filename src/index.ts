/** Encode array of bytes (8-bit) to base2048 (11-bit) indices */
export function encode(data: ArrayLike<number>): number[] {
    if (data.length === 0) {
        return []
    }
    const words: number[] = [0]
    let carry = 0 | 0
    for (let p = 0; p < data.length; p++) {
        carry = data[p]
        for (let i = 0; i < words.length; i++) {
            carry += words[i] << 8
            words[i] = carry % 2048 | 0
            carry = (carry / 2048) | 0
        }
        while (carry > 0) {
            words.push(carry % 2048 | 0)
            carry = (carry / 2048) | 0
        }
    }
    for (let i = 0; i < data.length - 1; i++) {
        if (data[i] !== 0) {
            break
        }
        words.push(0)
    }
    return words.reverse()
}

/** Decode array of base2048 (11-bit) indices to bytes (8-bit) */
export function decode(words: ArrayLike<number>): number[] {
    if (words.length === 0) {
        return []
    }
    const data: number[] = [0]
    let carry = 0 | 0
    for (let p = 0; p < words.length; p++) {
        carry = words[p] | 0
        for (let i = 0; i < data.length; i++) {
            carry += (data[i] * 2048) | 0
            data[i] = carry & 0xff
            carry >>= 8
        }
        while (carry > 0) {
            data.push(carry & 0xff)
            carry >>= 8
        }
    }
    for (let i = 0; i < words.length - 1; i++) {
        if (words[i] !== 0) {
            break
        }
        data.push(0)
    }
    return data.reverse()
}

export default class Base2048 {
    readonly wordlist: string[]
    readonly lookup: Record<string, number>

    constructor(wordlist: string | string[]) {
        if (typeof wordlist === 'string') {
            wordlist = wordlist.trim().toLowerCase().split('\n')
        }
        if (wordlist.length !== 2048) {
            throw new Error(`Invalid wordlist: Expected 2048 entries, got ${wordlist.length || 0}`)
        }
        const lookup = {}
        wordlist.forEach((word, idx) => {
            lookup[word] = idx
        })
        this.wordlist = wordlist
        this.lookup = lookup
    }

    index(word: string) {
        word = word.toLowerCase().trim()
        const rv = this.lookup[word]
        if (rv === undefined) {
            throw new Error(`Unknown word: ${word}`)
        }
        return rv
    }

    encode(data: ArrayLike<number>) {
        return encode(data).map((idx) => this.wordlist[idx])
    }

    decode(words: string | string[]) {
        if (typeof words === 'string') {
            words = words.trim().split(' ')
        }
        return decode(words.map((word) => this.index(word)))
    }
}
