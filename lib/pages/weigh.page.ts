import { Locator, Page } from "@playwright/test";
import { findArrayWhichHasFakeBar, WeightBars, splitArray } from "@helpers"

export class WeighPage {
  readonly weighButton = this.page.getByRole("button", { name: "Weigh" });
  readonly resetButton = this.page.getByRole("button", { name: "Reset" });
  
  barAtIndex(index: number): Locator {
    return this.page.locator(`#coin_${index}`);
  }

  barInBowlAtIndex(bowlSide: "left" | "right", index: number): Locator {
    return this.page.locator(`#${bowlSide}_${index}`);
  }

  results(): Locator {
    return this.page.locator("ol > li")
  }

  resultsRow(row: number): Locator {
    return this.results().nth(row);
  }

  constructor(private readonly page: Page) {}

  visit() {
    this.page.goto("/");
  }

  async fillBowlWithBars(bars: number[], bowlSide: "left" | "right") {
    for (let i = 0; i < bars.length; i++) {
      await this.barInBowlAtIndex(bowlSide, i).fill(`${bars[i]}`);
    }
  }

  async weighBowls(leftBowlBars: number[], rightBowlBars: number[]) {
    await this.resetButton.click();
    await this.fillBowlWithBars(leftBowlBars, "left");
    await this.fillBowlWithBars(rightBowlBars, "right");
    await this.weighButton.click();
  }

  async findFakeBar() {
    await this.resetButton.click();
    let arrayWithFakeBar = WeightBars
    let lastBar = WeightBars.pop();
    
    let [left, right] = splitArray(WeightBars);
    let result = await this.executeWeightCheck(left, right);
    
    if (result.includes("=")) {
      return lastBar;
    }

    while (arrayWithFakeBar.length > 2) {
      arrayWithFakeBar = await findArrayWhichHasFakeBar(result);
      [left, right] = splitArray(arrayWithFakeBar);
      result = await this.executeWeightCheck(left, right);
    }
    
    arrayWithFakeBar = await findArrayWhichHasFakeBar(result);
    return await arrayWithFakeBar[0];
  }

  async executeWeightCheck(left: number[], right: number[]) {
    const resultRow = await this.results().count();
    await this.weighBowls(left, right);
    return await this.resultsRow(resultRow).innerText();
  }

  async clickFakeBar(index: number): Promise<string> {
    const dialogMessagePromise = new Promise<string>((resolve) => {
      this.page.once("dialog", async (dialog) => {
        const message = dialog.message();
        await dialog.dismiss();
        resolve(message);
      });
    });

    await this.barAtIndex(index).click();
    return await dialogMessagePromise;
  }
}
