/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useCallback, useEffect, useState, useMemo } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import classnames from 'classnames'
import _ from 'lodash'
import { AgGridReact, AgGridReactProps } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Box, MenuItem, Pagination, Select } from '@mui/material'
import { makeStyles } from '@mui/styles'

const TABLE_HEADER_HEIGHT = 30
const defaultPagination = [10, 20, 30, 40, 50]
interface Iprops extends AgGridReactProps {
  handleCellClick: any
  loading: boolean
  disableClickSelectionRenderers: boolean
  noDataTxt: string
  TableHeight: number
  // eslint-disable-next-line react/require-default-props
  pageginationCount?: number[]
}
const useStyles = makeStyles(
  (theme: {
    typography: { pxToRem: (arg0: number) => any }
    palette: { grey: any[]; common: { white: any } }
    spacing: (arg0: number) => any
  }) => ({
    table: (props: any) => ({
      position: 'relative',
      height: '100VH',

      '&.ag-theme-material': {
        '& ::-webkit-scrollbar, ::-webkit-scrollbar-track': {
          width: '10px',
          height: '10px',
          '-webkit-appearance': 'none',
          backgroundColor: _.get(
            props,
            'scrollBar.trackColor',
            'rgba(255, 255, 255, 0)'
          ), // 'transparent'
        },
        '& ::-webkit-scrollbar-thumb': {
          backgroundColor: _.get(
            props,
            'scrollBar.thumbColor',
            'rgba(213, 213, 220, 1)'
          ),
          // theme.palette.almostBlack[400],
          height: '80px',
          borderRadius: '5px',
        },
      },
      '& .ag-header': {
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontSize: theme.typography.pxToRem(11),
        background: _.get(props, 'tableStyles.headerBgColor'),
        border: 0,

        '& .ag-pinned-left-header': {
          cursor: 'not-allowed',
          backgroundColor: theme.palette.grey[500],
        },
      },
      '&.ag-theme-material .ag-header-cell': {
        color: _.get(props, 'tableStyles.headerTxtColor'),
      },
      '&.ag-theme-material .ag-cell': {
        fontSize: theme.typography.pxToRem(14),
        paddingRight: '0px',
        paddingLeft: '1px',
        '& .ag-react-container': {
          height: '100%',
          '& div': {
            'white-space': 'nowrap',
            'text-overflow': 'ellipsis',
            overflow: 'hidden',
          },
        },
      },
      '&.ag-theme-material .ag-cell-focus': {
        border: 'none',
        backgroundColor: theme.palette.grey[400],
      },
      '&.ag-theme-material .ag-cell-not-inline-editing': {
        border: 'none',
      },

      '&.ag-theme-material .ag-row': {
        background: _.get(props, 'tableStyles.rowBgColor'),
        color: _.get(props, 'tableStyles.rowTxtColor'),
        borderColor: _.get(props, 'tableStyles.rowSeparatorColor'),
        cursor: 'pointer',
        '& .ag-cell-last-left-pinned': {
          cursor: 'not-allowed',
          backgroundColor: theme.palette.grey[500],
        },
      },
      '&.ag-theme-material .ag-row:hover': {
        backgroundColor: 'rgba(250,250,251,1)',
      },
    }),
    loaderContainer: {
      position: 'absolute',
      top: TABLE_HEADER_HEIGHT,
      paddingTop: theme.spacing(2),
      width: '100%',
      height: '100%',
      textAlign: 'center',
      background: theme.palette.common.white,
    },
  })
)

function CustomGrid(props: Iprops) {
  const {
    columnDefs,
    rowData,
    onRowClicked,
    TableHeight,
    defaultColDef,
    handleCellClick,
    loading,
    rowHeight,
    noDataTxt,
    children,
    pageginationCount,
    ...rest
  } = props

  const gridOptions: any = useRef()
  const gridref: any = useRef()

  const [gridApi, setGridApi]: any = useState(null)
  const [rowSize, setRowSize]: any = useState(10)
  const [currentpage, setCurrentpage] = useState(0)
  const [totalPageSize, setTotalPageSize]: any = useState(10)

  const setOrUnsetResizeColsToFit = useCallback(
    (sizeColumns: any, columnApi: any) => {
      const allColumnIds: any = []
      columnApi.getAllColumns().forEach((column: any) => {
        allColumnIds.push(column.getId())
      })
      if (!sizeColumns) columnApi.autoSizeAllColumns(allColumnIds, false)
      else if (gridApi) {
        gridApi.sizeColumnsToFit()
      }
    },
    [gridApi]
  )

  const onColumnResized = useCallback((params: any) => {
    console.log(params)
  }, [])
  const updateRowData = useCallback(
    (columnApi: any) => {
      gridApi?.setRowData(rowData)
      setOrUnsetResizeColsToFit(true, columnApi)
    },
    [setOrUnsetResizeColsToFit, gridApi, rowData]
  )

  useEffect(() => {
    if (_.get(gridOptions, 'current.api')) {
      updateRowData(gridOptions.current.columnApi)
    }
  }, [rowData, updateRowData])

  const [currentWidth, setCurrentWidth] = useState(null)

  useEffect(() => {
    if (_.get(gridOptions, 'current.api')) {
      const gridColApi = gridOptions.current.columnApi
      gridApi.setColumnDefs(columnDefs)
      gridApi.resetRowHeights()

      setOrUnsetResizeColsToFit(true, gridColApi)
    }
  }, [columnDefs, setOrUnsetResizeColsToFit, currentWidth, gridApi])

  const onResizeLayout = (width: any) => {
    setCurrentWidth(width)
  }
  const onGridReady = useCallback(
    (params: any) => {
      gridOptions.current = params
      setGridApi(params.api)
      setOrUnsetResizeColsToFit(true, params.columnApi)
    },
    [setOrUnsetResizeColsToFit]
  )

  const classes = useStyles({
    tableStyles: {
      headerBgColor: 'rgba(158,156,156,0.08)',
      headerTxtColor: 'rgba(68,68,79,1)',
      rowBgColor: 'rgba(255,255,255,1)',
      rowTxtColor: 'rgba(0,0,0,0.87)',
      rowSeparatorColor: 'rgba(226,226,226,1)',
    },
    scrollBar: {
      trackColor: 'rgba(255, 255, 255, 0)',
      thumbColor: 'rgba(213, 213, 220, 1)',
    },
  })

  const onCellClicked = (e: any) => {
    if (!e.column.colDef.disableClickSelection) {
      handleCellClick(e)
    } else {
      e.api.gridOptionsWrapper.gridOptions.suppressRowClickSelection = false
    }
  }
  const onPageSizeChanged = (value: any) => {
    gridref.current.api.paginationSetPageSize(Number(value))
  }

  const gridStyle = useMemo(
    () => ({ height: `${TableHeight}vh`, width: '100%' }),
    [TableHeight]
  )
  const onPaginationChanged = useCallback(() => {
    console.log('onPaginationPageLoaded')
    // Workaround for bug in events order
    if (gridref.current.api) {
      setTotalPageSize(gridref.current.api.paginationGetTotalPages())
      console.log(
        'current page',
        gridref.current.api.paginationGetCurrentPage()
      )
    }
  }, [])

  const setPage = (event: any, page: number) => {
    console.log('page', page)
    setCurrentpage(page)

    if (gridref.current.api) {
      gridref.current.api.paginationGoToPage(page - 1)
    }
  }
  return (
    <div className={classnames('ag-theme-material', classes.table)}>
      <Box style={gridStyle}>
        <AgGridReact
          ref={gridref}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableCellChangeFlash
          rowData={rowData}
          animateRows
          onGridReady={onGridReady}
          headerHeight={30}
          onColumnResized={onColumnResized}
          onRowClicked={onRowClicked && onRowClicked}
          onCellClicked={onCellClicked}
          rowHeight={rowHeight || 50}
          paginationPageSize={10}
          suppressPaginationPanel
          pagination={true}
          overlayNoRowsTemplate={noDataTxt || undefined}
          onPaginationChanged={onPaginationChanged}
          suppressDragLeaveHidesColumns
          {...rest}
        >
          {children}
        </AgGridReact>
      </Box>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          margin: '25px 0px',
        }}
      >
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Box sx={{ mr: 1 }}>size</Box>
          <Select
            variant="standard"
            value={rowSize}
            onChange={(e) => {
              setRowSize(Number(e.target.value))
              onPageSizeChanged(e.target.value)
            }}
          >
            {_.map(pageginationCount || defaultPagination, (value, idx) => (
              <MenuItem key={idx} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Pagination
          count={totalPageSize}
          page={currentpage}
          onChange={setPage}
          shape="rounded"
        />
      </Box>
      {loading && (
        <div className={classes.loaderContainer}>
          <div>Loading ...</div>
        </div>
      )}
      <ReactResizeDetector handleWidth onResize={onResizeLayout} />
    </div>
  )
}

export default CustomGrid
