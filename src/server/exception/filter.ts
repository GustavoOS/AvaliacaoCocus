import { Catch, HttpStatus, Logger } from '@nestjs/common';
import { FetchError } from 'node-fetch';
import { InvalidUser } from '../../exception/invalid';
import { toErrorResponse } from '../factory/exception';
import { InvalidContentType } from './invalid';


@Catch(
    InvalidUser,
    InvalidContentType,
    FetchError
)
export class ExceptionFilter {
    private readonly logger = new Logger(ExceptionFilter.name);

    catch(exception: Error, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        this.logger.error(exception, exception.stack)

        answer(response, toErrorResponse(exception))
    }
}

export interface ErrorResponse {
    "status": HttpStatus
    "message": string
}


function answer(res, schema: ErrorResponse) {
    res.status(schema.status).json(schema)
}
