import * as pkg from './index'
const Base2048 = pkg.default
for (const key of Object.keys(pkg)) {
    if (key === 'default') continue
    Base2048[key] = pkg[key]
}
export default Base2048
