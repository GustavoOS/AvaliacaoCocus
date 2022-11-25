/* istanbul ignore file */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/server/app.module';
import { ExceptionFilter } from '../src/server/exception/filter';
import { Connection } from '../src/provider/redis/connection';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication()
        app.enableShutdownHooks()
        app.useGlobalFilters(new ExceptionFilter())
        await app.init();
    });

    it('GET /GustavoOS application/json should return 200', () => {
        return request(app.getHttpServer())
            .get('/repositories/GustavoOS')
            .set('accept', 'application/json')
            .expect(200)
    })

    it('GET /GustavoOS application/json should return 406', () => {
        return request(app.getHttpServer())
            .get('/repositories/GustavoOS')
            .set('accept','application/xml')
            .expect(406)
    })

    afterAll(() => {
        Connection.kill
    })
})
