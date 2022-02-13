import { Context } from 'koa';

import errorHandler from '@/app/handler/error-handle';
import successHandler from '@/app/handler/success-handle';
import { ITheme } from '@/interface';
import themeService from '@/service/theme.service';

class ThemeController {
  async getList(ctx: Context, next) {
    try {
      const {
        nowPage = '1',
        pageSize = '10',
        orderBy = 'asc',
        orderName = 'id',
      } = ctx.request.query;
      const result = await themeService.getList({
        nowPage,
        pageSize,
        orderBy,
        orderName,
      });
      successHandler({ ctx, data: result });
    } catch (error) {
      errorHandler({ ctx, code: 400, error });
    }
    await next();
  }

  async find(ctx: Context, next) {
    try {
      const id = +ctx.params.id;
      const result = await themeService.find(id);
      successHandler({ ctx, data: result });
    } catch (error) {
      errorHandler({ ctx, code: 400, error });
    }
    await next();
  }

  async update(ctx: Context, next) {
    try {
      const id = +ctx.params.id;
      const { model, key, value, lang }: ITheme = ctx.request.body;
      const result = await themeService.update({
        id,
        model,
        key,
        value,
        lang,
      });
      successHandler({ ctx, data: result });
    } catch (error) {
      errorHandler({ ctx, code: 400, error });
    }
    await next();
  }

  async create(ctx: Context, next) {
    try {
      const { model, key, value, lang }: ITheme = ctx.request.body;
      const result = await themeService.create({
        model,
        key,
        value,
        lang,
      });
      successHandler({ ctx, data: result });
    } catch (error) {
      errorHandler({ ctx, code: 400, error });
    }
    await next();
  }

  async delete(ctx: Context, next) {
    try {
      const id = +ctx.params.id;
      const isExist = await themeService.isExist([id]);
      if (!isExist) {
        errorHandler({ ctx, code: 400, error: `不存在id为${id}的标签!` });
        return;
      }
      const result = await themeService.delete(id);
      successHandler({ ctx, data: result });
    } catch (error) {
      errorHandler({ ctx, code: 400, error });
    }
    await next();
  }
}

export default new ThemeController();
