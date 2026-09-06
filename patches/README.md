# Clack password initialization

`@clack/core@0.3.5` leaves `PasswordPrompt.value` undefined until readline
emits input. Rendering or finalizing before that event can crash on
`this.value.replaceAll` (issue #3), including when skipping an optional key.

The pnpm patch initializes the password to an empty string and guards the
masked getter in both ESM and CommonJS distributions. It also explicitly enables
readline terminal mode and uses a regular `Writable` as the internal output
sink. Bun's `tty.WriteStream` bypasses the overridden `_write`, preventing value
updates and echoing input instead of masking it. The regular stream keeps
readline updates working without sending secrets to the terminal. It is applied on install
and included automatically in the Bun release bundle. Keep it until an upstream
version passes `password-prompt.test.ts` without the patch.
