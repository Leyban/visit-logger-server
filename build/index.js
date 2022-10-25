"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express app
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// cors
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
// dotenv
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI;
// mongoose
const mongoose_1 = __importDefault(require("mongoose"));
const visitLog_1 = __importDefault(require("./visitLog"));
const toNewLog_1 = __importDefault(require("./utils/toNewLog"));
console.log('connecting to ', MONGODB_URI);
if (!MONGODB_URI) {
    console.log('MongoDB URI is missing');
}
else {
    mongoose_1.default
        .connect(MONGODB_URI)
        .then(() => { console.log('connected to MongoDB'); })
        .catch((error) => console.log('Unable to connect to MongoDB', error));
}
const PORT = process.env.PORT || 3001;
app.get('/api/logs', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logs = yield visitLog_1.default.find();
        res.send(logs);
    }
    catch (error) {
        console.log('Unable to retrieve logs: ' + error);
    }
}));
app.get('/api/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logs = yield visitLog_1.default.find({ name: req.params.name });
        res.send(logs);
    }
    catch (error) {
        console.log('Unable to retrieve logs: ' + error);
    }
}));
app.post('/api/log', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const log = (0, toNewLog_1.default)(req.body);
        const newLog = new visitLog_1.default({
            name: log.name,
            site: log.site,
            time: log.time
        });
        yield newLog.save();
        console.log(log.name, log.site, log.time);
        res.status(200);
    }
    catch (error) {
        console.log('Unable to save log ', error);
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
