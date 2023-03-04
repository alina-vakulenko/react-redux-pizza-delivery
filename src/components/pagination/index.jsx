import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

export default function Pagination({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <ReactPaginate
      containerClassName={styles.pagination}
      pageLinkClassName={styles.pageLink}
      previousLinkClassName={styles.pageLinkMargin}
      nextLinkClassName={styles.pageLinkMargin}
      activeLinkClassName={styles.pageLinkActive}
      disabledLinkClassName={styles.pageLinkDisabled}
      previousLabel="<<"
      nextLabel=">>"
      breakLabel="..."
      onPageChange={(event) => onPageChange(event.selected + 1)}
      forcePage={currentPage - 1}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
    />
  );
}
