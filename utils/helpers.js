const glob = require("glob");
const Logger = require("./log");

function getId(filepath) {
    const id = filepath.match(/\/([^/]*).js$/).pop();
    return id.replace(/\.?helper\.?/, "");
}

function register(Handlebars, id, fun) { // eslint-disable-line no-shadow
    if (Handlebars.helpers[id]) {
        Logger.warn(`The helper '${id}' is already registered.
            Remove duplications to prevent hard to find errors.`);
    } else {
        Logger.log(`+ helper '${id}'`);
    }
    Handlebars.registerHelper(id, fun);
}

/**
 * Resolves the helpers config to a map with id, filepath and the corresponding helper-function
 *
 * @param  {Object} query    - object containing mappings of helperId:helperFunc or anyName:globPatternString
 * @return {Array} list of objects { id, filepath, helperFunction }
 */
function resolve(query) {
    const resolvedHelpers = [];

    Object
        .keys(query)
        .forEach((helperId) => {
            // globbed paths
            if (typeof query[helperId] === "string") {
                const foundHelpers = glob.sync(query[helperId]);
                foundHelpers.forEach((pathToHelper) => {
                    resolvedHelpers.push({
                        id: getId(pathToHelper),
                        filepath: pathToHelper,
                        helperFunction: require(pathToHelper)
                    });
                });
                return;
            }

            resolvedHelpers.push({
                id: helperId,
                filepath: false,
                helperFunction: query[helperId]
            });
        });

    return resolvedHelpers;
}


module.exports = {
    getId,
    register,
    resolve
};
