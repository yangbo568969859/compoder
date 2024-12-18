import { WorkflowContext } from "../type"

export const withErrorHandling =
  <T extends WorkflowContext>(fn: (ctx: T) => Promise<WorkflowContext>) =>
  async (context: T): Promise<WorkflowContext> => {
    try {
      return await fn(context)
    } catch (error) {
      context.stream.write(`${fn.name} failed: ${error}\n`)
      throw error
    }
  }
