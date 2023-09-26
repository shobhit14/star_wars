// Import internal libararies
import axios from 'axios'
import { useEffect, useState } from 'react'

// Import external libararies
import Table from './components/modules/Table'
import Popup from './components/modules/Popup'
import Search from './components/common/Search'
import DataLoader from './components/common/DataLoader'
import Pagination from './components/modules/Pagination'
import {
    BASE_URL,
    FIRST_PAGE,
    EMPTY_ARRAY,
    EMPTY_STRING,
    LOADING_CONTENT,
    INTERNAL_SERVER_ERROR,
    RESIDENT_DATA_LOADING
} from '../src/constant/constant'
import noRecordFound from './assets/image/no-record-found.png'

function App() {
    // Initialise application state
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)
    const [searchKey, setSearchKey] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [residentData, setResidentData] = useState([])
    const [isShowPopup, setIsShowPopUp] = useState(false)
    const [residentDataMsg, setResidentDataMsg] = useState('')
    const [isPlanetDataLoading, setIsPlanetDataLoading] = useState(true)

    // useEffect lifecycle hook
    useEffect(() => {
        // Set planet data for first page
        updatePlanetsData(FIRST_PAGE)
    }, [])

    // Set planet data by page number and search string
    const updatePlanetsData = (pageNumber, searchString = EMPTY_STRING) => {
        setIsPlanetDataLoading(true)
        setCurrentPage(pageNumber)
        let apiUrl = `${BASE_URL}${pageNumber}`

        if (searchString) {
            setSearchKey(searchString)
            apiUrl += searchString ? `&search=${searchString}` : ''
        }

        axios.get(apiUrl, {})
            .then((response) => {
                if (response &&
                    response.data &&
                    response.data.results) {
                    setIsPlanetDataLoading(false)
                    setCount(response.data.count)
                    setData(response.data.results)
                }
            })
            .catch((err) => console.log(err))
    }

    // Render search for planet by name
    const renderPlanetSearch = () => {
        return <div>
            <Search
                placeholder='Search planet name'
                updatePlanetsData={updatePlanetsData} />
        </div>
    }

    // Render loader and planet table content
    const renderPlanetContent = () => {
        if (isPlanetDataLoading) {
            return <DataLoader />
        }
        if (count == 0) {
            return <img className='img-no-data' src={noRecordFound} />
        }
        return <div>
            <Table
                data={data}
                currentPage={currentPage}
                viewResidents={viewResidents} />
            <Pagination
                count={count}
                searchKey={searchKey}
                currentPage={currentPage}
                updatePlanetsData={updatePlanetsData} />
        </div>
    }

    // Render resident of planet details popup
    const renderResidentShowPopup = () => {
        return <Popup
            closePopup={closePopup}
            isShowPopup={isShowPopup}
            residentData={residentData}
            residentDataMsg={residentDataMsg}
        />
    }

    // Resident details by a planet id
    const residentDetails = (apiUrl) => {
        let p = new Promise(function (resolve, reject) {
            axios.get(apiUrl, {})
                .then((response) => {
                    if (response && response.data) {
                        resolve(response.data)
                    } else {
                        resolve(EMPTY_ARRAY)
                    }
                })
                .catch(function (err) {
                    reject(err)
                })
        })
        return p
    }

    // View resident
    const viewResidents = (residentsList) => {
        const residentsListPromise = []
        setResidentDataMsg(RESIDENT_DATA_LOADING)
        setIsShowPopUp(true)
        if (residentsList &&
            residentsList.length) {
            residentsList.forEach((residentApiUrl) => {
                residentsListPromise.push(residentDetails(residentApiUrl))
            })
        }
        // Get all resident details
        Promise.all(residentsListPromise)
            .then(function (resolveValue) {
                setResidentDataMsg('')
                setResidentData(resolveValue)
                setIsShowPopUp(true)
            })
            .catch(function () {
                setResidentDataMsg(INTERNAL_SERVER_ERROR)
                setIsShowPopUp(true)
            })
    }

    // Close resident details popup
    const closePopup = () => {
        setResidentData([])
        setResidentDataMsg('')
        setIsShowPopUp(false)
    }

    return <div>
        {renderPlanetSearch()}
        {renderPlanetContent()}
        {renderResidentShowPopup()}
    </div>
}

export default App