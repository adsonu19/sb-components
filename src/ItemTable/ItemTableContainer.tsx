import "../Assets/Styles/score-page.less";
import * as React from "react";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { AboutItemModel } from "../AboutItem/AboutItemModels";
import { Resource } from "../ApiModel";
import {
  HeaderSortModel,
  SortColumnModel,
  SortDirection,
  headerColumns
} from "./ItemTableModels";
import { HeaderTable } from "./HeaderTable";
import { ItemTable } from "./ItemTable";

/**
 * Properties for ItemTableContainer
 * @interface ItemTableContainerProps
 */
export interface ItemTableContainerProps {
  onRowSelection: (
    item: { itemKey: number; bankKey: number },
    reset: boolean
  ) => void;
  itemCards?: ItemCardModel[];
  item: Resource<AboutItemModel>;
}

/**
 * State object interface for ItemTableContainer
 * @interface ItemTableContainerState
 */
export interface ItemTableContainerState {
  sorts: HeaderSortModel[];
  selectedRow?: ItemCardModel;
}
/**
 * Container for a table of Items that can be sorted by clicking on a table header.
 * When an item is clicked, it displays an iframe of that question.
 */
export class ItemTableContainer extends React.Component<
  ItemTableContainerProps,
  ItemTableContainerState
> {
  private pageHeaderColumns = headerColumns;

  constructor(props: ItemTableContainerProps) {
    super(props);
    this.state = {
      sorts: []
    };
  }

  /**
   * On header click, the column that was clicked will be added to the
   * sorts array in state or its sort status will be removed.
   * @memberOf {ItemTableContainer}
   * @function {onClickHeader}
   * @param {SortColumnModel} col
   */
  onClickHeader = (col: SortColumnModel) => {
    const newSorts = (this.state.sorts || []).slice();
    // find the index of the
    const headIdx = newSorts.findIndex(hs => hs.col.header === col.header);
    if (headIdx !== -1) {
      const newSort = Object.assign({}, newSorts[headIdx]);
      if (newSort.direction == SortDirection.Ascending) {
        newSort.direction = SortDirection.Descending;
      } else if (newSort.direction == SortDirection.Descending) {
        newSort.direction = SortDirection.NoSort;
      } else {
        newSort.direction = SortDirection.Ascending;
      }
      newSorts[headIdx] = newSort;
    } else {
      const newSort: HeaderSortModel = {
        col: col,
        direction: SortDirection.Ascending,
        resetSortCount: 0
      };
      newSorts.push(newSort);
    }
    this.setState({ sorts: newSorts });
  };

  /**
   * Sets the state with the currently selected item or removes
   * the selection from the item and removes it from state.
   * @function {onSelectItem}
   * @param {ItemCardModel} item
   */
  onSelectItem = (item: ItemCardModel) => {
    const card = { itemKey: item.itemKey, bankKey: item.bankKey };
    if (item === this.state.selectedRow) {
      this.props.onRowSelection(card, true);
      this.setState({ selectedRow: undefined });
    } else {
      this.props.onRowSelection(card, false);
      this.setState({ selectedRow: item });
    }
  };
  /**
   * Sorts two ItemCardModels on the property specified by the sort parameter
   * @param {HeaderSortModel} sort
   * @param {ItemCardModel} lhs
   * @param {ItemCardModel} rhs
   */
  invokeMultiSort(
    sort: HeaderSortModel,
    lhs: ItemCardModel,
    rhs: ItemCardModel
  ): number {
    return sort.col.compare(lhs, rhs) * sort.direction;
  }
  /**
   * Sorts the data that is shown in the table on each of the 'sorts' that are
   * stored in state.
   * @function {getTableData}
   */
  getTableData = (): ItemCardModel[] | undefined => {
    const sorts = this.state.sorts || [];
    let itemCards = this.props.itemCards || [];
    sorts.forEach(sort => {
      itemCards = itemCards.sort((lhs, rhs) =>
        this.invokeMultiSort(sort, lhs, rhs)
      );
    });
    return itemCards;
  };

  /**
   * Renders the HeaderTable component, the header to the ItemTable
   * @function {renderTableHeader}
   */
  renderTableHeader() {
    return (
      <HeaderTable
        sorts={this.state.sorts}
        onHeaderClick={this.onClickHeader}
        columns={this.pageHeaderColumns}
      />
    );
  }

  /**
   * Renders the ItemTable component
   * @function {renderTable}
   */
  renderTable() {
    const itemCards = this.getTableData(); //this returns undefined but in the method it has data. that's w
    let content = (
      <span className="placeholder-text" role="alert">
        No results found for the given search terms.
      </span>
    );
    if (itemCards != undefined) {
      //if no items are returned we want to return a friendly message
      if (itemCards.length !== 0) {
        content = (
          <ItemTable
            mapRows={itemCards}
            rowOnClick={this.onSelectItem}
            sort={this.state.sorts}
            columns={this.pageHeaderColumns}
            selectedRow={this.state.selectedRow}
            item={this.props.item}
          />
        );
      }
    }
    return content;
  }

  render() {
    return (
      <div>
        <table className="item-table">
          {this.renderTableHeader()}
          {this.renderTable()}
        </table>
      </div>
    );
  }
}