import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const TARGETS = [
  { name: "ホーム", path: "/" },
  { name: "ブログ一覧", path: "/blog" },
  { name: "ブログ記事(代表)", path: "/blog/hello-rinotsuka" },
];

for (const t of TARGETS) {
  test(`a11y: ${t.name} (${t.path}) に critical / serious 違反が無い`, async ({
    page,
  }) => {
    await page.goto(t.path);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const blocking = result.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );

    if (blocking.length > 0) {
      console.error(
        "axe violations:",
        JSON.stringify(
          blocking.map((v) => ({
            id: v.id,
            impact: v.impact,
            help: v.help,
            nodes: v.nodes.length,
          })),
          null,
          2,
        ),
      );
    }

    expect(blocking).toEqual([]);
  });
}
