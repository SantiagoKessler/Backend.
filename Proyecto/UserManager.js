const fs = require('fs');

class UserManager {
  static #usersData = [];
  static #dataFilePath = 'users.json';

  id;
  name;
  avatar;
  email;

  constructor() {
    this.loadDataFromFile();
  }

  addUser(data) {
    const requiredProps = ["name", "avatar", "email"];
    const providedProps = Object.keys(data);

    const missingProps = requiredProps.filter(prop => !providedProps.includes(prop));

    if (missingProps.length) {
      console.log(`Propiedades faltantes: ${missingProps.join(" ")}`);
    } else {
      const id = UserManager.#usersData[UserManager.#usersData.length - 1]?.id + 1 || 1;
      UserManager.#usersData.push({ id, ...data });
      this.saveDataToFile();
    }
  }

  getUsers() {
    return UserManager.#usersData;
  }

  getUserById(id) {
    return UserManager.#usersData.find(user => user.id == id);
  }

  loadDataFromFile() {
    try {
      const data = fs.readFileSync(UserManager.#dataFilePath, 'utf8');
      UserManager.#usersData = JSON.parse(data);
    } catch (error) {
      
      UserManager.#usersData = [];
    }
  }

  saveDataToFile() {
    fs.writeFileSync(UserManager.#dataFilePath, JSON.stringify(UserManager.#usersData), 'utf8');
  }
}

const userManager = new UserManager();

userManager.addUser({
  name: "Lionel Messi",
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3hwkJNq2UGSmLooMiirndrTIXsW3UTIbIXaZjcLMjtmbWJY1IZVWIWN3boAR884u9Vq0&usqp=CAU",
  email: "Lionelmessi@gmail.com",
});

userManager.addUser({
  name: "Paulo Dybala",
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThvRTdOBhjNlFDyGqeBOkiDtdKCRZVa5J0pA&usqp=CAU",
  email: "Lajoya@gmail.com",
});

console.log(userManager.getUsers());
console.log(userManager.getUserById(2));

