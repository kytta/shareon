import { expectError } from 'tsd';
import { shareUrl } from '.';

shareUrl('facebook')
expectError(shareUrl('dummy'))
