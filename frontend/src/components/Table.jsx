import React, { useState, useEffect, useMemo } from 'react';
import { useTable, usePagination } from 'react-table';

const Table = ({ data, numberOfClusters, tableGuide }) => {
  const [selectedCluster, setSelectedCluster] = useState(0);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data.filter(row => row.Cluster === selectedCluster));
  }, [selectedCluster, data]);

  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Map tableGuide to columns, excluding 'Cluster'
    const tableColumns = tableGuide.map(key => ({
      Header: key,
      accessor: key,
    }));

    // Optional: To include the Cluster column uncomment the lines below
    // tableColumns.push({
    //   Header: 'Cluster',
    //   accessor: 'Cluster',
    // });

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
    <div>
      <div>
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
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <table {...getTableProps()} style={{ width: '100%' }}>
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
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Ir a la página:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '50px' }}
          />
        </span>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20].map(size => (
            <option key={size} value={size}>
              Mostrar {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;
