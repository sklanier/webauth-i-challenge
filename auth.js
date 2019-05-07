function authenticate(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "Wrong" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Server Error" });
      });
  } else {
    res.status(400).json({ message: "No credentials" });
  }
}

module.exports = {
  authenticate
};