import { TranspilerError } from "../../../core/error.js";
import { escapeResult, escapeVars } from "../../../util/transpilerHelpers.js";
export const $getObject = {
    name: "$getObject",
    brackets: true,
    optional: false,
    type: "getter",
    fields: [
        {
            name: "name",
            type: "string",
            required: true,
        },
    ],
    version: "7.0.0",
    description: "returns the object",
    default: ["void"],
    returns: "object",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const name = data.inside;
        if (!name &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.endsWith("$catch_")) {
            throw new TranspilerError(`${data.name}: No Object Name Provided`);
        }
        if (!currentScope.objects[name ?? ""] &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.endsWith("$catch_")) {
            throw new TranspilerError(`${data.name}: Invalid Object Name Provided`);
        }
        if (!currentScope.packages.includes("const UTIL = await import('util');")) {
            currentScope.packages += "const UTIL = await import('util');\n";
        }
        const res = escapeResult(`UTIL.inspect(${escapeVars(name)},{depth:null})`);
        currentScope.update(res, data);
        return {
            code: res,
            scope,
        };
    },
};
//# sourceMappingURL=$getObject.js.map