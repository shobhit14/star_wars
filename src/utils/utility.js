import male from '../assets/image/male.png'
import female from '../assets/image/female.png'

// Check if empty string 
export function getEmptyData(data) {
    if (data) {
        return data
    }
    return 'NA'
}

// Check if empty array 
export function isEmptyArray(data) {
    if (data &&
        Array.isArray(data) &&
        data.length) {
        return false
    }
    return true
}

// Render image logo by gender
export function renderGenderLogo(gender) {
    if (gender && gender == 'male') {
        return <img className='img-logo' src={male} />
    }
    return <img className='img-logo' src={female} />
}