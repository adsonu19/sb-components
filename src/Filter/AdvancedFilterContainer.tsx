import * as React from "react";
import "../Assets/Styles/advanced-filter.less";
import { AdvancedFilter } from "./AdvancedFilter";
import {
  onFilterSelect,
  AdvancedFilterCategoryModel,
  AdvancedFiltersModel,
  FilterOptionModel,
  OptionTypeModel
} from "./FilterModels";

/**
 * AdvancedFilterContainer props
 * @interface AdvancedFilterContainerProps
 * @member {AdvancedFilterCategoryModel[]} filterOptions
 * @member {(selected: AdvancedFilterCategoryModel[]) => void} onUpdateFilterOptions
 * @member {boolean} isNested
 * @member {string?} pageTitle
 */
export interface AdvancedFilterContainerProps {
  filterCategories: AdvancedFilterCategoryModel[];
  onUpdateFilter: (selected: AdvancedFilterCategoryModel[] | undefined) => void;
  isNested?: boolean;
  pageTitle?: string;
}
/**
 * AdvancedFilterContainer state
 * @interface AdvancedFilterContainerState
 * @member {boolean} expanded
 */
export interface AdvancedFilterContainerState {
  expanded: boolean;
}

/**
 * The AdvancedFilterContainer is a collapsible menu that displays AdvancedFilters
 * that, when clicked, calls `this.props.onClick()`
 * @class AdvancedFilterContainer
 * @extends {React.Component<AdvancedFilterContainerProps, AdvancedFilterContainerState>}
 */
export class AdvancedFilterContainer extends React.Component<
  AdvancedFilterContainerProps,
  AdvancedFilterContainerState
> {
  constructor(props: AdvancedFilterContainerProps) {
    super(props);
    this.state = {
      expanded: this.props.isNested ? true : false
    };
  }

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleFilterSelect(
    category: AdvancedFilterCategoryModel,
    option?: FilterOptionModel
  ) {
    const { onUpdateFilter, filterCategories } = this.props;
    const newFilters = onFilterSelect(filterCategories, category, option);
    onUpdateFilter(newFilters);
  }

  /**
   * Resets each of the filter options for each category.
   */
  resetFilters() {
    const { filterCategories } = this.props;
    filterCategories.forEach(cat =>
      cat.filterOptions.forEach(fo => (fo.isSelected = false))
    );
    this.props.onUpdateFilter(filterCategories);
  }

  /**
   * Returns true if one or more filter options are selected in any filter category.
   * False if otherwise
   */
  hasActiveFilterIndicators() {
    const { filterCategories } = this.props;
    let active = false;
    filterCategories.forEach(cat => {
      if (!cat.disabled) {
        cat.filterOptions.forEach(opt => {
          if (opt.isSelected) {
            active = true;
          }
        });
      }
    });

    return active;
  }

  /**
   * Builds and returns a list of JSX.Elements that shows which filter
   * options are currently selected
   */
  renderSelectedFilterIndicators() {
    const { filterCategories } = this.props;
    const tags: JSX.Element[] = [];

    filterCategories.forEach(cat => {
      if (!cat.disabled) {
        cat.filterOptions.forEach(opt => {
          if (opt.isSelected) {
            tags.push(
              <div
                className="btn btn-blue filter-btn filter-selection"
                key={cat.label + opt.key}
              >
                <strong>{cat.label}&nbsp;</strong>
                {opt.label}&nbsp;
                <span
                  onClick={() => this.handleFilterSelect(cat, opt)}
                  className="fa fa-times-circle fa-small"
                />
              </div>
            );
          }
        });
      }
    });

    return <div className="filter-status">{tags}</div>;
  }

  /**
   * Renders the array of filter categories and their respective filter options.
   */
  renderFilterCategories() {
    const { filterCategories } = this.props;
    const filterCats = filterCategories.map((category, i) => {
      return (
        <AdvancedFilter
          key={i}
          {...category}
          onFilterOptionSelect={opt => this.handleFilterSelect(category, opt)}
        />
      );
    });

    return (
      <div
        className="filter-body"
        aria-live="polite"
        aria-relevant="additions removals"
      >
        {filterCats}
      </div>
    );
  }

  /**
   * Renders teh reset button
   */
  renderResetButton(): JSX.Element | undefined {
    let content: JSX.Element | undefined;
    if (this.hasActiveFilterIndicators()) {
      content = (
        <button
          onClick={() => this.resetFilters()}
          className="btn btn-white filter-reset-btn "
        >
          Reset Filters
        </button>
      );
    }

    return content;
  }

  /**
   * Renders the button that, when clicked, expands or collapses the advanced filter.
   */
  renderExpandButton() {
    const { expanded } = this.state;
    const className = expanded ? "fa fa-chevron-down" : "fa fa-chevron-right";
    const buttonText = expanded ? "Collapse " : "Expand ";

    return (
      <button
        onClick={() => this.handleClick()}
        className="btn btn-white filter-expand-btn"
      >
        {buttonText}
        <span className={className} />
      </button>
    );
  }

  /**
   * Renders the page title.
   */
  renderPageTitle(): JSX.Element | undefined {
    let content: JSX.Element | undefined;
    if (this.props.pageTitle) {
      content = (
        <h1>
          <span className="filter-page-title">{this.props.pageTitle}</span>
        </h1>
      );
    }

    return content;
  }
  /**
   * Renders the portion of the Advanced filter container that will always be visible
   * and dictates expansion of the filter menu, essentially the 'header' of the component.
   */
  renderCollapsedFilterContainer(): JSX.Element {
    return (
      <div className="filter-sub-header-container">
        {this.renderPageTitle()}
        <div className="filter-advanced-filter-header">
          <div className="filter-advanced-filter-title">
            <h3>
              <span className="fa fa-tasks" />&nbsp;Advanced Filters
            </h3>
          </div>
          <div className="adv-control-btns">
            {this.renderResetButton()}
            {this.renderExpandButton()}
          </div>
        </div>
        {this.renderSelectedFilterIndicators()}
      </div>
    );
  }

  /**
   * Render the expanded filter container
   */
  renderExpanded(): JSX.Element | undefined {
    if (this.state.expanded) {
      return (
        <div className="advanced-filter-container-expanded">
          {this.renderFilterCategories()}
        </div>
      );
    }
    return undefined;
  }

  render() {
    return (
      <div className="advanced-filter-container">
        {this.renderCollapsedFilterContainer()}
        {this.renderExpanded()}
      </div>
    );
  }
}
