import { test, expect } from "@playwright/test";
import { WeighPage } from "@pages";
import { printWeighingSummary } from "@helpers";

test.describe("Weigh gold bars", async () => {
  test("locate the fake bar that weighs less", async ({ page }) => {
    const weighPage = new WeighPage(page);
    await weighPage.visit();

    const fakeGoldBar = await weighPage.findFakeBar();
    const dialogMessageText = await weighPage.clickFakeBar(fakeGoldBar);

    expect(dialogMessageText).toBe("Yay! You find it!");
    printWeighingSummary(dialogMessageText, fakeGoldBar,await weighPage.results().allInnerTexts());
  });
});
