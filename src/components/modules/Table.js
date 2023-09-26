// Import internal libararies
import { isEmptyArray } from '../../utils/utility'
import { VIEW_RESIDENTS, PLANETS_COLUMN_LIST } from '../../constant/constant'

// Import external libararies
import moment from 'moment'

// Define Table function component
function Table(props) {

    // Render table body data
    const renderTbodyData = (element, index) => {
        return <tr key={index}>
            <th scope='row'>{((props.currentPage - 1) * 10) + index + 1}</th>
            <td>{element.name}</td>
            <td>{element.climate}</td>
            <td>{element.diameter}</td>
            <td>{element.terrain}</td>
            <td>{moment(element.created).format('MMMM Do YYYY')}</td>
            <td className='link-resident' onClick={() => { props.viewResidents(element.residents) }}>{VIEW_RESIDENTS}</td>
        </tr>
    }

    return <table className='table'>
        <thead className='thead-light'>
            <tr>
                {
                    PLANETS_COLUMN_LIST.map((element, index) => {
                        return <th key={index} scope='col'>{element}</th>
                    })
                }
            </tr>
        </thead>
        <tbody>
            {
                !isEmptyArray(props.data) && props.data.map((element, index) => {
                    return renderTbodyData(element, index)
                })
            }
        </tbody>
    </table>
}

export default Table