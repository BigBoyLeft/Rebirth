export async function loadModel(hash: number): Promise<boolean> {
    return await new Promise((resolve, reject) => {
        RequestModel(hash);
        let count = 0;

        if (HasModelLoaded(hash)) {
            resolve(true);
            return
        }

        const interval = setInterval(() => {
            if (count >= 100) {
                resolve(false);
                clearInterval(interval)
                return;
            }

            if (!HasModelLoaded(hash)) {
                count += 1;
                return;
            }

            clearInterval(interval);
            resolve(true);
        }, 100)
    })
}