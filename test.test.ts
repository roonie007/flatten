import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { flatten, unflatten } from "./mod.ts";

const obj = {
  a: {
    b: {
      b2: 8,
      b3: undefined,
      b4: new Date(),
      b5: null,
      b6: [],
      b7: /^fo(ba)?$/i,
    },
    c: {
      c2: [
        2,
        false,
        true,
        null,
        undefined,
        { hey: "there" },
        ["item1", "item2", 3, null],
        "cool",
      ],
      c3: 3,
      c4: [],
    },
  },
};

const flattedButNotArrays = {
  "a.b.b2": 8,
  "a.b.b3": undefined,
  "a.b.b4": obj.a.b.b4,
  "a.b.b5": null,
  "a.b.b6": [],
  "a.b.b7": /^fo(ba)?$/i,
  "a.c.c2": [
    2,
    false,
    true,
    null,
    undefined,
    {
      hey: "there",
    },
    ["item1", "item2", 3, null],
    "cool",
  ],
  "a.c.c3": 3,
  "a.c.c4": [],
};

const flatted = {
  "a.b.b2": 8,
  "a.b.b3": undefined,
  "a.b.b4": obj.a.b.b4,
  "a.b.b5": null,
  "a.b.b6": [],
  "a.b.b7": /^fo(ba)?$/i,
  "a.c.c2.0": 2,
  "a.c.c2.1": false,
  "a.c.c2.2": true,
  "a.c.c2.3": null,
  "a.c.c2.4": undefined,
  "a.c.c2.5.hey": "there",
  "a.c.c2.6.0": "item1",
  "a.c.c2.6.1": "item2",
  "a.c.c2.6.2": 3,
  "a.c.c2.6.3": null,
  "a.c.c2.7": "cool",
  "a.c.c3": 3,
  "a.c.c4": [],
};

const flattedWithDash = {
  "a--b--b2": 8,
  "a--b--b3": undefined,
  "a--b--b4": obj.a.b.b4,
  "a--b--b5": null,
  "a--b--b6": [],
  "a--b--b7": /^fo(ba)?$/i,
  "a--c--c2--0": 2,
  "a--c--c2--1": false,
  "a--c--c2--2": true,
  "a--c--c2--3": null,
  "a--c--c2--4": undefined,
  "a--c--c2--5--hey": "there",
  "a--c--c2--6--0": "item1",
  "a--c--c2--6--1": "item2",
  "a--c--c2--6--2": 3,
  "a--c--c2--6--3": null,
  "a--c--c2--7": "cool",
  "a--c--c3": 3,
  "a--c--c4": [],
};

Deno.test({
  name: "Flat object",
  fn(): void {
    assertEquals(flatten(obj), flatted);
  },
});

Deno.test({
  name: "Flat object also flat arrays within",
  fn(): void {
    assertEquals(flatten(obj, { flattenArray: false }), flattedButNotArrays);
  },
});

Deno.test({
  name: "Flat object also flat arrays within with a delimiter --",
  fn(): void {
    assertEquals(flatten(obj, { delimiter: "--" }), flattedWithDash);
  },
});

Deno.test({
  name: "Unflat object",
  fn(): void {
    assertEquals(unflatten(flatted), obj);
  },
});
Deno.test({
  name: "Unflat object with a delimiter --",
  fn(): void {
    assertEquals(unflatten(flattedWithDash, "--"), obj);
  },
});
