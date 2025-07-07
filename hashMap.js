export class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
  }

  _hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  _checkBounds(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  _resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  set(key, value) {
    const index = this._hash(key);
    this._checkBounds(index);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey] = bucket[i];
      if (existingKey === key) {
        bucket[i][1] = value; // Overwrite value
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this._resize();
    }
  }

  get(key) {
    const index = this._hash(key);
    this._checkBounds(index);
    const bucket = this.buckets[index];

    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this._hash(key);
    this._checkBounds(index);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
    this.size = 0;
  }

  keys() {
    const allKeys = [];
    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        allKeys.push(key);
      }
    }
    return allKeys;
  }

  values() {
    const allValues = [];
    for (const bucket of this.buckets) {
      for (const [, value] of bucket) {
        allValues.push(value);
      }
    }
    return allValues;
  }

  entries() {
    const allEntries = [];
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        allEntries.push([key, value]);
      }
    }
    return allEntries;
  }
}

export class HashSet {
  constructor() {
    this.map = new HashMap();
  }

  add(key) {
    this.map.set(key, true);
  }

  has(key) {
    return this.map.has(key);
  }

  delete(key) {
    return this.map.remove(key);
  }

  clear() {
    this.map.clear();
  }

  values() {
    return this.map.keys();
  }

  size() {
    return this.map.length();
  }
}
