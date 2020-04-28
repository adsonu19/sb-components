import { ItemCardModel } from "../ItemCard/ItemCardModels";

export type HeaderType =
  | "Item"
  | "Claim/Target"
  | "Content"
  | "Subject"
  | "Grade"
  | "Item Type";

export enum SortDirection {
  NoSort = 0,
  Ascending = 1,
  Descending = -1
}

export interface HeaderSortModel {
  col: ColumnGroup;
  direction: SortDirection;
  resetSortCount: number;
}

export interface SortColumnModel {
  className: string;
  accessor: (label: ItemCardModel) => string | number;
  helpText?: (label: ItemCardModel) => string;
}

export interface ColumnGroup {
  header: HeaderType;
  headerClassName: string;
  cols: SortColumnModel[];
  compare: (a: ItemCardModel, b: ItemCardModel) => number;
  headerHelp?: string;
}

 // Logic for content standard
export function getContentStandard(ccssDescription:any, commonCoreStandardId:any, subjectCode:any, claimCode:any, flag_sendcommonCoreStanrdId:boolean) {
  if(subjectCode === 'MATH' && (claimCode == 'MATH2' || claimCode == 'MATH3' || claimCode == 'MATH4' )) {
    commonCoreStandardId = "Math Practice";
    ccssDescription = "Items in this claim primarily measure the Standards for Mathematical Practice rather than Content Standards.";
  }
  else if(ccssDescription === null || ccssDescription === undefined) {
    commonCoreStandardId = "Not Available"
    ccssDescription = "Content Standard information is currently unavailable for this item.";
  }
  if(flag_sendcommonCoreStanrdId)
    return commonCoreStandardId;
  else
    return ccssDescription;
}


export const headerColumns: ColumnGroup[] = [
  {
    header: "Item",
    headerClassName: "item",
    compare: (a, b) => a.itemKey - b.itemKey,
    cols: [
      {
        accessor: label => label.itemKey,
        className: "item"
      }
    ]
  },
  {
    header: "Subject",
    headerClassName: "subject",
    cols: [{ accessor: label => label.subjectLabel, className: "subject" }],
    compare: (a, b) => a.subjectCode.localeCompare(b.subjectCode)
  },
  {
    header: "Grade",
    headerClassName: "grade",
    cols: [
      {
        accessor: label => label.gradeLabel,
        className: "grade"
      }
    ],
    compare: (a, b) => a.grade - b.grade
  },
  {
    header: "Content",
    headerClassName: "content",
    cols: [
      {
        accessor: label => getContentStandard(label.ccssDescription, label.commonCoreStandardId, label.subjectCode, label.claimCode,true),
        className: "item",
        helpText: label => getContentStandard(label.ccssDescription, label.commonCoreStandardId, label.subjectCode, label.claimCode,false)
      }
    ],
    compare: (a, b) => {
      let direction;
      const commonCoreStandardId_1 = getContentStandard(a.ccssDescription, a.commonCoreStandardId, a.subjectCode, a.claimCode, true)
      const commonCoreStandardId_2 = getContentStandard(b.ccssDescription, b.commonCoreStandardId, b.subjectCode, b.claimCode,true);
      if(commonCoreStandardId_1 < commonCoreStandardId_2) {
        direction = SortDirection.Ascending;
      }
      else if(commonCoreStandardId_1 < commonCoreStandardId_2) {
        direction = SortDirection.Descending;
      }
      else {
        direction = SortDirection.NoSort;
      }
      return direction;
    }
  },
  {
    header: "Claim/Target",
    headerClassName: "claimAndTarget",
    cols: [
      {
        accessor: card => card.claimLabel,
        className: "claim"
      },
      {
        accessor: card => card.targetId,
        className: "target",
        helpText: card => card.targetDescription
      }
    ],
    compare: (a, b) => {
      let direction;
      if (a.claimCode < b.claimCode || a.targetId < b.targetId) {
        direction = SortDirection.Ascending;
      } else if (a.claimCode > b.claimCode || a.targetId > b.targetId) {
        direction = SortDirection.Descending;
      } else {
        direction = SortDirection.NoSort;
      }

      return direction;
    }
  },
  {
    header: "Item Type",
    headerClassName: "item-type",
    cols: [
      {
        accessor: label => label.interactionTypeLabel,
        className: "item-type"
      }
    ],
    compare: (a, b) =>
      a.interactionTypeCode.localeCompare(b.interactionTypeCode)
  }
];
