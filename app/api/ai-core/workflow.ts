import { pipe } from "./utils/pipe"
import { withErrorHandling } from "./utils/errorHandling"
import { designComponent, generateComponent, storeComponent } from "./steps"
import { InitialWorkflowContext, WorkflowContext } from "./type"

export const componentWorkflow = pipe<InitialWorkflowContext, WorkflowContext>(
  withErrorHandling(designComponent),
  withErrorHandling(generateComponent),
  withErrorHandling(storeComponent),
)

export async function run(context: InitialWorkflowContext) {
  try {
    const result = await componentWorkflow(context)
    return {
      success: true,
      data: result.state,
    }
  } catch (error) {
    console.error("Workflow failed:", error)
    return {
      success: false,
      error: error as Error,
    }
  }
}
