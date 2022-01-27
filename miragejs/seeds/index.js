/*
 * Mirage JS guide on Seeds: https://miragejs.com/docs/data-layer/factories#in-development
 */

// eslint-disable-next-line prettier/prettier
const usersSeeder = server => {
  /*
   * This will create in the in memory DB 10 objects
   * of the Factory `user`. Moreover it creates a
   * random number of messages and assign to each
   * and every user, making use of relationships.
   */
  server.createList('user', 15);
};

export default function seeds(server) {
  server.loadFixtures();
  usersSeeder(server);
}
