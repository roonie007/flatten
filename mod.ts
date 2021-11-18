export type TObject = Record<string, unknown>;
export type FlattenObject = TObject;

export interface FlattenOptions {
  delimiter?: string;
  flattenArray?: boolean;
}

type FuncFlatten = (data: TObject, options?: FlattenOptions) => TObject;
type FuncPrivateFlatten = (
  object: TObject,
  {
    delimiter,
    path,
    flattenArray,
  }: { delimiter?: string; path?: string | null; flattenArray?: boolean }
) => TObject;

const isObject = (value: unknown) => {
  return [
    typeof value === "object",
    value !== null,
    !(value instanceof Date),
    !(value instanceof RegExp),
    !(Array.isArray(value) && value.length === 0),
  ].every(Boolean);
};

const _flatten: FuncPrivateFlatten = (
  object,
  { delimiter = ".", path = null, flattenArray = true }
) => {
  return Object.keys(object).reduce((acc: TObject, key: string): TObject => {
    const value = object[key];

    let newPath = [path, key].filter(Boolean).join(delimiter);
    if (flattenArray && Array.isArray(object)) {
      newPath = `${path ? path : ""}${delimiter}${key}`;
    }

    if (isObject(value)) {
      if (flattenArray || !Array.isArray(value)) {
        return {
          ...acc,
          ..._flatten(value as TObject, {
            delimiter,
            path: newPath,
            flattenArray,
          }),
        };
      } else {
        return {
          ...acc,
          [newPath]: value,
        };
      }
    }

    return {
      ...acc,
      [newPath]: value,
    };
  }, {} as TObject);
};

export const flatten: FuncFlatten = (
  data = {},
  { delimiter = ".", flattenArray = true } = {}
): FlattenObject => _flatten(data, { delimiter, flattenArray });

export const unflatten = <T = Record<string, unknown>>(
  data: TObject,
  delimiter = "."
): T => {
  if (Object(data) !== data || Array.isArray(data)) {
    return data as T;
  }

  const result: { ""?: T } = {};
  let cur: TObject, prop: string, parts, idx;
  for (const p in data) {
    (cur = result), (prop = "");
    parts = p.split(delimiter);
    for (let i = 0; i < parts.length; i++) {
      idx = !isNaN(parseInt(parts[i]));
      cur = (cur[prop] as TObject) || (cur[prop] = idx ? [] : {});
      prop = parts[i];
    }
    cur[prop] = data[p];
  }
  return result[""] as T;
};
