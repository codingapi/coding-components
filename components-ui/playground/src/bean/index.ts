import { testModel } from '@/bean/test';
import { beanFactory } from 'coding-components'



export const registerBeans = () => {
    beanFactory.registerBean(testModel);
}

