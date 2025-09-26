const { response } = require("express");
const Comments = require("../models/comments");

const normalizeComment = (doc) => {
  const comment = { ...doc };
  comment.id = doc._id;
  delete comment._id;
  return comment;
};

exports.all = async (req, res, next) => {
  try {
    const docs = await Comments.all();

    const formatted = docs.map((doc) => ({
      id: doc._id.toString(),
      body: doc.body,
      parentId: doc.parentId,
      userId: doc.userId,
      createdAt: doc.createdAt,
    }));

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(formatted, null, 2));
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const comment = {
      body: req.body.text,
      parentId: req.body.parentId || null,
      userId: "1",
    };

    const doc = await Comments.create(comment);
    const response = normalizeComment(doc);
    res.send(response);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const doc = await Comments.update(req.params.id, { body: req.body.text });
    const response = normalizeComment(doc);
    res.send(response);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Comments.delete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
