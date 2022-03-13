import { Kysely, Generated, SqliteDialect } from "kysely"

interface PostTable {
  id: Generated<string>
  title: string
  body: string
  createdAt: string
}

export interface Database {
  post: PostTable
}

// This is just example code.
export async function createAndConnectDatabase() {
  const db = new Kysely<Database>({
    dialect: new SqliteDialect({
      databasePath: "./db",
    }),
  })

  try {
    await db.schema
      .createTable("post")
      .addColumn("id", "serial", (col) => col.primaryKey())
      .addColumn("title", "varchar")
      .addColumn("body", "varchar")
      .addColumn("createdAt", "date")
      .execute()
  } catch (e) {
    console.log("[DB] post table already exists.")
  }

  return db
}
