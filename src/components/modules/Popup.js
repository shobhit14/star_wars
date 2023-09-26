// Import internal libararies
import {
    isEmptyArray,
    renderGenderLogo
} from '../../utils/utility'
import {
    CLOSE,
    NO_RESIDENT_PLANET,
    RESIDENT_COLUMN_LIST
} from '../../constant/constant'
import noRecordFound from '../../assets/image/no-record-found.png'
import loading from '../../assets/image/loading.gif'

// Define Popup function component
function Popup(props) {

    // Render resident data msg
    const renderResidentDataMsg = () => {
        return <div className="popup">
            <span className='close-right'
                onClick={() => props.closePopup()}>{CLOSE}</span>
            <img className='img-popup-loading' src={loading} />
        </div>
    }

    // Render no resident data on planet msg
    const renderNoResidentDataMsg = () => {
        return <div className="popup">
            <span
                className='close-right'
                onClick={() => props.closePopup()}>{CLOSE}</span>
            <img className='img-no-data' src={noRecordFound} />
        </div>
    }

    // Render resident list for a planet
    const renderResidentList = (element, index) => {
        return <tr key={index}>
            <th scope='row'>{index + 1}</th>
            <td>{element.name}</td>
            <td>{renderGenderLogo(element.gender)}</td>
            <td>{element.height}</td>
            <td>{element.mass}</td>
            <td>{element.hair_color}</td>
            <td>{element.skin_color}</td>
            <td>{element.eye_color}</td>
            <td>{element.birth_year}</td>
        </tr>
    }

    if (props.isShowPopup) {
        if (props.residentDataMsg) {
            return renderResidentDataMsg()
        }
        if (!isEmptyArray(props.residentData)) {
            return <div className="popup">
                <span className='close-right'
                    onClick={() => props.closePopup()}>{CLOSE}</span>
                <table className='table'>
                    <thead className='thead-light'>
                        {
                            RESIDENT_COLUMN_LIST.map((element, index) => {
                                return <th key={index} scope='col'>{element}</th>
                            })
                        }
                    </thead>
                    <tbody>
                        {
                            props.residentData.map((element, index) => {
                                return renderResidentList(element, index)
                            })
                        }
                    </tbody>
                </table>
            </div>
        }
        return renderNoResidentDataMsg()
    }
    return null
}

export default Popup