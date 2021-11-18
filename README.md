# Flatten

Flatten or unflatten a nested Javascript object by delimiter keys.

## Usage

### Flatten

```javascript
import { flatten } from "https://deno.land/x/flatten/mod.ts";

const obj = {
  key1: {
    keyA: "valueI",
  },
  key2: {
    keyB: "valueII",
  },
  key3: { a: { b: { c: 2 } } },
  arr: ["item1", null, ["nested1", "nested2"]],
};

flatten(obj);
// {
//   "key1.keyA": "valueI",
//   "key2.keyB": "valueII",
//   "key3.a.b.c": 2,
//   "arr.0": "item1",
//   "arr.1": null,
//   "arr.2.0": "nested1",
//   "arr.2.1": "nested2",
//   "arr.3.key4.nested": 1,
//   "arr.3.key5": undefined
// }

flatten(obj, { flattenArray: false });
// {
//   "key1.keyA": "valueI",
//   "key2.keyB": "valueII",
//   "key3.a.b.c": 2,
//   arr: [
//     "item1",
//     null,
//     [ "nested1", "nested2" ],
//     { key4: { nested: 1 }, key5: undefined }
//   ]
// }

flatten(obj, { delimiter: "--" });
// {
//   "key1--keyA": "valueI",
//   "key2--keyB": "valueII",
//   "key3--a--b--c": 2,
//   "arr--0": "item1",
//   "arr--1": null,
//   "arr--2--0": "nested1",
//   "arr--2--1": "nested2",
//   "arr--3--key4--nested": 1,
//   "arr--3--key5": undefined
// }
```

#### Options

is an object composed of

**delimiter: _string_** (default = '.')  
Use a custom delimiter instead of `.` when flattening your objects.

**flattenArray: _boolean_** (default = true)  
Flatten the arrays and their items.

### Unflatten

```javascript
import { unflatten } from "https://deno.land/x/flatten/mod.ts";

const flattedObj = {
  "key1.keyA": "valueI",
  "key2.keyB": "valueII",
  "key3.a.b.c": 2,
  "arr.0": "item1",
  "arr.1": null,
  "arr.2.0": "nested1",
  "arr.2.1": "nested2",
  "arr.3.key4.nested": 1,
  "arr.3.key5": undefined,
};

unflatten(flattedObj);
// {
//   key1: {
//       keyA: 'valueI'
//   },
//   key2: {
//       keyB: 'valueII'
//   },
//   key3: { a: { b: { c: 2 } } },
//   arr: ['item1',null,['nested1', 'nested2']]
// }

const flattedObjWithDoubleDashes = {
  "key1--keyA": "valueI",
  "key2--keyB": "valueII",
  "key3--a--b--c": 2,
  "arr--0": "item1",
  "arr--1": null,
  "arr--2--0": "nested1",
  "arr--2--1": "nested2",
  "arr--3--key4--nested": 1,
  "arr--3--key5": undefined,
};

unflatten(flattedObjWithDoubleDashes, "--");
// {
//   key1: {
//       keyA: 'valueI'
//   },
//   key2: {
//       keyB: 'valueII'
//   },
//   key3: { a: { b: { c: 2 } } },
//   arr: ['item1',null,['nested1', 'nested2']]
// }
```

#### Options

**delimiter: _string_** (default = '.')  
Use a custom delimiter instead of `.` when flattening your objects.

## License

MIT
