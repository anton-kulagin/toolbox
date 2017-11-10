export interface Configuration {
    label: string                    // [required] Tag saved with your reference images
    onBeforeScript?: string           // Used to set up browser state e.g. cookies.
    cookiePath?: string               // import cookies in JSON format (available with default onBeforeScript see setting cookies below)
    url: string                      // [required] The url of your app state
    referenceUrl?: string             // Specify a different state or environment when creating reference.
    readyEvent?: string               // Wait until this string has been logged to the console.
    readySelector?: string            // Wait until this selector exists before continuing.
    delay?: string                    // Wait for x millisections
    hideSelectors?: string[]            // Array of selectors set to visibility: hidden
    removeSelectors?: string[]          // Array of selectors set to display: none
    onReadyScript?: string            // After the above conditions are met -- use this script to modify UI state prior to screen shots e.g. hovers, clicks etc.
    hoverSelector?: string            // Move the pointer over the specified DOM element prior to screen shot (available with default onReadyScript)
    clickSelector?: string            // Click the specified DOM element prior to screen shot (available with default onReadyScript)
    postInteractionWait?: string      // Wait for a selector after interacting with hoverSelector or clickSelector (optionally accepts wait time in ms. Idea for use with a click or hover element transition. available with default onReadyScript)
    selectors: string[]                // Array of selectors to capture. Defaults to document if omitted. Use "viewport" to capture the viewport size. See Targeting elements in the next section for more info...
    selectorExpansion?: any        // See Targeting elements in the next section for more info...
    misMatchThreshold?: any       // Around of change before a test is marked failed
    requireSameDimensions?: any   // If set to true -- any change in selector size will trigger a test failure.
    active?:boolean          //mark for changing position in list of items
}
