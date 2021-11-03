import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Our own guard definition - so that we don't have to specify 'local' everywhere we use it.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
