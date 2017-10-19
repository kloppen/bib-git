import references from "./references"

describe("references reducer", () => {
  it("should handle IMPORT_BIBLATEX for empty state", () => {
    expect(
      references([], {
        type: "IMPORT_BIBLATEX",
        data: [{id: "testID", title: "test title"}]
      })
    ).toEqual([
      {id: "testID", title: "test title"}
    ])
  });

  it("should handle IMPORT_BIBLATEX and disambiguate IDs", () => {
    expect(
      references([
        {id: "testID", title: "test title 1"},
        {id: "testID", title: "test title 2"}
        ], {
        type: "IMPORT_BIBLATEX",
        data: [
          {id: "testID", title: "test title 3"},
          {id: "testID", title: "test title 4"}
          ]
      })
    ).toEqual([
      {id: "testID", title: "test title 1"},
      {id: "testID1", title: "test title 2"},
      {id: "testID11", title: "test title 3"},
      {id: "testID111", title: "test title 4"}
    ])
  });
});
