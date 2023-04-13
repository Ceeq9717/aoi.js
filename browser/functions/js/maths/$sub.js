import { TranspilerError } from "../../../core/error.js";
import { TranspilerCustoms } from "../../../typings/enums.js";
import { escapeMathResult, parseResult, } from "../../../util/transpilerHelpers.js";
export const $sub = {
    name: "$sub",
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
    description: "Returns the sub of the numbers",
    code: (data, scope) => {
        const numbers = data.splits;
        const currentScope = scope[scope.length - 1];
        if (data.splits.length === 0 &&
            !currentScope.name.startsWith("$try_") &&
            !currentScope.name.startsWith("$catch_")) {
            throw new TranspilerError(`${data.name} requires at least 1 argument`);
        }
        const sub = numbers
            .map((x) => x.includes(TranspilerCustoms.FS) ||
            x.includes("__$DISCORD_DATA$__") ||
            x.includes(TranspilerCustoms.MFS)
            ? parseResult(x.trim())
            : Number(x))
            .join("-");
        const res = escapeMathResult(`(${sub})`);
        currentScope.update(res, data);
        return {
            code: res,
            scope,
        };
    },
};
//# sourceMappingURL=$sub.js.map