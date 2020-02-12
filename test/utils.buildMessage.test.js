const assert = require("assert");
const buildMessage = require("../utils/buildMessage");

describe.only("utils - buildMessage", function() {
  //Colocando describe.only nos permite solo probar esta suit de test
  describe("when receives an entity and an action", function() {
    it("should return the respective message", function() {
      const result = buildMessage("movie", "create");
      const expect = "movie created";
      assert.strictEqual(result, expect);
    });
  });

  describe("when receives an entity and an action and is a list", function() {
    it("should return the respective message with the entity in plural", function() {
      const result = buildMessage("movie", "list");
      const expected = "movies listed";
      assert.strictEqual(result, expected);
    });
  });
});
