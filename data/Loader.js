const fs = require("fs");

class Loader {
  filename;
  isUsingId;
  defaultId;
  dataKey;
  
  constructor(filename, isUsingId = false, defaultId = 1000) {
    this.filename = filename;
    this.isUsingId = isUsingId;
    this.defaultId = defaultId;
    this.dataKey = filename.match(/[ \w-]+?(?=\.)/gm, "")[0];
  }

  load = () => {
    try {
      const buffer = fs.readFileSync(this.filename);
      const json = buffer.toString();
      return JSON.parse(json);
    } catch (e) {
      return this.isUsingId ? { nextId: this.defaultId, [this.dataKey]: [] } : [];
    }
  };
  get = () => {
    const content = this.load();
    return this.isUsingId ? content[this.dataKey] : content;
  };
}

module.exports = Loader;