import { docs_v1 } from "@googleapis/docs";
import { drive_v3 } from "@googleapis/drive";
declare type config = {
    client_email: string;
    private_key: string;
};
export declare function getDoc(config: config, documentId: string): Promise<docs_v1.Schema$Document | undefined>;
export declare function getFilesInFolder(config: config, folderId: string, params?: object): Promise<Array<drive_v3.Schema$File> | undefined>;
export {};
