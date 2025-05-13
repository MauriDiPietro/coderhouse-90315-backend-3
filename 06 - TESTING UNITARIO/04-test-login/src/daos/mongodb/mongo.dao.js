export default class MongoDao {
  constructor(model) {
    this.model = model;
  }

  getAll = async () => {
    try {
      return await this.model.find({});
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (obj) => {
    try {
      return await this.model.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async (id, obj) => {
    try {
      return await this.model.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id) => {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  };
}
