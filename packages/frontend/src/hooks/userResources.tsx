import * as React from 'react'
// Unknown type doesn't work well with T[] resources type, so using any is the only option
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useResources<T>(apiCall: (...args: any[]) => Promise<T[]>, ...args: unknown[]) {
    const [resources, setResources] = React.useState<T[]>([])
    const loadResources = React.useCallback(async () => {
        const result = await apiCall(...args)
        setResources(result)
        //eslint-disable-next-line
    }, [apiCall, ...args]) // we need to spread ...args  otherwise it's endless loop because for JS ['1', '2'] !== ['1', '2'] ;(
    React.useEffect(() => {
        loadResources()
    }, [loadResources])
    return resources
}

export { useResources }