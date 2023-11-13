const { db } = require("@vercel/postgres");
const { users, todolist } = require("../app/lib/data/placeholder-data");
const bcrypt = require("bcrypt");

//ON CONFLICT (id) DO NOTHING; 겹치는 항목이 있으면 아무작업도 수행 x
// uuid_generate_v4() = 함수로 id 자동 생성
// INTEGER NOT NULL,   number 정수만 사용 가능
//

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedTodoList(client) {
  try {
    const createTodoListTable =
      await client.sql`CREATE TABLE IF NOT EXISTS todolist (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID REFERENCES users(id),
            title VARCHAR(255) NOT NULL,
            detail VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL,
            date DATE NOT NULL
          );
        `;
    console.log(`Created "todolist" table`);
    // Insert data into the "todolist" table
    const insertedTodoList = await Promise.all(
      todolist.map(async (item) => {
        return client.sql`
        INSERT INTO todolist (user_id, title, detail, status, date)
        VALUES (${item.user_id}, ${item.title}, ${item.detail}, ${item.status}, ${item.date})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );
    console.log(`Seeded ${insertedTodoList.length} items`);
    return {
      createTodoListTable,
      todolist: insertedTodoList,
    };
  } catch (error) {
    console.error("Error seeding createTodoListTable:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await seedUsers(client);
  await seedTodoList(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
