import {strict as assert} from 'assert'
import {readFile} from 'fs/promises'
import 'mocha'
import {join as joinPath} from 'path'

import Base2048, {decode, encode} from '../src'

suite('Base2048', function () {
    test('encode / decode', function () {
        assertCoding([], [])
        assertCoding([0], [0])
        assertCoding([7, 255], [2047])
        assertCoding([0, 0, 1], [0, 0, 1])
        assertCoding([0, 0, 0], [0, 0, 0])
        assertCoding([100, 100, 100], [1, 1164, 1124])
        assertCoding([255], [255])
        assertCoding([255, 255], [31, 2047])
        assertCoding(
            [
                0x7c,
                0x3e,
                0x38,
                0x8a,
                0x47,
                0x0a,
                0xf6,
                0x7d,
                0xf0,
                0x15,
                0xf6,
                0xfa,
                0xae,
                0x04,
                0x9d,
                0x42,
                0x22,
                0xb1,
                0x64,
                0xc9,
                0xf8,
                0x6d,
                0x3e,
                0x90,
                0x32,
                0x72,
                0x72,
                0x9e,
                0x83,
                0x23,
                0x49,
                0x02,
            ],
            [
                3,
                1807,
                1137,
                164,
                901,
                985,
                1982,
                21,
                1975,
                1707,
                1033,
                468,
                273,
                709,
                1177,
                504,
                873,
                1956,
                100,
                1831,
                335,
                524,
                1129,
                258,
            ]
        )
    })

    test('example', async function () {
        const wordlist = await loadFile('bip39-english.txt')
        const base2048 = new Base2048(wordlist)
        const message = Array.from('hello world').map((v) => v.charCodeAt(0))
        const encoded = base2048.encode(message).join(' ')
        assert.equal(encoded, 'half clock brand tattoo alter response situate milk')
        const decoded = base2048.decode(encoded)
        assert.equal(decoded.map((v) => String.fromCharCode(v)).join(''), 'hello world')
        assert.throws(() => {
            base2048.index('hovercraft')
        })
        assert.doesNotThrow(() => {
            base2048.index('MILK ')
        })
        assert.throws(() => {
            new Base2048('foo bar baz')
        })
    })
})

function assertCoding(data: ArrayLike<number>, base2048: ArrayLike<number>) {
    assert.deepEqual(encode(data), base2048)
    assert.deepEqual(decode(base2048), data)
}

async function loadFile(path: string) {
    return (await readFile(joinPath(__dirname, path))).toString('utf8')
}
