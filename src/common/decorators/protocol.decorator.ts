import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Protocol = createParamDecorator(
  (defaultValue: string, ctx: ExecutionContext) => {
    console.log('🚀 ~ file: protocol.decorator.ts ~ line 5 ~ defaultValue', {
      defaultValue,
    });
    const request = ctx.switchToHttp().getRequest();
    return request.protocol;
  },
);
