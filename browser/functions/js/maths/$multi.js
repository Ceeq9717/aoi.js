import { TranspilerError } from "../../../core/error.js";
import { TranspilerCustoms } from "../../../typings/enums.js";
import { escapeMathResult, parseResult, } from "../../../util/transpilerHelpers.js";
export const $multi = {
    name: "$multi",
    type: "getter",
    brackets: true,
    optional: false,
    fields: [
        {
            name: "numbers",
            type: "number",
            required: true,
        },
    ],
    version: "7.0.0",
    default: ["void"],
    returns: "number",
    description: "Returns the multiplication of the numbers",
    code: (data, scope) => {
        const numbers = data.splits;
        const currentScope = scope[scope.length - 1];
        if (data.splits.length === 0 &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new TranspilerError(`${data.name} requires at least 1 argument`);
        }
        const multi = numbers
            .map((x) => x.includes(TranspilerCustoms.FS) ||
            x.includes("__$DISCORD_DATA$__") ||
            x.includes(TranspilerCustoms.MFS)
            ? parseResult(x.trim())
            : Number(x))
            .join("*");
        const res = escapeMathResult(`(${multi})`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope,
        };
    },
};
//# sourceMappingURL=$multi.js.map