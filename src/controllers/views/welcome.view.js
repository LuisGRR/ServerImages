exports.viewWelcome = async (req, res) => {
  try {
    res.render("welcome/index");
  } catch (error) {
    res.status(500).send("error interno del servidor");
  }
};
