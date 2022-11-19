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

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/GustavoOS')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(JSON.stringify([
        { "name": "ARMAria", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "master", "lastCommit": "1f81162ea88528d8c0ef9b271f460662c0521a08" }] },
        { "name": "AvaliacaoCocus", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "master", "lastCommit": "df5bfa1d40f085f3271c26a0c87e2d8be2202f49" }] },
        { "name": "AvaliacaoFoxbit", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "master", "lastCommit": "8abefcf16ff71a34a9cbca1cf892219f59afc75f" }] },
        { "name": "AvaliacaoTinnova", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "main", "lastCommit": "e471c6f7d499964cc96dce19cbb15196ce43f52e" }] },
        { "name": "C--Compiler", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "feature/readPointer", "lastCommit": "393103c70b8ea0a0bb35700e5e5fef227c4c765a" },{ "name": "master", "lastCommit": "916f4af88ab3bee69cd2993b6e862bfbce39b991" }] },
        { "name": "Extra", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "master", "lastCommit": "611411dddd12025e6202dbfa4058f3ea743a36be" }] },
        { "name": "gOS", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "master", "lastCommit": "ab282536f13d9b2d14d8a8b6977332240e608436" }] },
        { "name": "gportugol-js", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "dependabot/npm_and_yarn/lodash-4.17.19", "lastCommit": "2051530c5430323d9bc3a0e2336bdeacec6187da" }, { "name": "feature/parser", "lastCommit": "8b8858aaef5744b827dd24ee1372f01f31053ebe" }, { "name": "feature/typeCheck", "lastCommit": "4eb5bbfebf8c067b1a1b7f4bb0566764d528de20" }, { "name": "master", "lastCommit": "4e76a6d7133f2ab8e377bc1b8f68089a5a7881a0" }] },
        { "name": "med-plus", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "master", "lastCommit": "609ad033adf71b42327c35a2c8d7ab0775ed62ef" }] },
        { "name": "medplus-delivery", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "master", "lastCommit": "f8cd3932db69b67fce2a069e2b52412c89c68f37" }] }, 
        { "name": "meu-pix", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "main", "lastCommit": "c8ec3b12c110a27bf8f66c5e153c85c95e9aa33d" }] },
        { "name": "pilgrin", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "main", "lastCommit": "d46975619357f278a75d55180a39e5dec40fe864" }] },
        { "name": "Pizza-Rush", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "master", "lastCommit": "37e8d4815b6f8ea83368c42dfe9725d745a08e77" }] },
        { "name": "precatories", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "master", "lastCommit": "781acc2bfb373e1b19fa5a133541dad1ab478eb8" }] },
        { "name": "PreparadorMensagens", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "main", "lastCommit": "5d965ceda09d41aaf85e4a550c31339d901f0c05" }] },
        { "name": "verve-robot", "owner": "GustavoOS", "isForked": false, "branches": [{ "name": "master", "lastCommit": "21929e5cb95c1ea664ee26253cc5297788bbf0f6" }] }]));
  });
});
