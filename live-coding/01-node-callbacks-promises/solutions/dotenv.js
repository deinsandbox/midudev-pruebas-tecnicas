import fs from 'fs'

const parseEnv = (env) => {
    const lines = env.split('\n')
    lines.forEach(line => {
        const [key, ...value] = line.split('=')
        const valueString = value.join('=')
        const hasQuotes = valueString.startsWith('"') && valueString.endsWith('"')
        const valueToStore = hasQuotes ? valueString.slice(1, -1) : valueString
        process.env[key] = valueToStore
    });
}

const config = ({ path = '.env' } = {}) => {
    // const {path = '.env'} = options ?? {}
    try {
        const env = fs.readFileSync(path, 'utf8')
        parseEnv(env)
    } catch { }
}

export {config}