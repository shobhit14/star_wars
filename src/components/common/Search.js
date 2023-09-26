// Import internal libararies
import { getEmptyData } from '../../utils/utility'
import { FIRST_PAGE } from '../../constant/constant'

// Define Search function component
function Search(props) {
    return <input
        type='search'
        placeholder={getEmptyData(props.placeholder)}
        aria-label={getEmptyData(props.placeholder)}
        onChange={(event) => {
            props.updatePlanetsData(FIRST_PAGE, event.target.value)
        }}
        className='form-control mr-sm-2 search-box' />
}

export default Search