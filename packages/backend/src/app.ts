import { CorsHttpMethod, Duration, JetKitCdkApp } from "@jetkit/cdk"
// demo
import { AlbumApi, topSongsHandler } from "@jetkit/cdk"

export const app = new JetKitCdkApp({
  config: {
    api: {
      corsPreflight: {
        allowMethods: [CorsHttpMethod.ANY],
        allowCredentials: true,
        maxAge: Duration.days(10),
      },
    },
  },
})

// a list of resources we would like infrastructure generated for
export const stackResources = [AlbumApi, topSongsHandler]
