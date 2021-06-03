// just for demo purposes
import { AlbumApi, topSongsHandler } from "@jetkit/cdk"

// a list of resources we would like infrastructure generated for
export const stackResources = [AlbumApi, topSongsHandler]

export const appName = "demo"
