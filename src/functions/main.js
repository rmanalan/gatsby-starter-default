import axios from "axios"
import * as LaunchDarkly from "launchdarkly-node-server-sdk"

const ldClient = LaunchDarkly.init(process.env.LD_SDK_KEY)

export async function handler(event, context, callback) {
  await ldClient.waitForInitialization()
  try {
    const allFlags = await ldClient.allFlagsState({ key: "anon" })
    return {
      statusCode: 200,
      body: JSON.stringify(allFlags, null, 2),
    }
  } catch (err) {}
}
