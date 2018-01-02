import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PdfDecorator } from "../PdfDecorator";
import { EvidenceStatement, ItemCardTable } from "src/index";
import { completeItemCard } from "mocks/ItemCard/mocks";
import "src/Assets/Styles/pdf.less";

storiesOf("PDF Item Metadata", module)
  .addDecorator(PdfDecorator)
  .add("Evidence Statement", () => (
    <EvidenceStatement statement="This is the evidence statement" />
  ))
  .add("Item Card Table", () => <ItemCardTable card={completeItemCard} />);
