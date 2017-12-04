import { ItemTableProps } from "../../src/ItemTable/ItemTable";
import { ItemTableContainerProps } from "../../src/ItemTable/ItemTableContainer";

export const itemTableProps: ItemTableContainerProps = {
  onRowSelection: () => {},
  itemCards: [
    {
      bankKey: 187,
      itemKey: 3206,
      title: "Math Grade 6 Claim 1",
      grade: 8,
      gradeLabel: "Grade 6",
      subjectCode: "MATH",
      subjectLabel: "Math",
      claimCode: "MATH1",
      claimLabel: "Concepts and Procedures",
      targetHash: 100,
      targetId: "A",
      targetShortName: "",
      interactionTypeCode: "EQ",
      interactionTypeLabel: "Equation",
      isPerformanceItem: true,
      brailleOnlyItem: false
    },
    {
      bankKey: 187,
      itemKey: 3163,
      title: "ELA/ literacy Grade 3 Claim 1",
      grade: 1,
      gradeLabel: "Grade 3",
      subjectCode: "ELA",
      subjectLabel: "ELA/literacy",
      claimCode: "ELA1",
      claimLabel: "Reading",
      targetHash: 1039,
      targetId: "B",
      targetShortName: "Key Details",
      interactionTypeCode: "MC",
      interactionTypeLabel: "Multiple Choice",
      isPerformanceItem: true,
      brailleOnlyItem: false
    },
    {
      bankKey: 187,
      itemKey: 3615,
      title: "Math Grade 6 Claim 4",
      grade: 8,
      gradeLabel: "Grade 6",
      subjectCode: "MATH",
      subjectLabel: "Math",
      claimCode: "MATH4",
      claimLabel: "Modeling/Data Analysis",
      targetHash: 0,
      targetId: "C",
      targetShortName: "",
      interactionTypeCode: "MS",
      interactionTypeLabel: "Multi Select",
      isPerformanceItem: false,
      brailleOnlyItem: false
    },
    {
      bankKey: 187,
      itemKey: 2928,
      title: "ELA/ literacy Grade 4 Claim 4",
      grade: 2,
      gradeLabel: "Grade 4",
      subjectCode: "ELA",
      subjectLabel: "ELA/literacy",
      claimCode: "ELA4",
      claimLabel: "Research/Inquiry",
      targetHash: 2832,
      targetId: "D",
      targetShortName: "Evaluate Information/ sources",
      interactionTypeCode: "MS",
      interactionTypeLabel: "Multi Select",
      isPerformanceItem: false,
      brailleOnlyItem: false
    }
  ],
  item: {
    kind: "none"
  }
};

export const itemTableSortProps: ItemTableContainerProps = {
  onRowSelection: () => {},
  itemCards: [
    {
      bankKey: 187,
      itemKey: 1,
      title: "alpha",
      grade: 5,
      gradeLabel: "Grade 5",
      subjectCode: "MATH",
      subjectLabel: "Math",
      claimCode: "MATH1",
      claimLabel: "Alpha",
      targetHash: 1,
      targetId: "A",
      targetShortName: "",
      interactionTypeCode: "EQ",
      interactionTypeLabel: "Equation",
      isPerformanceItem: true,
      brailleOnlyItem: false
    },
    {
      bankKey: 187,
      itemKey: 2,
      title: "bravo",
      grade: 4,
      gradeLabel: "Grade 4",
      subjectCode: "ELA",
      subjectLabel: "ELA/literacy",
      claimCode: "ELA1",
      claimLabel: "Bravo",
      targetHash: 2,
      targetId: "B",
      targetShortName: "",
      interactionTypeCode: "MC",
      interactionTypeLabel: "Multiple Choice",
      isPerformanceItem: true,
      brailleOnlyItem: false
    },
    {
      bankKey: 187,
      itemKey: 3,
      title: "charlie",
      grade: 3,
      gradeLabel: "Grade 3",
      subjectCode: "MATH",
      subjectLabel: "Math",
      claimCode: "MATH4",
      claimLabel: "Charlie",
      targetHash: 3,
      targetId: "C",
      targetShortName: "",
      interactionTypeCode: "MS",
      interactionTypeLabel: "Multi Select",
      isPerformanceItem: false,
      brailleOnlyItem: false
    },
    {
      bankKey: 187,
      itemKey: 4,
      title: "delta",
      grade: 2,
      gradeLabel: "Grade 2",
      subjectCode: "ELA",
      subjectLabel: "ELA/literacy",
      claimCode: "ELA4",
      claimLabel: "Delta",
      targetHash: 4,
      targetId: "D",
      targetShortName: "",
      interactionTypeCode: "MS",
      interactionTypeLabel: "Multi Select",
      isPerformanceItem: false,
      brailleOnlyItem: false
    }
  ],
  item: {
    kind: "none"
  }
};
