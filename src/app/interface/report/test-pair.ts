export interface TestPair {
        pair: {
          reference: string,
          test: string,
          selector: string,
          fileName: string,
          label: string,
          misMatchThreshold: number,
          error: string
        },
        status: string

}
