import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/server/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('GET /GustavoOS application/json should return 200', () => {
        return request(app.getHttpServer())
            .get('/GustavoOS')
            .set('accept', 'application/json')
            .expect(200)
    })

    it('GET /GustavoOS application/json should return 406', () => {
        return request(app.getHttpServer())
            .get('/GustavoOS')
            .set('accept','application/xml')
            .expect(406)
    })
})
