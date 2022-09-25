import type {
  LowerHttpMethod,
  AspidaMethods,
  HttpStatusOk,
  AspidaMethodParams,
} from "aspida";
import controllerFn0 from "./api/controller";
import controllerFn1 from "./api/hi/controller";

import type { FastifyInstance, RouteHandlerMethod } from "fastify";

export type FrourioOptions = {
  basePath?: string | undefined;
};

type HttpStatusNoOk =
  | 301
  | 302
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 409
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505;

type PartiallyPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type BaseResponse<T, U, V> = {
  status: V extends number ? V : HttpStatusOk;
  body: T;
  headers: U;
};

type ServerResponse<K extends AspidaMethodParams> =
  | (K extends { resBody: K["resBody"]; resHeaders: K["resHeaders"] }
      ? BaseResponse<K["resBody"], K["resHeaders"], K["status"]>
      : K extends { resBody: K["resBody"] }
      ? PartiallyPartial<
          BaseResponse<K["resBody"], K["resHeaders"], K["status"]>,
          "headers"
        >
      : K extends { resHeaders: K["resHeaders"] }
      ? PartiallyPartial<
          BaseResponse<K["resBody"], K["resHeaders"], K["status"]>,
          "body"
        >
      : PartiallyPartial<
          BaseResponse<K["resBody"], K["resHeaders"], K["status"]>,
          "body" | "headers"
        >)
  | PartiallyPartial<
      BaseResponse<any, any, HttpStatusNoOk>,
      "body" | "headers"
    >;

type RequestParams<T extends AspidaMethodParams> = Pick<
  {
    query: T["query"];
    body: T["reqBody"];
    headers: T["reqHeaders"];
  },
  {
    query: Required<T>["query"] extends {} | null ? "query" : never;
    body: Required<T>["reqBody"] extends {} | null ? "body" : never;
    headers: Required<T>["reqHeaders"] extends {} | null ? "headers" : never;
  }["query" | "body" | "headers"]
>;

export type ServerMethods<
  T extends AspidaMethods,
  U extends Record<string, any> = {}
> = {
  [K in keyof T]: (
    req: RequestParams<any> & U
  ) => ServerResponse<any> | Promise<ServerResponse<any>>;
};

const methodToHandler =
  (
    methodCallback: ServerMethods<any, any>[LowerHttpMethod]
  ): RouteHandlerMethod =>
  (req, reply) => {
    const data = methodCallback(req as any) as any;

    if (data.headers) reply.headers(data.headers);

    reply.code(data.status).send(data.body);
  };

export default (fastify: FastifyInstance, options: FrourioOptions = {}) => {
  const basePath = options.basePath ?? "";
  const controller0 = controllerFn0(fastify);
  const controller1 = controllerFn1(fastify);

  fastify.get(basePath || "/", methodToHandler(controller0.get));

  fastify.get(`${basePath}/hi`, methodToHandler(controller1.get));

  return fastify;
};