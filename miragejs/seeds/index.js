/*
 * Mirage JS guide on Seeds: https://miragejs.com/docs/data-layer/factories#in-development
 */

const usersSeeder = (server) => {
  server.createList('user', 15);
};

const productSeeder = (server) => {
  server.createList('product', 15);
};

export default function seeds(server) {
  server.loadFixtures();
  usersSeeder(server);
  productSeeder(server);
}
