import {
  ApiEvent,
  ApiView,
  ApiViewBase,
  apiViewHandler,
  BaseModel,
  RequestHandler,
  Lambda,
  SubRoute,
} from "@jetkit/cdk"
import { Column, Entity } from "typeorm"

const commonOpts = {
  memorySize: 512,
  bundling: {
    // target: "node14",
    minify: true,
    // sourceMap: true,
    target: "es2020",
    metafile: true,
    esbuildVersion: "0.11.14",
  },
}

/**
 * Forum topic
 */
@Entity()
export class Topic extends BaseModel {
  @Column({ nullable: true })
  name: string
}

@ApiView({
  path: "/topic",
  ...commonOpts,
  handler: "TopicCrudApi.dispatch",
})
export class TopicCrudApi extends ApiViewBase {
  @SubRoute({ path: "/test" })
  async test() {
    return "Testerino"
  }

  post: RequestHandler = async () => "Posterino"
}
export const handler = apiViewHandler(__filename, TopicCrudApi)

export async function queryHandler(event: ApiEvent) {
  return JSON.stringify({
    message: "function route",
    rawQueryString: event.rawQueryString,
  })
}
// define route & lambda
Lambda({
  path: "/blargle",
  ...commonOpts,
})(queryHandler)
