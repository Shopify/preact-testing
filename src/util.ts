export function noop() {}

export function array<T>(maybeArray: T | T[]) {
  if (maybeArray == null) {
    return [];
  }

  if (Array.isArray(maybeArray)) {
    return maybeArray;
  }

  return [maybeArray];
}

export function isPromise<T>(promise: T | Promise<T>): promise is Promise<T> {
  return (
    promise != null && typeof promise === "object" && "then" in (promise as any)
  );
}
