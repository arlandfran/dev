interface Segment {
  name: string;
  href: string;
  isLast: boolean;
}

interface ListElement {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

interface BreadcrumbList {
  "@context": string;
  "@type": string;
  itemListElement: ListElement[];
}

function normalizeName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getSegments(pathname: string): Segment[] {
  const parts = pathname === "/" ? [] : pathname.split("/").filter(Boolean);
  return [
    ...parts.map((part, index) => {
      const href = "/" + parts.slice(0, index + 1).join("/");
      return { name: part, href, isLast: index === parts.length - 1 };
    }),
  ];
}

export function buildBreadcrumbListJsonLd(pathname: string): BreadcrumbList {
  const segments = getSegments(pathname);
  const base = import.meta.env.SITE.replace(/\/+$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: base,
      },
      ...segments.map(
        (segment, index): ListElement => ({
          "@type": "ListItem",
          position: index + 2,
          name: normalizeName(segment.name),
          item: new URL(segment.href, base).toString(),
        }),
      ),
    ],
  };
}
