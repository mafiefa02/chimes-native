import { UserSound } from '../../../../shared/types';

type SoundsQueryKeys = { id?: UserSound['id'] };

export const soundsQueryKeys = ({ id }: SoundsQueryKeys) => ['sounds', { id }];
