"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var environment_1 = require("../../global/environment");
var Server = /** @class */ (function () {
    /*Constructor del programa */
    function Server(puerto) {
        this.port = puerto;
        this.app = express_1.default();
    }
    Object.defineProperty(Server, "instance", {
        get: function () {
            return this._instance || (this._instance = new this(environment_1.SERVER_PORT));
        },
        enumerable: true,
        configurable: true
    });
    Server.prototype.start = function (callback) {
        this.app.listen(this.port);
        this.publicFolder();
    };
    Server.prototype.publicFolder = function () {
        var publicPath = path_1.default.resolve(__dirname, "../public");
        this.app.use(express_1.default.static(publicPath));
    };
    return Server;
}());
exports.Server = Server;
