import loading from '../../assets/image/loading.gif'

// Define DataLoader function component
function DataLoader(props) {
    return <div className='text-center'>
        <img src={loading} />
    </div>
}

export default DataLoader