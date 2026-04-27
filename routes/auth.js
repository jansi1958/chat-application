const {
    login,
    register,
    getAllUsers,
    logOut
} = require("../controllers/UserCotroller.js")

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.post("/allusers/:id", getAllUsers);
router.post("/logout/:id", logOut);

module.exports = router;