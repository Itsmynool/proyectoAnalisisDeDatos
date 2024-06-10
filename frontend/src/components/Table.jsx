import React, { useState, useEffect, useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import styles from '../styles/Table.module.css';

const Table = ({ data, numberOfClusters, tableGuide }) => {
  const [selectedCluster, setSelectedCluster] = useState(0);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data.filter(row => row.Cluster === selectedCluster));
  }, [selectedCluster, data]);

  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];

    const tableColumns = tableGuide.map(key => ({
      Header: key,
      accessor: key,
    }));

    return tableColumns;
  }, [data, tableGuide]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <div className={styles.tableContainer}>
      <div className={styles.clusterSelect}>
        <label htmlFor="cluster-select">Selecciona el Cluster: </label>
        <select
          id="cluster-select"
          value={selectedCluster}
          onChange={e => setSelectedCluster(Number(e.target.value))}
        >
          {Array.from({ length: numberOfClusters }, (_, i) => (
            <option key={i} value={i}>
              Cluster {i}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.tableWrapper}>
        <table {...getTableProps()} className={styles.table}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} key={column.id}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <IoIosArrowBack />
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <IoIosArrowBack />
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <IoIosArrowForward />
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <IoIosArrowForward />
        </button>
        <span className={styles.pageText}>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>
        <span className={styles.gotoPage}>
          Ir a la página:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            className={styles.gotoPageInput}
          />
        </span>
        <span className={styles.pageSize}>
          Mostrar:
          <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            className={styles.pageSizeSelect}
          >
            {[5, 10, 15].map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </span>
      </div>
    </div>
  );
};

export default Table;
