import React from 'react'
import PropTypes from 'prop-types'
import Editable from './Editable'
import AuthorList from './AuthorsList'
import { editReference, showCitation } from "../actions/index";
import { connect } from 'react-redux'

const referenceFields = [
  {field: "abstract", isTextArea: true, hint: "abstract of the item (e.g. the abstract of a journal article)"},
  {field: "annote", hint: "reader’s notes about the item content"},
  {field: "archive", hint: "archive storing the item"},
  {field: "archive_location", hint: "storage location within an archive (e.g. a box and folder number)"},
  {field: "archive-place", hint: "geographic location of the archive"},
  {field: "authority",
    hint: "issuing or judicial authority (e.g. “USPTO” for a patent, “Fairfax Circuit Court” for a legal case)"},
  {field: "call-number", hint: "call number (to locate the item in a library)"},
  {field: "collection-title", hint: "title of the collection holding the item (e.g. the series title for a book)"},
  {field: "container-title",
    hint: "title of the container holding the item " +
    "(e.g. the book title for a book chapter, the journal title for a journal article)"},
  {field: "container-title-short",
    hint: "short/abbreviated form of “container-title” " +
    "(also accessible through the “short” form of the “container-title” variable)"},
  {field: "dimensions", hint: "physical (e.g. size) or temporal (e.g. running time) dimensions of the item"},
  {field: "DOI", hint: "Digital Object Identifier (e.g. “10.1128/AEM.02591-07”)"},
  {field: "event", hint: "name of the related event (e.g. the conference name when citing a conference paper)"},
  {field: "event-place", hint: "geographic location of the related event (e.g. “Amsterdam, the Netherlands”)"},
  {field: "genre",
    hint: "class, type or genre of the item (e.g. “adventure” for an adventure movie, " +
    "“PhD dissertation” for a PhD thesis)"},
  {field: "ISBN", hint: "International Standard Book Number"},
  {field: "ISSN", hint: "International Standard Serial Number"},
  {field: "jurisdiction", hint: "geographic scope of relevance (e.g. “US” for a US patent)"},
  {field: "keyword", hint: "keyword(s) or tag(s) attached to the item"},
  {field: "locator",
    hint: "a cite-specific pinpointer within the item (e.g. a page number within a book, or a volume in a " +
    "multi-volume work). Must be accompanied in the input data by a label indicating the locator type (see the " +
    "Locators term list), which determines which term is rendered by cs:label when the “locator” variable is " +
    "selected."},
  {field: "medium", hint: "medium description (e.g. “CD”, “DVD”, etc.)"},
  {field: "note", hint: "(short) inline note giving additional item details (e.g. a concise summary or commentary)"},
  {field: "original-publisher",
    hint: "original publisher, for items that have been republished by a different publisher"},
  {field: "original-publisher-place", hint: "geographic location of the original publisher (e.g. “London, UK”)"},
  {field: "original-title",
    hint: "title of the original version (e.g. “Война и мир”, the untranslated Russian title of “War and Peace”)"},
  {field: "page", hint: "range of pages the item (e.g. a journal article) covers in a container (e.g. a journal issue)"},
  {field: "page-first",
    hint: "first page of the range of pages the item (e.g. a journal article) covers in a container " +
    "(e.g. a journal issue)"},
  {field: "PMCID", hint: "PubMed Central reference number"},
  {field: "PMID", hint: "PubMed reference number"},
  {field: "publisher", hint: "publisher"},
  {field: "publisher-place", hint: "geographic location of the publisher"},
  {field: "references", hint: "resources related to the procedural history of a legal case"},
  {field: "reviewed-title", hint: "title of the item reviewed by the current item"},
  {field: "scale", hint: "scale of e.g. a map"},
  {field: "section", hint: "container section holding the item (e.g. “politics” for a newspaper article)"},
  {field: "source", hint: "from whence the item originates (e.g. a library catalog or database)"},
  {field: "status", hint: "publication) status of the item (e.g. “forthcoming”)"},
  {field: "title", hint: "primary title of the item"},
  {field: "title-short",
    hint: "short/abbreviated form of “title” (also accessible through the “short” form of the “title” variable)"},
  {field: "URL", hint: "Uniform Resource Locator (e.g. “http://aem.asm.org/cgi/content/full/74/9/2766”)"},
  {field: "version", hint: "version of the item (e.g. “2.0.9” for a software program)"},
  {field: "chapter-number", hint: "chapter number"},
  {field: "collection-number",
    hint: "number identifying the collection holding the item (e.g. the series number for a book)"},
  {field: "edition",
    hint: "(container) edition holding the item (e.g. “3” when citing a chapter in the third edition of a book)"},
  {field: "issue",
    hint: "(container) issue holding the item (e.g. “5” when citing a journal article from journal volume 2, issue 5)"},
  {field: "number", hint: "number identifying the item (e.g. a report number)"},
  {field: "number-of-pages", hint: "total number of pages of the cited item"},
  {field: "number-of-volumes", hint: "total number of volumes, usable for citing multi-volume books and such\n"},
  {field: "volume", hint: "(container) volume holding the item (e.g. “2” when citing a chapter from book volume 2)"},
];

class Reference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    }
  }

  doExpand() {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  onEdit(key, value) {
    let { dispatch } = this.props;
    let action = editReference(this.props.id, key, value);
    dispatch(action)
  }

  onCitation() {
    let { dispatch } = this.props;
    let action = showCitation(this.props.id);
    dispatch(action)
  }

  // TODO: Idea: only show populated fields in expanded view, but show all fields in edit view

  // TODO: Edit modal

  // TODO: Add date variables

  // TODO: Add name variables

  render_expanded() {
    return (
      <div className="Ref-list-item">
        <div className="Ref-list-item-expand-left">Author</div>
        <div className="Ref-list-item-expand-right">
          <AuthorList
            authorList={this.props.author}
          />
        </div>

        {referenceFields.map(
          (rf) =>
            (
              <div key={rf.field} className="Ref-list-item-expand-row">
                <div className="Ref-list-item-expand-left">{rf.field}</div>
                <div className="Ref-list-item-expand-right">
                  <Editable
                    value={this.props[rf.field]}
                    field={rf.field}
                    isTextArea={!!rf.isTextArea}
                    onEdit={(field, value) => this.onEdit(field, value)}
                  />
                </div>
              </div>
            )
        )
        }

        <div className="Ref-list-item-expand-all">
          <button type="button">Open</button>
          <button type="button" onClick={() => { this.onCitation() }}>Citation</button>
          <button type="button" onClick={() => { this.doExpand() }}>Collapse</button>
        </div>
      </div>
    )
  }

  render_author_list_collapsed() {
    if(!this.props.author) {
      return ""
    }
    return this.props.author.map((author) => {
      if(author.literal) {
        return author.literal
      }
      if(author.family) {
        if(author['non-dropping-particle']) {
          return author['non-dropping-particle'] + " " + author.family
        }
        return author.family
      }
      return ""
    }).join(", ")
  }

  render_collapsed() {
    return (
      <div className="Ref-list-item">
        <div className="Ref-list-item-left">
          { this.render_author_list_collapsed() }
        </div>
        <div className="Ref-list-item-middle">
          {this.props.title}
        </div>
        <div className="Ref-list-item-right">
          <button type="button">Open</button>
          <button type="button" onClick={() => { this.onCitation() }}>Citation</button>
          <button type="button" onClick={() => { this.doExpand() }}>Expand</button>
        </div>
      </div>
    )
  }

  render()
  {
    if(this.state.isExpanded) {
      return(this.render_expanded())
    } else {
      return(this.render_collapsed())
    }
  }
}

Reference.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  abstract: PropTypes.string,
  author: PropTypes.arrayOf(
    PropTypes.shape({
      family: PropTypes.string,
      given: PropTypes.string,
      'non-dropping-particle': PropTypes.string,
      'dropping-particle': PropTypes.string,
      suffix: PropTypes.string,
      literal: PropTypes.string
  }))
};

export default connect()(Reference)
