import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import * as TestUtils from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { AboutTestItemsContainer } from "../AboutTestItemsContainer";
import {
  mockAboutTestClient,
  mockAboutTestClientLoading,
  mockAboutTestClientReject,
  aboutTestMatch,
  aboutTestPath,
  aboutTestBadItem
} from "mocks/AboutTestItems/mocks";
import { AboutItem, ItemViewerFrame, Select } from "src/index";

describe("AboutTestItemsContainer", () => {
  const wrapper = shallow(
    <AboutTestItemsContainer
      showRubrics={true}
      aboutClient={mockAboutTestClient}
      params={{}}
    />
  );

  it("default render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  // TODO: Add test for checking select options and changing
  // it("select options", () => {
  //   const select = wrapper.filterWhere(node => node.type() === Select);

  //   expect(select.children()).toHaveLength(3);
  // });

  it("about item modal", () => {
    const aboutItem = wrapper.findWhere(node => node.type() === AboutItem);
    expect(aboutItem).toBeDefined();
    expect(aboutItem).toMatchSnapshot();
  });
  it("item frame", () => {
    const itemFrame = wrapper.findWhere(
      node => node.type() === ItemViewerFrame
    );
    expect(itemFrame).toBeDefined();
    expect(itemFrame).toMatchSnapshot();
  });
});