declare module 'markdownlint-cli2' {
    export interface MainOptions {
        argv?: string[]
        directory?: string
        logMessage?: (message: string) => void
        logError?: (message: string) => void
    }
    export function main(options: MainOptions): Promise<number>
}
