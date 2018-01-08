// Copyright (C) 2017, Stefan Kloppenborg
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

export const referenceFields = [
  {
    field: "id",
    hint: "the identification of the reference (not part of CSL)"
  },
  {
    field: "type", type: "TYPE",
    hint: "the type of the reference (ie. article, book, etc.)"
  },
  {
    field: "number",
    hint: "number identifying the item (e.g. a report number)"
  },
  {
    field: "author", type: "NAME",
    hint: "author"
  },
  {
    field: "composer", type: "NAME",
    hint: "composer (e.g. of a musical score)"
  },
  {
    field: "director", type: "NAME",
    hint: "director (e.g. of a film)"
  },
  {
    field: "editor", type: "NAME",
    hint: "editor"
  },
  {
    field: "editorial-director", type: "NAME",
    hint: "managing editor (“Directeur de la Publication” in French)"
  },
  {
    field: "illustrator", type: "NAME",
    hint: "illustrator (e.g. of a children’s book)"
  },
  {
    field: "interviewer", type: "NAME",
    hint: "interviewer (e.g. of an interview)"
  },
  {
    field: "recipient", type: "NAME",
    hint: "recipient (e.g. of a letter)"
  },
  {
    field: "translator", type: "NAME",
    hint: "translator"
  },
  {
    field: "title",
    hint: "primary title of the item"
  },
  {
    field: "title-short",
    hint: "short/abbreviated form of “title” (also accessible through the “short” form of the “title” variable)"
  },
  {
    field: "edition",
    hint: "(container) edition holding the item (e.g. “3” when citing a chapter in the third edition of a book)"
  },
  {
    field: "abstract", type: 'TEXT_AREA',
    hint: "abstract of the item (e.g. the abstract of a journal article)"
  },
  {
    field: "annote",
    hint: "reader’s notes about the item content"
  },
  {
    field: "note",
    hint: "(short) inline note giving additional item details (e.g. a concise summary or commentary)"
  },
  {
    field: "container-author", type: "NAME",
    hint: "author of the container holding the item (e.g. the book author for a book chapter)"
  },
  {
    field: "container-title",
    hint: "title of the container holding the item " +
    "(e.g. the book title for a book chapter, the journal title for a journal article)"
  },
  {
    field: "container-title-short",
    hint: "short/abbreviated form of “container-title” " +
    "(also accessible through the “short” form of the “container-title” variable)"
  },
  {
    field: "container", type: "DATE",
    hint: "?"
  },
  {
    field: "volume",
    hint: "(container) volume holding the item (e.g. “2” when citing a chapter from book volume 2)"
  },
  {
    field: "issue",
    hint: "(container) issue holding the item (e.g. “5” when citing a journal article from journal volume 2, issue 5)"
  },
  {
    field: "section",
    hint: "container section holding the item (e.g. “politics” for a newspaper article)"
  },
  {
    field: "page",
    hint: "range of pages the item (e.g. a journal article) covers in a container (e.g. a journal issue)"
  },
  {
    field: "page-first",
    hint: "first page of the range of pages the item (e.g. a journal article) covers in a container " +
    "(e.g. a journal issue)"
  },
  {
    field: "publisher",
    hint: "publisher"
  },
  {
    field: "publisher-place",
    hint: "geographic location of the publisher"
  },
  {
    field: "issued", type: "DATE",
    hint: "date the item was issued/published"
  },
  {
    field: "submitted", type: "DATE",
    hint: "date the item (e.g. a manuscript) has been submitted for publication"
  },
  {
    field: "chapter-number",
    hint: "chapter number"
  },
  {
    field: "collection-editor", type: "NAME",
    hint: "editor of the collection holding the item (e.g. the series editor for a book)"
  },
  {
    field: "collection-title",
    hint: "title of the collection holding the item (e.g. the series title for a book)"
  },
  {
    field: "collection-number",
    hint: "number identifying the collection holding the item (e.g. the series number for a book)"
  },
  {
    field: "accessed", type: "DATE",
    hint: "date the item has been accessed"
  },
  {
    field: "event",
    hint: "name of the related event (e.g. the conference name when citing a conference paper)"
  },
  {
    field: "event-place",
    hint: "geographic location of the related event (e.g. “Amsterdam, the Netherlands”)"
  },
  {
    field: "event-date", type: "DATE",
    hint: "date the related event took place"
  },
  {
    field: "genre",
    hint: "class, type or genre of the item (e.g. “adventure” for an adventure movie, " +
    "“PhD dissertation” for a PhD thesis)"
  },
  {
    field: "authority",
    hint: "issuing or judicial authority (e.g. “USPTO” for a patent, “Fairfax Circuit Court” for a legal case)"
  },
  {
    field: "jurisdiction",
    hint: "geographic scope of relevance (e.g. “US” for a US patent)"
  },
  {
    field: "original-author", type: "NAME",
    hint: "?"
  },
  {
    field: "original-title",
    hint: "title of the original version (e.g. “Война и мир”, the untranslated Russian title of “War and Peace”)"
  },
  {
    field: "original-date", type: "DATE",
    hint: "(issue) date of the original version"
  },
  {
    field: "original-publisher",
    hint: "original publisher, for items that have been republished by a different publisher"
  },
  {
    field: "original-publisher-place",
    hint: "geographic location of the original publisher (e.g. “London, UK”)"
  },
  {
    field: "references",
    hint: "resources related to the procedural history of a legal case"
  },
  {
    field: "status",
    hint: "publication) status of the item (e.g. “forthcoming”)"
  },
  {
    field: "version",
    hint: "version of the item (e.g. “2.0.9” for a software program)"
  },
  {
    field: "number-of-pages",
    hint: "total number of pages of the cited item"
  },
  {
    field: "number-of-volumes",
    hint: "total number of volumes, usable for citing multi-volume books and such"
  },
  {
    field: "reviewed-author", type: "NAME",
    hint: "author of the item reviewed by the current item"
  },
  {
    field: "reviewed-title",
    hint: "title of the item reviewed by the current item"
  },
  {
    field: "scale",
    hint: "scale of e.g. a map"
  },
  {
    field: "dimensions",
    hint: "physical (e.g. size) or temporal (e.g. running time) dimensions of the item"
  },
  {
    field: "archive",
    hint: "archive storing the item"
  },
  {
    field: "archive_location",
    hint: "storage location within an archive (e.g. a box and folder number)"
  },
  {
    field: "archive-place",
    hint: "geographic location of the archive"
  },
  {
    field: "source",
    hint: "from whence the item originates (e.g. a library catalog or database)"
  },
  {
    field: "locator",
    hint: "a cite-specific pinpointer within the item (e.g. a page number within a book, or a volume in a " +
    "multi-volume work). Must be accompanied in the input data by a label indicating the locator type (see the " +
    "Locators term list), which determines which term is rendered by cs:label when the “locator” variable is " +
    "selected."
  },
  {
    field: "DOI",
    hint: "Digital Object Identifier (e.g. “10.1128/AEM.02591-07”)"
  },
  {
    field: "ISBN",
    hint: "International Standard Book Number"
  },
  {
    field: "ISSN",
    hint: "International Standard Serial Number"
  },
  {
    field: "PMCID",
    hint: "PubMed Central reference number"
  },
  {
    field: "PMID",
    hint: "PubMed reference number"
  },
  {
    field: "call-number",
    hint: "call number (to locate the item in a library)"
  },
  {
    field: "keyword",
    hint: "keyword(s) or tag(s) attached to the item"
  },
  {
    field: "medium",
    hint: "medium description (e.g. “CD”, “DVD”, etc.)"
  },
  {
    field: "URL",
    hint: "Uniform Resource Locator (e.g. “http://aem.asm.org/cgi/content/full/74/9/2766”)"
  },
  {
    field: "file",
    type: "FILE",
    hint: "the file linked with this reference entity"
  },
];

export default referenceFields;
