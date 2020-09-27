// istanbul ignore file
/**
 * Sleeps for ms milliseconds
 * @param ms
 */
export const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
