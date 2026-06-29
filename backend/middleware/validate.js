const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return res.status(400).json({ message: "Validation failed", errors });
  }

  // Replace req.body with the parsed (cleaned) data
  req.body = result.data;
  next();
};

module.exports = { validate };
