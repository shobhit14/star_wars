// Import internal libararies
import { isEmptyArray } from '../../utils/utility'
import {
    NEXT,
    PREVIOUS,
    DISABLED,
    ACTIVE,
    FIRST_PAGE,
    TEN_PAGE,
    EMPTY_STRING
} from '../../constant/constant'

// Define Pagination function component
function Pagination(props) {
    let totalPlanet = parseInt(props.count / TEN_PAGE), pageArr = []

    // Push all total planet list
    for (let i = FIRST_PAGE; i < totalPlanet + FIRST_PAGE; i++) {
        pageArr.push(i)
    }

    // Previous page function
    const previousPage = () => {
        if (props.currentPage > FIRST_PAGE) {
            const currentPage = props.currentPage - FIRST_PAGE
            props.updatePlanetsData(currentPage, props.searchKey)
        }
    }

    // Next page function
    const nextPage = (totalPlanet) => {
        if (props.currentPage < totalPlanet) {
            const currentPage = props.currentPage + FIRST_PAGE
            props.updatePlanetsData(currentPage, props.searchKey)
        }
    }

    // If total page is more than ten
    if (props.count > TEN_PAGE) {
        return <nav aria-label='...'>
            <ul className='pagination'>
                {/* Render previous page button */}
                <li
                    className={`page-item ${props.currentPage == FIRST_PAGE ? DISABLED : EMPTY_STRING}`}
                    onClick={() => { previousPage() }}>
                    <a className='page-link' href='#' tabIndex='-1'>{PREVIOUS}</a>
                </li>
                {
                    !isEmptyArray(pageArr) && pageArr.map((page, index) => {
                        return <li
                            key={index}
                            className={`page-item ${props.currentPage == page ? ACTIVE : EMPTY_STRING}`}
                            onClick={() => { props.updatePlanetsData(page, props.searchKey) }}>
                            <a className='page-link' href='#'>{page}</a>
                        </li>
                    })
                }
                {/* Render next page button */}
                <li
                    className={`page-item ${props.currentPage == totalPlanet ? DISABLED : EMPTY_STRING}`}
                    onClick={() => { nextPage(totalPlanet) }}>
                    <a className='page-link' href='#'>{NEXT}</a>
                </li>
            </ul>
        </nav>
    }
    return null
}

export default Pagination