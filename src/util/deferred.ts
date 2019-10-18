class Deferred<T> {
  public promise: Promise<T>;
  public resolve!: (value: T) => void;
  public reject!: (reason: any) => void;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}

export default Deferred;
