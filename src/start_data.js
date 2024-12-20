import User from "./models/userModel.js";


const insertInitialUserData = async () => {
  const userData = [
    {
      email: "ismael.academy@gmail.com",
      password: "$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q", //pass: ismael123
      name: "Ismael",
      roles: ["user"],
    },
    {
      email: "laura@hotmail.com",
      password: "$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q", //pass: ismael123
      name: "Laura",
      roles: ["user"],
    },
    {
      email: "maria@hotmail.com",
      password: "$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q", //pass: ismael123
      name: "Maria",
      surname: "kale",
      roles: ["mod", "admin"],
    },
    {
      email: "mod@hotmail.com",
      password: "$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q", //pass: ismael123
      name: "Moderador",
      surname: "kale",
      roles: ["admin"],
    },
    {
      email: "admin@hotmail.com",
      password: "$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q", //pass: ismael123
      name: "Admin",
      surname: "kale",
      roles: ["admin"],
    },
  ];
  // Insertar datos con opción ignoreDuplicates
  // Para actualizar todas las filas: updateOnDuplicate: Object.keys(User.rawAttributes)
  await User.bulkCreate(userData, { ignoreDuplicates: true });

};

export { insertInitialUserData };
