class BaseService {
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
    try {
      return await this.model.find(options);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(data) {
    try {
      const created = new this.model(data);
      return await created.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id, data) {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = BaseService;
