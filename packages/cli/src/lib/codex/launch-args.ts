/** Resolve Codex's model flags without consuming image options or literal prompt arguments. */
export function extractCodexModelArg(args: readonly string[]): {
  modelId: string | undefined;
  args: string[];
} {
  const remaining: string[] = [];
  let modelId: string | undefined;
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]!;
    if (arg === "--") {
      remaining.push(...args.slice(i));
      break;
    }
    if (arg === "--model" || arg === "-m") {
      const value = args[++i];
      if (!value?.trim() || value.startsWith("-")) {
        throw new Error(`Flag ${arg} expects a model`);
      }
      modelId = value;
    } else if (arg.startsWith("--model=") || arg.startsWith("-m=")) {
      const value = arg.slice(arg.indexOf("=") + 1);
      if (!value.trim()) throw new Error("Model must not be empty");
      modelId = value;
    } else {
      remaining.push(arg);
    }
  }
  return { modelId, args: remaining };
}
