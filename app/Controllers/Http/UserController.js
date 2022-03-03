"use strict";

class UserController {
  store({ request }) {
    console.log(request);
    const { email, password } = request.all();
    const user = User.create({
      email,
      password,
      username: email,
    });
    return user;
  }
}

module.exports = UserController;
