import request from 'supertest';
import express from 'express';
import imageRouter from '../routers/imageRouter.js';
import ImageServes from '../serves/imageServes.js';

const app = express();
app.use(express.json());
app.use('/images', imageRouter);

describe('Image Router', () => {
    it('should get all images', async () => {
        const mockImages = [{ id: 1, url: 'image1.jpg' }, { id: 2, url: 'image2.jpg' }];
        jest.spyOn(ImageServes, 'getAll').mockResolvedValue({ images: mockImages });

        const res = await request(app).get('/images');

        expect(res.status).toBe(200);
        expect(res.body.images).toEqual(mockImages);
    });

    it('should return error when getting all images fails', async () => {
        jest.spyOn(ImageServes, 'getAll').mockResolvedValue({ error: 'Error' });

        const res = await request(app).get('/images');

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Error getting images');
    });

    it('should create an image', async () => {
        const mockImage = { id: 1, url: 'image1.jpg' };
        jest.spyOn(ImageServes, 'create').mockResolvedValue({ image: mockImage });

        const res = await request(app)
            .post('/images')
            .attach('file', 'path/to/file.jpg')
            .field('referenceModel', 'model')
            .field('referenceId', '1');

        expect(res.status).toBe(201);
        expect(res.body.image).toEqual(mockImage);
    });

    it('should return error when creating an image fails', async () => {
        jest.spyOn(ImageServes, 'create').mockResolvedValue({ error: 'Error' });

        const res = await request(app)
            .post('/images')
            .attach('file', 'path/to/file.jpg')
            .field('referenceModel', 'model')
            .field('referenceId', '1');

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Error creating image');
    });

    it('should delete an image', async () => {
        const mockImage = { id: 1, file: { filename: 'image1.jpg' }, _referenceModel: 'model', _referenceId: '1' };
        jest.spyOn(ImageServes, 'delete').mockResolvedValue({ image: mockImage });

        const res = await request(app).delete('/images/1');

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Image deleted');
    });

    it('should return error when deleting an image fails', async () => {
        jest.spyOn(ImageServes, 'delete').mockResolvedValue({ error: 'Error' });

        const res = await request(app).delete('/images/1');

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Error deleting image');
    });

    it('should get an image by id', async () => {
        const mockImage = { id: 1, url: 'image1.jpg' };
        jest.spyOn(ImageServes, 'get').mockResolvedValue({ image: mockImage });

        const res = await request(app).get('/images/1');

        expect(res.status).toBe(200);
        expect(res.body.image).toEqual(mockImage);
    });

    it('should return error when getting an image by id fails', async () => {
        jest.spyOn(ImageServes, 'get').mockResolvedValue({ error: 'Error' });

        const res = await request(app).get('/images/1');

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Error getting image');
    });

    it('should update an image', async () => {
        const mockImage = { id: 1, url: 'image1.jpg' };
        jest.spyOn(ImageServes, 'update').mockResolvedValue({ image: mockImage });

        const res = await request(app)
            .patch('/images/1')
            .attach('file', 'path/to/file.jpg')
            .field('referenceModel', 'model')
            .field('referenceId', '1');

        expect(res.status).toBe(200);
        expect(res.body.image).toEqual(mockImage);
    });

    it('should return error when updating an image fails', async () => {
        jest.spyOn(ImageServes, 'update').mockResolvedValue({ error: 'Error' });

        const res = await request(app)
            .patch('/images/1')
            .attach('file', 'path/to/file.jpg')
            .field('referenceModel', 'model')
            .field('referenceId', '1');

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Error updating image');
    });

    it('should clear all images', async () => {
        const mockImages = [{ id: 1, url: 'image1.jpg' }, { id: 2, url: 'image2.jpg' }];
        jest.spyOn(ImageServes, 'clear').mockResolvedValue({ images: mockImages });

        const res = await request(app).delete('/images');

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('images deleted');
    });

    it('should return error when clearing all images fails', async () => {
        jest.spyOn(ImageServes, 'clear').mockResolvedValue({ error: 'Error' });

        const res = await request(app).delete('/images');

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Error clearing images');
    });
});