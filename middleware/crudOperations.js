const asyncHandler = require("express-async-handler");
const getAll = (Model) =>
  asyncHandler(async (req, res) => {
    const documents = await Model.find();
    res.status(200).json(documents);
  });

const getById = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.findById(req.params.id);
    if (!document) {
      res.status(404);
      throw new Error("The data is not found yes");
    }
    res.status(200).json(document);
  });

const create = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(200).json(document);
  });

const updateById = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      res.status(404);
      throw new Error("The data is not found");
    }
    res.status(200).json(document);
  });

const deleteById = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      res.status(404);
      throw new Error("The data is not found");
    }
    res.status(200).json(document);
  });

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};