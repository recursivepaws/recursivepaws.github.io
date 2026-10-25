import { Archive, Download, ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";

// `links` is a plain url[] in Sanity, so label and icon come from the URL itself
function describe(href: string) {
  const url = new URL(href);
  const host = url.hostname.replace(/^www\./, "");
  const file = url.searchParams.get("dl");

  if (host === "github.com") {
    return { Icon: Github, label: "GitHub" };
  }
  if (file) {
    const ext = file.split(".").pop()?.toUpperCase();
    return { Icon: Download, label: ext ? `Download ${ext}` : "Download" };
  }
  if (host === "web.archive.org") {
    return { Icon: Archive, label: "Archived site" };
  }
  return { Icon: ExternalLink, label: host };
}

export function LinkButtons({ links }: { links: string[] }) {
  // Studio lets empty entries through (two posts have "")
  const valid = links.filter((href) => URL.canParse(href));
  if (!valid.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {valid.map((href) => {
        const { Icon, label } = describe(href);
        return (
          <Button key={href} asChild variant="outline" size="sm">
            <a href={href}>
              <Icon aria-hidden="true" />
              {label}
            </a>
          </Button>
        );
      })}
    </div>
  );
}
