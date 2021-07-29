import { PrismaClient } from "@prisma/client"
import { mockDeep, MockProxy, mockReset } from "jest-mock-extended"
import { prisma } from "./client"

jest.mock("./client", () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as MockProxy<PrismaClient>
