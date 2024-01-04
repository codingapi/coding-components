import { TestModel } from "@/domain/test";


//todo 这个地方最好可以实现全局任何地方都可以注册bean
export const testModel = new class extends TestModel{
    beanName: string = "TestModel";
    loadData(): string {
        return "defaultData";
    }
}


