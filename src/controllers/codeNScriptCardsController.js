import CodeNScriptCards from "../models/CodeNScriptCards.js";

// Helper to generate slug from name
const generateSlug = (name) => {
  return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-");};

// Create new product
export const createCodeNScriptCard = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });}

    const slug = generateSlug(name);

    // Check if slug already exists
    const existing = await CodeNScriptCards.findOne({ slug });
    if (existing) {
      return res.status(400).json({success: false,message: "Product with this name (slug) already exists",});
    }

    const newCard = await CodeNScriptCards.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: newCard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all products
export const getAllCodeNScriptCards = async (req, res) => {
  try {
    const cards = await CodeNScriptCards.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: cards.length, data: cards });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get by ID
export const getCodeNScriptCardById = async (req, res) => {
  try {
    const card = await CodeNScriptCards.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: card });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get by Slug
export const getCodeNScriptCardBySlug = async (req, res) => {
  try {
    const card = await CodeNScriptCards.findOne({ slug: req.params.slug });
    if (!card) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: card });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update by ID
export const updateCodeNScriptCardById = async (req, res) => {
  try {
    const updates = req.body;

    // If name is being updated → regenerate slug
    if (updates.name) {
      updates.slug = generateSlug(updates.name);

      // Prevent duplicate slug
      const existing = await CodeNScriptCards.findOne({
        slug: updates.slug,
        _id: { $ne: req.params.id },
      });
      if (existing) {
        return res.status(400).json({success: false, message: "Another product with this name already exists" });
      }
    }

    const updatedCard = await CodeNScriptCards.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedCard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update by Slug
export const updateCodeNScriptCardBySlug = async (req, res) => {
  try {
    const updates = req.body;

    if (updates.name) {
      updates.slug = generateSlug(updates.name);

      const existing = await CodeNScriptCards.findOne({
        slug: updates.slug,
        slug: { $ne: req.params.slug },
      });
      if (existing) {
        return res.status(400).json({ success: false, message: "Another product with this name already exists" });
      }
    }

    const updatedCard = await CodeNScriptCards.findOneAndUpdate(
      { slug: req.params.slug },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedCard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete by ID
export const deleteCodeNScriptCard = async (req, res) => {
  try {
    const card = await CodeNScriptCards.findByIdAndDelete(req.params.id);
    if (!card) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
