// Import Node.js Dependencies
import { fileURLToPath } from "url";

// Import Third-party Dependencies
import test from "tape";
import snapshot from "snap-shot-core";

// Import Internal Dependencies
import { verify } from "../index.js";

test.onFinish(snapshot.restore);

test("verify 'express' package", async(tape) => {
  const data = await verify("express@4.17.0");

  tape.deepEqual(data.files, {
    list: [
      "History.md",
      "LICENSE",
      "Readme.md",
      "index.js",
      "lib\\application.js",
      "lib\\express.js",
      "lib\\middleware\\init.js",
      "lib\\middleware\\query.js",
      "lib\\request.js",
      "lib\\response.js",
      "lib\\router\\index.js",
      "lib\\router\\layer.js",
      "lib\\router\\route.js",
      "lib\\utils.js",
      "lib\\view.js",
      "package.json"
    ],
    extensions: [".md", ".js", ".json"],
    minified: []
  });
  tape.true(data.directorySize > 0);

  // licenses
  tape.deepEqual(data.uniqueLicenseIds, ["MIT"]);
  tape.deepEqual(data.licenses, [
    {
      uniqueLicenseIds: ["MIT"],
      spdxLicenseLinks: ["https://spdx.org/licenses/MIT.html#licenseText"],
      spdx: {
        osi: true,
        fsf: true,
        fsfAndOsi: true,
        includesDeprecated: false
      },
      from: "package.json"
    },
    {
      uniqueLicenseIds: ["MIT"],
      spdxLicenseLinks: ["https://spdx.org/licenses/MIT.html#licenseText"],
      spdx: {
        osi: true,
        fsf: true,
        fsfAndOsi: true,
        includesDeprecated: false
      },
      from: "LICENSE"
    }
  ]);

  tape.true(data.ast.warnings.length === 2);
  const warningName = data.ast.warnings.map((row) => row.kind);
  tape.deepEqual(warningName, ["parsing-error", "unsafe-import"]);

  snapshot.core({
    what: JSON.stringify(data.ast.dependencies, null, 2),
    file: fileURLToPath(import.meta.url),
    specName: "verify express@4.17.0"
  });

  tape.end();
});
