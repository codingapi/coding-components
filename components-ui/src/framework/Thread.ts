class Thread{

    public static sleep(ms: number): Promise<void>{
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public static async sleepUntil(condition: () => boolean, interval: number = 100): Promise<void>{
        while(!condition()){
            await Thread.sleep(interval);
        }
    }

    public static async sleepWhile(condition: () => boolean, interval: number = 100): Promise<void>{
        while(condition()){
            await Thread.sleep(interval);
        }
    }
}

export { Thread };