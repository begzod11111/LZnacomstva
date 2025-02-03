import {fileURLToPath} from "url";
import {dirname} from "path";

const host = '127.0.0.1';
const port = 7000;
const protocol = 'http';
const siteUrl = `${protocol}://${host}:${port}`;

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const details = {
    host,
    port,
    protocol,
    siteUrl
};