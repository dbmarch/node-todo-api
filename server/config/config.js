var env = process.env.NODE_ENV || "development";

if (env == "development") {
  console.log("development env");
  process.env.PORT = 3001;
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
} else if (env == "test") {
  console.log("test env");
  process.env.PORT = 3001;
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
}
