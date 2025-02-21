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

class Dir {
    constructor() {
        this.path = '';
    }
    async getFiles (){
        return await fs.readdir(this.path);
    }
    async delete (){
        await fs.rmdir(this.path);
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
    getAvatarPath(userId) {
        return path.join(__dirname, 'avatars', userId.toString());
    }
}

export class DirAvatar extends Dir {
    constructor(userId) {
        super();
        this.path = this.getAvatarPath(userId);
    }
}
export class DirCountry extends Dir {
    constructor(countryName) {
        super();
        this.path = path.join(__dirname, 'countries', countryName);
    }
}

export function getAvatarPath (id){
    return path.join(__dirname, 'avatars', id.toString())
}

export function getPath (path){
    return siteUrl + '/' + path.split('\\').slice(1).join('/')
}

export const details = {
    host,
    port,
    protocol,
    siteUrl
};

