import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page before each test
    await page.goto("/");
  });

  test("should display all navigation buttons", async ({ page }) => {
    // Check "Write" button
    await expect(page.getByText("Write")).toBeVisible();

    // Check "Sign in" button
    await expect(page.getByText("Sign in")).toBeVisible();

    // Check "Get Started" button
    await expect(page.getByText("Get Started")).toBeVisible();

    // Check "Start Reading" button
    await expect(
      page.getByRole("button", { name: "Start Reading" })
    ).toBeVisible();
  });

  test("should display footer with all links", async ({ page }) => {
    // Check if footer exists
    const footer = page.locator(".footer");
    await expect(footer).toBeVisible();

    // Check specific footer links
    const expectedLinks = [
      { text: "Status", href: "https://medium.statuspage.io/" },
      { text: "About", href: "https://about.medium.com" },
      { text: "Privacy", href: "https://medium.com/policy/privacy-policy" },
      { text: "Terms", href: "https://medium.com/policy/terms-of-service" },
    ];

    for (const link of expectedLinks) {
      const linkElement = page.getByRole("link", { name: link.text });
      await expect(linkElement).toBeVisible();
      await expect(linkElement).toHaveAttribute("href", link.href);
    }
  });

  test("responsive design - mobile view", async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 390, height: 844 });

    // Hidden elements in mobile
    await expect(page.getByText("Write")).not.toBeVisible();
    await expect(page.getByText("Sign in")).not.toBeVisible();

    // Visible elements in mobile
    await expect(page.getByText("Get Started")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Start Reading" })
    ).toBeVisible();

    // Check if certain footer links are hidden on mobile
    await expect(page.getByRole("link", { name: "Help" })).not.toBeVisible();
    await expect(page.getByRole("link", { name: "Blog" })).not.toBeVisible();
  });
});
