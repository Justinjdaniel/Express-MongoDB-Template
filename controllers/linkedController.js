const asyncHandler = require('express-async-handler');

const Linked = require('../models/linkedModel');
const User = require('../models/userModel');

// @desc    Get linked
// @route   GET /api/linked
// @access  Private
const getLinked = asyncHandler(async (req, res) => {
  const linked = await Linked.find({ user: req.user.id });

  res.status(200).json(linked);
});

// @desc    Set linked
// @route   POST /api/linked
// @access  Private
const setlinked = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const linked = await Linked.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(linked);
});

// @desc    Update linked
// @route   PUT /api/linked/:id
// @access  Private
const updateLinked = asyncHandler(async (req, res) => {
  const linked = await Linked.findById(req.params.id);

  if (!linked) {
    res.status(400);
    throw new Error('Linked not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the linked user
  if (linked.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedLinked = await Linked.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedlinked);
});

// @desc    Delete linked
// @route   DELETE /api/linked/:id
// @access  Private
const deleteLinked = asyncHandler(async (req, res) => {
  const linked = await Linked.findById(req.params.id);

  if (!linked) {
    res.status(400);
    throw new Error('linked not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the linked user
  if (linked.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await linked.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getLinked,
  setLinked,
  updateLinked,
  deleteLinked,
};
