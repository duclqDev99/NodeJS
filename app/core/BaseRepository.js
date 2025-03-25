class BaseRepository {
  constructor(model) {
    this.model = model;

    const proto = Object.getPrototypeOf(this);
    const methodNames = Object.getOwnPropertyNames(proto).filter(
      (prop) => typeof this[prop] === "function" && prop !== "constructor"
    );

    methodNames.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  async findAll(options = {}) {
    return await this.model.findAll(options);
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async findOne(condition = {}) {
    return await this.model.findOne({ where: condition });
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    const item = await this.findById(id);
    if (!item) return null;
    return await item.update(data);
  }

  async delete(id) {
    const item = await this.findById(id);
    if (!item) return null;
    await item.destroy();
    return true;
  }
}

module.exports = BaseRepository;
