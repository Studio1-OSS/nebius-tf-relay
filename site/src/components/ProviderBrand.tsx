export function ProviderBrand({ provider }: { provider: "nebius" | "tavily" }) {
  const nebius = provider === "nebius";
  return (
    <a
      className="provider-brand"
      href={nebius ? "https://tokenfactory.nebius.com" : "https://tavily.com"}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={nebius ? "/nebius-token-factory-mark.png" : "/tavily-icon.png"}
        width="36"
        height="36"
        alt=""
      />
      <span>
        <small>{nebius ? "Models powered by" : "Web search powered by"}</small>
        <strong>{nebius ? "Nebius Token Factory" : "Tavily"}</strong>
      </span>
    </a>
  );
}
