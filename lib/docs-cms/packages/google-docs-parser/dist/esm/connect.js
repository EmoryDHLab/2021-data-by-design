var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { docs, auth, } from "@googleapis/docs";
import { drive } from "@googleapis/drive";
function getJWT(config) {
    try {
        const scopes = ["https://www.googleapis.com/auth/documents.readonly", "https://www.googleapis.com/auth/drive.readonly"];
        return new auth.JWT(config.client_email, undefined, config.private_key, scopes);
    }
    catch (error) {
        return String(error);
    }
}
export function getDoc(config, documentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = getJWT(config);
        if (typeof auth == "string") {
            throw Error(auth);
        }
        try {
            const resp = yield docs({ version: "v1" }).documents.get({
                documentId,
                auth
            });
            return resp.data;
        }
        catch (error) {
            //More robust error handling TODO
            throw error;
        }
    });
}
//Untested and practically useless as there's no way to get the position of the comment within the document
function getComments(config, documentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = getJWT(config);
        if (typeof auth == "string") {
            throw Error(auth);
        }
        try {
            const resp = yield drive({ version: "v3" }).comments.list({
                fileId: documentId,
                fields: "comments/content, comments/htmlContent, comments/anchor, comments/id"
            });
            return resp.data.comments;
        }
        catch (error) {
            throw error;
        }
    });
}
export function getFilesInFolder(config, folderId, params = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = getJWT(config);
        if (typeof auth == "string") {
            throw Error(auth);
        }
        try {
            const resp = yield drive({ version: "v3" }).files.list(Object.assign({
                q: `'${folderId}' in parents`,
                auth
            }, params));
            return resp.data.files;
        }
        catch (error) {
            //More robust error handling TODO
            throw error;
        }
    });
}
//# sourceMappingURL=connect.js.map