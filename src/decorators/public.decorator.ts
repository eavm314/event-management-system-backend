import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'allowPublicRoutes';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);