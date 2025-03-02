import path from "path";
import fs from "fs/promises";
import {__dirname} from "../../uploads/path.js";

const host = '127.0.0.1';
const port = 7000;
const protocol = 'http';
const siteUrl = `${protocol}://${host}:${port}`;

export async function clearDir (pathDir){
    const files = await fs.readdir(pathDir);
    if (files.length === 0) {
        await fs.rmdir(pathDir);
        return true
    }
    return false
}

export class Dir {
    constructor(referenceModel, referenceId) {
        this.referenceModel = referenceModel;
        this.referenceId = referenceId;
        this.path = this.getPath();
    }
    async getFiles (){
        return await fs.readdir(this.path);
    }
    async delete() {
        try {
            await fs.access(this.path);
            await fs.rm(this.path, { recursive: true });
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.error(`Directory does not exist: ${this.path}`);
            } else {
                console.error(`Error removing directory: ${err.message}`);
            }
        }
    }
    async create (){
        await fs.mkdir(this.path);
    }
    async deleteFile (filename){
        try {
            await fs.unlink(path.join(this.path, filename));
        } catch (err) {
            console.error(err);
        }
    }
    async getFile (filename){
        try {
            return await fs.readFile(path.join(this.path, filename));
        } catch (err) {
            return {error: err, message: 'File not found'}
        }
    }
    async deleteDirIfEmpty (){
        const files = await this.getFiles();
        if (files.length === 0) {
            await this.delete();
            return true
        }
        return false
    }
    getPath() {
        return path.join(__dirname, this.referenceModel, this.referenceId.toString());
    }
}


export function getAvatarPath (id){
    return path.join(__dirname, 'avatars', id.toString())
}

export function getPath (path){
    return siteUrl + '/' + path.split('\\').slice(1).join('/')
}

export function getUploadPath (category, id){
    return path.join('uploads', category, id.toString())
}

export const referenceModelsArray = ["User", "Chat", "Country", "Message"];

export const details = {
    host,
    port,
    protocol,
    siteUrl
};

