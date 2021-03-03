import { mount } from "@vue/test-utils";
import click from "@/components/click.vue";

describe("test click componet", () => {
  test("should be hello vue", () => {
    const clickTest = mount(click);

    const res = clickTest.find('[d-TestId="title"]');
    console.log(res.text());

    expect(res.text()).toContain("Hello vue");
  });

  test.only("should click", async () => {
    const clickTest = mount(click);

    await clickTest.find("button").trigger("click");

    expect(clickTest.find('[d-TestId="count"]').text()).toBe("1");
  });
});
