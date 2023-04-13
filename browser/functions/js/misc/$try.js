import { Scope, TranspilerError, Transpiler } from "../../..";
import funcs from "../../";
import { parseResult, getFunctionList, escapeResult } from "../../../util/transpilerHelpers.js";
export const $try = {
    name: "$try",
    brackets: true,
    optional: false,
    type: "scope",
    fields: [
        {
            name: "code",
            type: "string",
            required: true,
        },
    ],
    version: "7.0.0",
    description: "try statement that tests if a code works",
    default: ["void"],
    returns: "void",
    code: (data, scope) => {
        const code = data.inside;
        if (!code) {
            throw new TranspilerError(`${data.name}: Code Not Provided.`);
        }
        const currentScope = scope[scope.length - 1];
        const hash = Math.floor(Math.random() * 1000000);
        const newscope = new Scope(`${data.name}_${hash}`, currentScope.name, parseResult(code), true);
        let codeexe;
        const funcList = getFunctionList(code, Object.keys(funcs));
        if (!funcList.length) {
            codeexe = code;
        }
        else {
            codeexe = Transpiler(code, {
                sendMessage: true,
                scopeData: {
                    variables: currentScope.variables,
                    embeds: currentScope.embeds,
                    name: newscope.name,
                    objects: currentScope.objects,
                },
            });
            newscope.functions = codeexe.scope[0].functions + "\n";
            newscope.packages = codeexe.scope[0].packages + "\n";
            newscope.setters = codeexe.scope[0].setters + "\n";
            newscope.rest = codeexe.scope[0].rest + "\n";
            newscope.sendData = codeexe.scope[0].sendData;
            newscope.embeds = codeexe.scope[0].embeds;
            newscope.components = codeexe.scope[0].components;
            newscope.files = codeexe.scope[0].files;
            newscope.stickers = codeexe.scope[0].stickers;
            newscope.variables = codeexe.scope[0].variables;
        }
        const res = escapeResult(`try {
        ${newscope.toString(true)}
    }`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        data.funcs = [];
        return {
            code: res,
            scope: scope,
            data,
        };
    },
};
//# sourceMappingURL=$try.js.map