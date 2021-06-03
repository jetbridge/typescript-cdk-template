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
})(queryHandler)
