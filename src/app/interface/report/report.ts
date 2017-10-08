import { TestPair } from "./test-pair";

export interface Report extends TestPair {
    testSuite: string
    tests: TestPair[]
}
