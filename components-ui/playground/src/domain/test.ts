import { Bean } from "coding-components";

export class Test {
  count = 0;

  public add(index: number) {
    this.count += index;
  }

  public clear() {
    this.count = 0;
  }

  constructor(count: number) {
    this.count = count;
  }

  public toStates() {
    return {
      count: this.count,
    };
  }

  public hasCount() {
    return this.count > 0;
  }
}

export abstract class TestModel implements Bean {
  beanName: string = "TestModel";

  public abstract loadData(): string;
}


