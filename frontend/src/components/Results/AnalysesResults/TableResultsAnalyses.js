import '../IndividualsResults/TableResultsIndividuals.css'
import '../../Dataset/BeaconInfo.css'
import * as React from 'react'
import {
  DataGrid,
  GridToolbar,
  selectedGridRowsSelector,
  gridFilteredSortedRowIdsSelector,
  GridToolbarContainer,
  GridToolbarExport
} from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function CustomToolbar () {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}
function TableResultsAnalyses (props) {
  const [showDatsets, setShowDatasets] = useState(false)

  const [showResults, setShowResults] = useState(false)

  const [arrayBeaconsIds, setArrayBeaconsIds] = useState([])
  const [rows, setRows] = useState([])
  const [ids, setIds] = useState([])

  const [resultsSelected, setResultsSelected] = useState(props.results)
  const [resultsSelectedFinal, setResultsSelectedFinal] = useState([])

  const [openDatasetArray, setOpenDataset] = useState([])

  const [editable, setEditable] = useState([])

  const [trigger, setTrigger] = useState(false)
  const [trigger2, setTrigger2] = useState(false)

  const [triggerArray, setTriggerArray] = useState([])

  const getSelectedRowsToExport = ({ apiRef }) => {
    const selectedRowIds = selectedGridRowsSelector(apiRef)
    if (selectedRowIds.size > 0) {
      return Array.from(selectedRowIds.keys())
    }

    return gridFilteredSortedRowIdsSelector(apiRef)
  }

  const handleClickDatasets = e => {
    openDatasetArray[e] = true
    triggerArray[e] = true
    setTrigger(!trigger)
  }

  let columns = [
    {
      field: 'id',
      headerName: 'Row',
      width: 100,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'analysisId',
      headerName: 'Analysis ID',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: params => (
        <Link to={`cross-queries/${params.row.analysisId}`}>
          {params.row.analysisId}
        </Link>
      )
    },
    {
      field: 'Beacon',
      headerName: 'Beacon ID',
      width: 340,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'runId',
      headerName: 'Run ID',
      width: 150,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'biosampleId',
      headerName: 'Biosample ID',
      width: 150,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'individualId',
      headerName: 'Individual ID',
      width: 150,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'analysisDate',
      headerName: 'Analysis date',
      width: 240,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'pipelineName',
      headerName: 'Pipeline name',
      width: 250,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'pipelineRef',
      headerName: 'Pipeline Ref',
      width: 350,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'aligner',
      headerName: 'Aligner',
      width: 350,
      headerClassName: 'super-app-theme--header',
      cellClass: 'pre'
    },
    {
      field: 'variantCaller',
      headerName: 'Variant Caller',
      width: 200,
      headerClassName: 'super-app-theme--header'
    }
  ]

  const handleSeeResults = () => {
    setResultsSelectedFinal(resultsSelected)

    setShowResults(true)
    setShowDatasets(false)
    setTrigger(true)
  }

  useEffect(() => {
    setRows([])
    setIds([])

    resultsSelected.forEach((element, index) => {
      arrayBeaconsIds.push(element[0])
    })
    resultsSelectedFinal.forEach((element, index) => {
      if (element[1] !== undefined) {
        let analysisDateJson = []
        if (
          element[1].analysisDate !== '' &&
          element[1].analysisDate !== undefined
        ) {
          if (typeof element[1].analysisDate === 'string') {
            analysisDateJson = element[1].analysisDate
          } else {
            analysisDateJson = element[1].analysisDate.toString()
          }
        }
        let pipelineNameJson = []
        if (
          element[1].pipelineName !== '' &&
          element[1].pipelineName !== undefined
        ) {
          if (typeof element[1].pipelineName === 'string') {
            pipelineNameJson = element[1].pipelineName
          }
        }

        let pipelineRefJson = []

        if (
          element[1].pipelineRef !== '' &&
          element[1].pipelineRef !== undefined
        ) {
          if (typeof element[1].pipelineRef === 'object') {
            element[1].pipelineRef.forEach(element2 => {
              pipelineRefJson.push(
                JSON.stringify(element2, null, 2)
                  .replaceAll('[', '')
                  .replaceAll(']', '')
                  .replaceAll('{', '')
                  .replaceAll('}', '')
                  .replaceAll(',', '')
                  .replaceAll(' ,', '')
                  .replaceAll(', ', '')
                  .replaceAll('"', '')
              )
            })
            pipelineRefJson = pipelineRefJson.toString()
            pipelineRefJson = pipelineRefJson
              .replaceAll(', ', ',')
              .replaceAll(' ,', ',')
            pipelineRefJson = pipelineRefJson.replaceAll(',', '')
          } else {
            pipelineRefJson = JSON.stringify(element[1].pipelineRef, null, 2)
              .replaceAll('[', '')
              .replaceAll(']', '')
              .replaceAll('{', '')
              .replaceAll('}', '')
              .replaceAll(',', '')
              .replaceAll(' ,', '')
              .replaceAll(', ', '')
              .replaceAll('"', '')
            pipelineRefJson = pipelineRefJson.toString()
            pipelineRefJson = pipelineRefJson
              .replaceAll(', ', ',')
              .replaceAll(' ,', ',')
            pipelineRefJson = pipelineRefJson.replaceAll(',', '')
          }
        }

        let alignerJson = []

        if (element[1].aligner !== '' && element[1].aligner !== undefined) {
          if (typeof element[1].aligner === 'object') {
            element[1].aligner.forEach(element2 => {
              alignerJson.push(
                JSON.stringify(element2, null, 2)
                  .replaceAll('[', '')
                  .replaceAll(']', '')
                  .replaceAll('{', '')
                  .replaceAll('}', '')
                  .replaceAll(',', '')
                  .replaceAll(' ,', '')
                  .replaceAll(', ', '')
                  .replaceAll('"', '')
              )
            })
            alignerJson = alignerJson.toString()
            alignerJson = alignerJson
              .replaceAll(', ', ',')
              .replaceAll(' ,', ',')
            alignerJson = alignerJson.replaceAll(',', '')
          } else {
            alignerJson = JSON.stringify(element[1].aligner, null, 2)
              .replaceAll('[', '')
              .replaceAll(']', '')
              .replaceAll('{', '')
              .replaceAll('}', '')
              .replaceAll(',', '')
              .replaceAll(' ,', '')
              .replaceAll(', ', '')
              .replaceAll('"', '')
            alignerJson = alignerJson.toString()
            alignerJson = alignerJson
              .replaceAll(', ', ',')
              .replaceAll(' ,', ',')
            alignerJson = alignerJson.replaceAll(',', '')
          }
        }

        let variantCallerJson = []

        if (
          element[1].variantCaller !== '' &&
          element[1].variantCaller !== undefined
        ) {
          if (typeof element[1].variantCaller === 'object') {
            element[1].variantCaller.forEach(element2 => {
              variantCallerJson.push(
                JSON.stringify(element2, null, 2)
                  .replaceAll('[', '')
                  .replaceAll(']', '')
                  .replaceAll('{', '')
                  .replaceAll('}', '')
                  .replaceAll(',', '')
                  .replaceAll(' ,', '')
                  .replaceAll(', ', '')
                  .replaceAll('"', '')
              )
            })
            variantCallerJson = variantCallerJson.toString()
            variantCallerJson = variantCallerJson
              .replaceAll(', ', ',')
              .replaceAll(' ,', ',')
            variantCallerJson = variantCallerJson.replaceAll(',', '')
          } else {
            variantCallerJson = JSON.stringify(
              element[1].variantCaller,
              null,
              2
            )
              .replaceAll('[', '')
              .replaceAll(']', '')
              .replaceAll('{', '')
              .replaceAll('}', '')
              .replaceAll(',', '')
              .replaceAll(' ,', '')
              .replaceAll(', ', '')
              .replaceAll('"', '')
            variantCallerJson = variantCallerJson.toString()
            variantCallerJson = variantCallerJson
              .replaceAll(', ', ',')
              .replaceAll(' ,', ',')
            variantCallerJson = variantCallerJson.replaceAll(',', '')
          }
        }

        var myObjRows = new Object()
        myObjRows.id = index
        if (element[1].id !== '') {
          myObjRows.analysisId = element[1].id
        }
        if (element[1].runId !== '') {
          myObjRows.runId = element[1].runId
        }
        myObjRows.Beacon = element[0]
        if (element[1].biosampleId !== '') {
          myObjRows.biosampleId = element[1].biosampleId
        }
        if (element[1].individualId !== '') {
          myObjRows.individualId = element[1].individualId
        }

        if (analysisDateJson !== '') {
          myObjRows.analysisDate = analysisDateJson
        }
        if (pipelineNameJson !== '') {
          myObjRows.pipelineName = pipelineNameJson
        }
        if (pipelineRefJson !== '') {
          myObjRows.pipelineRef = pipelineRefJson
        }
        if (alignerJson !== '') {
          myObjRows.aligner = alignerJson
        }
        if (variantCallerJson !== '') {
          myObjRows.variantCaller = variantCallerJson
        }

        rows.push(myObjRows)

        if (index === resultsSelectedFinal.length - 1) {
          setEditable(rows.map(o => ({ ...o })))

          setTrigger2(true)
        }
      }
    })
  }, [trigger, resultsSelectedFinal])

  useEffect(() => {
    // props.beaconsList.forEach((element2, index2) => {
    //   count = getOccurrence(arrayBeaconsIds, element2.meta.beaconId)
    //   if (count > 0) {
    //     beaconsArrayResults.push([element2, count, true])
    //   } else {
    //     beaconsArrayResults.push([element2, count, false])
    //   }
    // })
    // beaconsArrayResults.forEach(element => {
    //   if (element[2] === true) {
    //     beaconsArrayResultsOrdered.push(element)
    //   }
    // })
    // beaconsArrayResults.forEach(element => {
    //   if (element[2] === false) {
    //     beaconsArrayResultsOrdered.push(element)
    //   }
    // })

    setShowDatasets(true)
  }, [])

  return (
    <div className='containerBeaconResults'>
      {showDatsets === true &&
        props.beaconsList.map(result => {
          return (
            <>
              {props.show && (
                <>
                  {props.resultsPerDataset.map((element, index) => {
                    return (
                      <>
                        <div className='datasetCardResults'>
                          <div className='tittleResults'>
                            <div className='tittle4'>
                              <img
                                className='logoBeacon'
                                src={result.organization.logoUrl}
                                alt={result.id}
                              />
                              <h4>{result.organization.name}</h4>
                            </div>

                            {element[0].map((datasetObject, indexDataset) => {
                              return (
                                <div className='resultSetsContainer'>
                                  <button
                                    className='resultSetsButton'
                                    onClick={() =>
                                      handleClickDatasets([index, indexDataset])
                                    }
                                  >
                                    <h7>
                                      {datasetObject.replaceAll('_', ' ')}
                                    </h7>
                                  </button>
                                  {openDatasetArray[[index, indexDataset]] ===
                                    true &&
                                    triggerArray[[index, indexDataset]] ===
                                      true &&
                                    element[1][indexDataset] === true &&
                                    props.show === 'boolean' && <h6>FOUND</h6>}
                                  {openDatasetArray[[index, indexDataset]] ===
                                    true &&
                                    triggerArray[[index, indexDataset]] ===
                                      true &&
                                    element[1][indexDataset] === false &&
                                    props.show === 'boolean' && (
                                      <h5>NOT FOUND</h5>
                                    )}
                                  {props.show === 'count' &&
                                    triggerArray[[index, indexDataset]] ===
                                      true && (
                                      <h6>
                                        {element[2][indexDataset]} RESULTS
                                      </h6>
                                    )}
                                  {props.show === 'full' &&
                                    element[1][indexDataset] === true && (
                                      <button
                                        className='buttonResults'
                                        onClick={() => {
                                          handleSeeResults()
                                        }}
                                      >
                                        <h7 className='seeResultsButton'>
                                          {' '}
                                          SEE RESULTS
                                        </h7>
                                      </button>
                                    )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </>
                    )
                  })}
                </>
              )}
            </>
          )
        })}

      {showDatsets === false && showResults === true && trigger2 === true && (
        <DataGrid
          getRowHeight={() => 'auto'}
          checkboxSelection
          columns={columns}
          rows={editable}
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: {
              printOptions: { getRowsToExport: getSelectedRowsToExport }
            }
          }}
        />
      )}
    </div>
  )
}

export default TableResultsAnalyses
