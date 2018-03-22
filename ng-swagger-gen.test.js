const nsg = require("./ng-swagger-gen.js");
const $RefParser = require("json-schema-ref-parser");

test("simple parsing", () => {
  return $RefParser
    .bundle("./tests/simple.yaml", { dereference: { circular: false } })
    .then(swag => {
      let models = nsg.processModels(swag, {});

      expect("entity" in models).toBe(true);
      expect("entities" in models).toBe(true);

      expect(models["entity"].modelIsObject).toBe(true);
      expect(models["entities"].modelIsArray).toBe(true);

      let services = nsg.processServices(swag, models, {});

      expect("Api" in services).toBe(true);
      expect(services).toBe(true);
    });
});
