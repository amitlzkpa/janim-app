const concurrently = require("concurrently");

async function main() {
  concurrently([
    {
      command: "vue-cli-service build --mode development --watch --no-clean",
      name: "backend",
    },
    {
      command: `firebase emulators:start`,
      name: "frontend",
    },
  ]);
}

main();
