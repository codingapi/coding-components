export interface Bean {
    beanName:string;
}

class BeanFactory {

    private static instance: BeanFactory;
    private beanMap: Map<string, any>;

    constructor() {
        this.beanMap = new Map();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new BeanFactory();
        }
        return this.instance;
    }

    registerBean(bean: Bean) {
        const beanName = bean.beanName;
        this.beanMap.set(beanName, bean);
        console.log(`${beanName} bean registered.`);
    }


     getBean<T>(beanClass: { new(): T }): T {
        return this.beanMap.get(beanClass.name);
    }


}

export const beanFactory = BeanFactory.getInstance();