import { Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PromiseFn = (...args: any[]) => Promise<any>;

export function fromProcedure<T extends PromiseFn>(executeFn: T) {
  return (...params: Parameters<T>) => {
    return new Observable<ReturnType<T> extends Promise<infer U> ? U : never>(subscriber => {
      const ac = new AbortController();
      const [input, opts] = params;
      Reflect.apply(executeFn, undefined, [input, { signal: ac.signal, ...opts }])
        .then(data => {
          subscriber.next(data);
        })
        .catch((err: Error) => {
          if (err.message === 'This operation was aborted.') {
            subscriber.complete();
            return;
          }

          subscriber.error(err);
          throw err;
        });

      return () => {
        ac.abort();
      };
    });
  };
}
