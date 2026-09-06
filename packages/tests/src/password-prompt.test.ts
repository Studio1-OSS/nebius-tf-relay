import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { PassThrough } from "node:stream";
import { describe, expect, test } from "vitest";

// Resolve the actual transitive dependency used by the CLI, including pnpm's patch.
const cliRequire = createRequire(new URL("../../cli/package.json", import.meta.url));
const promptsRequire = createRequire(cliRequire.resolve("@clack/prompts"));
const corePath = promptsRequire.resolve("@clack/core");

describe.each(["CommonJS", "ESM"])("password prompt (%s)", (format) => {
  async function createPrompt() {
    const { PasswordPrompt } =
      format === "CommonJS"
        ? promptsRequire("@clack/core")
        : await import(pathToFileURL(corePath.replace(/\.cjs$/, ".mjs")).href);
    return new PasswordPrompt({
      input: new PassThrough(),
      output: new PassThrough(),
      render(this: { masked: string }) {
        return this.masked;
      },
    });
  }

  test("renders navigation keys before any text is entered", async () => {
    const prompt = await createPrompt();
    for (const name of ["left", "right", "backspace", "tab"]) {
      expect(() => prompt.onKeypress(undefined, { name })).not.toThrow();
    }
    expect(prompt.value).toBe("");
    expect(prompt.masked).toBe("");
  });

  test("finalizes an untouched optional password as an empty string", async () => {
    const prompt = await createPrompt();
    expect(() => prompt.emit("finalize")).not.toThrow();
    expect(prompt.value).toBe("");
    expect(prompt.valueWithCursor).toBe("");
  });

  test("reads a password through readline without echoing the secret", async () => {
    const prompt = await createPrompt();
    const frames: string[] = [];
    prompt.output.on("data", (chunk: Buffer) => frames.push(chunk.toString()));
    const answer = prompt.prompt();
    prompt.input.write("regression-test-key");
    prompt.input.write("\r");
    expect(await answer).toBe("regression-test-key");
    expect(frames.join("")).not.toContain("regression-test-key");
    expect(frames.join("")).toContain("\u2022".repeat(19));
  });

  test("submits an empty password through readline", async () => {
    const prompt = await createPrompt();
    const answer = prompt.prompt();
    prompt.input.write("\r");
    expect(await answer).toBe("");
  });

  test("masks secrets and tolerates a missing value during rendering", async () => {
    const prompt = await createPrompt();
    prompt.value = "test-secret";
    expect(prompt.masked).toBe("\u2022".repeat(11));
    for (const value of [undefined, null, ""]) {
      prompt.value = value;
      expect(prompt.masked).toBe("");
    }
  });
});
