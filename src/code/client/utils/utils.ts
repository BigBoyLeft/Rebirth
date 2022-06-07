export default class Utils {
    static sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
}